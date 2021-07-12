import { addResolversToSchema } from "@graphql-tools/schema";
import { IResolvers } from "graphql-tools";
import { PrismaClient, Pronouns } from "@prisma/client";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { buildSchema } from "graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import { nanoid } from "nanoid";

const options = {
  host: "redis",
  port: 6379,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const prisma = new PrismaClient();
const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
const redis = new Redis(options);

const corsOptions = {
  origin: true,
  credentials: true,
};

const typeDefs = `
  type User {
    email: String!
    name: String
    createdAt: String
    birthday: String
    pronouns: String
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
  }

  type Query {
    allUsers: [User!]!
    getUser(id: ID!): User
  }
  type Mutation {
    createMessage(channel: String!, message: String!, author: ID!): Chat
    createProfile(name: String!, pronouns: String, birthday: String!): Profile
    createChatFeedback(author: ID!, channel: String!, engagementRating: Int!, howFeelingAfter: String!, mood: Int!, smile: String!, talkAgain: String!): String
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
      const joined =
        user.createdAt.toLocaleString("default", { month: "long" }) +
        " " +
        user.createdAt.getFullYear();
      const birthday = user.birthday.toLocaleDateString();
      return { ...user, pronouns, joined, birthday };
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
    createProfile: async (parent, data, context, info) => {
      const { name, birthday, pronouns } = data;
      console.log(data);
      const user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(birthday),
          joined: new Date(),
          pronouns,
        },
      });
      return { message: "Profile made", id: user.id };
    },
    createChatFeedback: async (parent, data, context, info) => {
      console.log(data);
      return "done";
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
        };
        // remove both users from all other lists they may be in (ugly af)
        await Promise.all([
          redis.lrem(CHAT_OPTIONS.DEEP_TALK, 0, matchedUser),
          redis.lrem(CHAT_OPTIONS.DEEP_TALK, 0, userId),
          redis.lrem(CHAT_OPTIONS.LIGHT_TALK, 0, matchedUser),
          redis.lrem(CHAT_OPTIONS.LIGHT_TALK, 0, userId),
          redis.lrem(CHAT_OPTIONS.SMALL_TALK, 0, matchedUser),
          redis.lrem(CHAT_OPTIONS.SMALL_TALK, 0, userId),
        ]);
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

  // * MOCK Matching methods for solo testing
  setTimeout(
    () =>
      pubsub.publish("WaitingRoom", {
        waitingRoom: {
          message: "matched",
          users: [4, 5],
          channel: `chat-${nanoid(15)}`,
          chatType: CHAT_OPTIONS.DEEP_TALK,
        },
      }),
    1000
  );
  setTimeout(
    () =>
      pubsub.publish("WaitingRoom", {
        waitingRoom: {
          message: "matched",
          users: [1, 2],
          channel: `chat-${nanoid(15)}`,
          chatType: CHAT_OPTIONS.SMALL_TALK,
        },
      }),
    3000
  );
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
