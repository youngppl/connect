import { addResolversToSchema } from "@graphql-tools/schema";
import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { buildSchema } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import { nanoid } from "nanoid";
import getIcebreaker from "./helpers/Icebreakers";

const prisma = new PrismaClient();
const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL),
});
const redis = new Redis(process.env.REDIS_URL);

const corsOptions = {
  origin: true,
  credentials: true,
};

const typeDefs = `
  type User {
    email: String
    name: String
    createdAt: String
    birthday: String
    pronouns: String
    interests: [String!]
    mood: String
  }
  type Chat {
    message: String!
    author: ID!
  }
  type Profile {
    message: String!
    id: ID!
  }
  type Match {
    message: String!
    users: [ID!]!
    channel: String!
    chatType: String!
    icebreaker: String!
  }

  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User
  }
  type Mutation {
    createMessage(channel: String!, message: String!, author: ID!): Chat
    leaveWaitingRoom(userId: ID!): String
    createProfile(name: String!, pronouns: String, birthday: String!): Profile
    createChatFeedback(author: ID!, channel: String!, engagementRating: Int!, howFeelingAfter: String!, mood: String!, smile: String!, talkAgain: String!): String
    updateInterests(userId: ID!, interests: [String!]): [String!]
    updateMood(userId: ID!, mood: String!): String
  }
  type Subscription {
    chat(channel: String!): Chat
    waitingRoom(userId: ID!, chatTypes: [String!]!): Match
  }
`;
const schema = buildSchema(typeDefs);

const resolvers: IResolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    getUser: async (parent, { id }, context, info) => {
      const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });
      let pronouns = user.pronouns.split("_").join("/").toLowerCase();
      pronouns = pronouns.charAt(0).toUpperCase() + pronouns.slice(1);
      const createdAt =
        user.createdAt.toLocaleString("default", { month: "long" }) +
        " " +
        user.createdAt.getFullYear();
      const birthday = user.birthday.toLocaleDateString();
      return { ...user, pronouns, createdAt, birthday };
    },
  },
  Mutation: {
    createMessage: async (
      parent,
      { channel, author, message },
      context,
      info
    ) => {
      const chat = { message, author };
      console.log("sending", chat, "to", channel);
      await pubsub.publish(channel, { chat });
      return chat;
    },
    leaveWaitingRoom: async (parent, data, context, info) => {
      const { userId } = data;
      await yeetUserFromAllQueues(userId);
      return "done";
    },
    createProfile: async (parent, data, context, info) => {
      const { name, birthday, pronouns } = data;
      console.log(data);
      const user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(birthday),
          createdAt: new Date(),
          pronouns,
        },
      });
      return { message: "Profile made", id: user.id };
    },
    createChatFeedback: async (parent, data, context, info) => {
      const { author, mood } = data;
      await updateMood(author, mood);
      return "done";
    },
    updateInterests: async (parent, data, context, info) => {
      console.log(data);
      const { userId, interests } = data;
      const user = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          interests: interests,
        },
      });
      return interests;
    },
    updateMood: async (parent, data, context, info) => {
      const { userId, mood } = data;
      await updateMood(userId, mood);
      return mood;
    },
  },
  Subscription: {
    chat: {
      subscribe: (parent, data, context, info) => {
        const { channel } = data;
        console.log("user subbing to", channel);
        return pubsub.asyncIterator(channel);
      },
    },
    waitingRoom: {
      subscribe: (parent, data, context, info) => {
        const { chatTypes, userId } = data;
        console.log("matching", data);
        runMatchingAlgo(chatTypes, userId);
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

const runMatchingAlgo = async (chatTypes: string[], userId: string) => {
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
        await yeetUserFromAllQueues(matchedUser);
        await yeetUserFromAllQueues(userId);
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

const yeetUserFromAllQueues = async (userId: string) => {
  await Promise.all([
    redis.lrem(CHAT_OPTIONS.DEEP_TALK, 0, userId),
    redis.lrem(CHAT_OPTIONS.LIGHT_TALK, 0, userId),
    redis.lrem(CHAT_OPTIONS.SMALL_TALK, 0, userId),
  ]);
};

const updateMood = (userId: string, mood: string) => {
  return prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      mood,
    },
  });
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({ schema: schemaWithResolvers });
server.start();

const app = express();
const port = process.env.PORT || 5000;

server.applyMiddleware({ app, cors: corsOptions });

const socketsServer = app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  const wsServer = new ws.Server({
    server: socketsServer,
    path: "/graphql",
  });
  useServer({ schema: schemaWithResolvers }, wsServer);

  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
