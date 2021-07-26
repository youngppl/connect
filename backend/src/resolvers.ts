import { PrismaClient, Pronouns } from "@prisma/client";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";
import { nanoid } from "nanoid";
import getIcebreaker from "./helpers/icebreakers";
import { Resolvers } from "./resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_parent, { id }, { prisma }) => {
      const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
      const createdAt =
        user.createdAt.toLocaleString("default", { month: "long" }) +
        " " +
        user.createdAt.getFullYear();
      const birthday = user.birthday.toLocaleDateString();
      return { ...user, createdAt, birthday };
    },
  },
  User: {
    formattedPronouns: (user) => {
      // HE_HIS -> He/His
      const pronouns = user.pronouns.split("_").join("/").toLowerCase();
      return pronouns.charAt(0).toUpperCase() + pronouns.slice(1);
    },
  },
  Mutation: {
    createMessage: async (
      _parent,
      { channel, author, message },
      { pubsub }
    ) => {
      const chat = { message, author };
      console.log("sending", chat, "to", channel);
      await pubsub.publish(channel, { chat });
      return chat;
    },
    leaveWaitingRoom: async (_parent, { userId }, { redis }) => {
      await yeetUserFromAllQueues(redis, userId);
      return "done";
    },
    createProfile: async (
      _parent,
      { name, birthday, pronouns },
      { prisma }
    ) => {
      const user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(birthday),
          createdAt: new Date(),
          pronouns: Pronouns[pronouns],
        },
      });
      return { message: "Profile made", id: user.id.toString() };
    },
    createChatFeedback: async (_parent, { author, mood }, { prisma }) => {
      await updateMood(prisma, author, mood);
      return "done";
    },
    updateInterests: async (_parent, { userId, interests }, { prisma }) => {
      prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          interests: interests,
        },
      });
      return interests;
    },
    updateMood: async (_parent, { userId, mood }, { prisma }) => {
      await updateMood(prisma, userId, mood);
      return mood;
    },
  },
  Subscription: {
    chat: {
      subscribe: (_parent, { channel }, { pubsub }) => {
        return pubsub.asyncIterator(channel);
      },
    },
    waitingRoom: {
      subscribe: (_parent, { chatTypes, userId }, { pubsub, redis }) => {
        runMatchingAlgo(redis, pubsub, chatTypes, userId);
        return pubsub.asyncIterator("WaitingRoom");
      },
    },
  },
};

interface StringMapProps {
  [key: string]: string;
}

// TODO: Duplicated from client, might want to add it to graphql types for 1 source of truth
const CHAT_OPTIONS: StringMapProps = {
  DEEP_TALK: "DEEP_TALK",
  LIGHT_TALK: "LIGHT_TALK",
  SMALL_TALK: "SMALL_TALK",
};

const runMatchingAlgo = async (
  redis: Redis,
  pubsub: RedisPubSub,
  chatTypes: string[],
  userId: string
) => {
  let matchData;
  // Match by chat type
  for (const chatType of chatTypes) {
    const len = await redis.llen(chatType);
    if (len > 0) {
      // fetch first user in chatType
      const matchedUser = await redis.lindex(chatType, 0);
      if (matchedUser !== userId) {
        matchData = {
          message: "matched",
          users: [matchedUser, userId],
          channel: `chat-${nanoid(15)}`,
          chatType,
          icebreaker: getIcebreaker(chatType),
        };
        // remove both users from all other lists they may be in
        await yeetUserFromAllQueues(redis, matchedUser);
        await yeetUserFromAllQueues(redis, userId);
        break;
      }
    } else {
      await redis.rpush(chatType, userId);
    }
  }
  if (matchData)
    pubsub.publish("WaitingRoom", {
      waitingRoom: matchData,
    });
};

const yeetUserFromAllQueues = async (redis: Redis, userId: string) => {
  await Promise.all([
    redis.lrem(CHAT_OPTIONS.DEEP_TALK, 0, userId),
    redis.lrem(CHAT_OPTIONS.LIGHT_TALK, 0, userId),
    redis.lrem(CHAT_OPTIONS.SMALL_TALK, 0, userId),
  ]);
};

const updateMood = (prisma: PrismaClient, userId: string, mood: string) => {
  return prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      mood,
    },
  });
};
