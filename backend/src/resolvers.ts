import { PrismaClient, Pronouns } from "@prisma/client";
import { PubSubEngine } from "graphql-subscriptions";
import { Redis } from "ioredis";
import { nanoid } from "nanoid";
import getIcebreaker from "./helpers/icebreakers";
import { Resolvers } from "./resolvers-types";

const formatYear = (year: Date) => {
  return (
    year.toLocaleString("default", { month: "long" }) + " " + year.getFullYear()
  );
};

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_parent, { id }, { prisma }) => {
      const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
      const createdAt = formatYear(user.createdAt);
      const birthday = user.birthday.toLocaleDateString();
      return { ...user, id: user.id.toString(), createdAt, birthday };
    },
    getConversations: async (_parent, { userId }, { prisma }) => {
      const conversations = await prisma.conversation.findMany({
        where: { people: { some: { id: { equals: parseInt(userId) } } } },
        include: { people: true },
      });
      return conversations.map((conversation) => {
        return {
          id: conversation.id.toString(),
          channel: conversation.channel,
          createdAt: conversation.createdAt.toString(),
          people: conversation.people.map((person) => {
            return {
              ...person,
              id: person.id.toString(),
              createdAt: formatYear(person.createdAt),
              birthday: person.birthday.toLocaleDateString(),
            };
          }),
        };
      });
    },
  },
  User: {
    formattedPronouns: (user) => {
      // HE_HIS -> He/His
      const pronouns = user.pronouns.split("_").join("/").toLowerCase();
      return pronouns.charAt(0).toUpperCase() + pronouns.slice(1);
    },
  },
  Conversation: {
    lastMessage: async (conversation, _, { prisma }) => {
      const message = await prisma.message.findFirst({
        where: { conversationId: parseInt(conversation.id) },
        orderBy: { createdAt: "desc" },
      });
      if (message) {
        return { id: message.id.toString(), text: message.text };
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createMessage: async (
      _parent,
      { channel, author, message },
      { pubsub, prisma }
    ) => {
      const chat = { message, author };
      console.log("sending", chat, "to", channel);
      await pubsub.publish(channel, { chat });
      await prisma.conversation.update({
        where: { channel },
        data: {
          messages: {
            create: { text: message, userId: parseInt(author) },
          },
        },
      });
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
      subscribe: (
        _parent,
        { chatTypes, userId },
        { redis, pubsub, prisma }
      ) => {
        runMatchingAlgo(redis, pubsub, prisma, chatTypes, userId);
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
  pubsub: PubSubEngine,
  prisma: PrismaClient,
  chatTypes: string[],
  userId: string
) => {
  // Match by chat type
  for (const chatType of chatTypes) {
    const numberOfWaitingUsers = await redis.llen(chatType);
    if (numberOfWaitingUsers > 0) {
      // fetch first user in chatType
      const matchedUserId = await redis.lindex(chatType, 0);
      if (matchedUserId !== userId) {
        // remove both users from all other lists they may be in
        await yeetUserFromAllQueues(redis, matchedUserId);
        await yeetUserFromAllQueues(redis, userId);

        const channelName = `${nanoid()}`;
        // At this point, generate the data.
        await prisma.conversation.create({
          data: {
            channel: channelName,
            people: {
              connect: [
                { id: parseInt(userId) },
                { id: parseInt(matchedUserId) },
              ],
            },
          },
        });

        const matchData = {
          message: "matched",
          users: [matchedUserId, userId],
          channel: channelName,
          chatType,
          icebreaker: getIcebreaker(chatType),
        };
        console.log(matchData);

        pubsub.publish("WaitingRoom", { waitingRoom: matchData });
      }
    } else {
      await redis.rpush(chatType, userId);
    }
  }
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
