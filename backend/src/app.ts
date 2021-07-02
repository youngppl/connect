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
  }

  type Query {
    allUsers: [User!]!
    hello: String
  }
  type Mutation {
    createChat(channel: String!, message: String!, author: ID!): Chat
    createProfile(name: String!, pronouns: String!, birthday: String!): Profile
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
    hello: () => {
      return "swag";
    },
  },
  Mutation: {
    createChat: async (parent, { channel, author, message }, context, info) => {
      const chat = { message, author };
      console.log("sending", chat, "to", channel);
      await pubsub.publish(channel, { chat });
      return chat;
    },
    createProfile: async (parent, data, context, info) => {
      const { name } = data;
      const user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(),
          pronouns: Pronouns.HE_HIS,
        },
      });
      return { message: "Profile made", id: user.id };
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
        };
        // remove both users from all other lists they may be in (ugly af)
        await redis.lrem("Deep talk", 0, matchedUser);
        await redis.lrem("Deep talk", 0, userId);
        await redis.lrem("Light talk", 0, matchedUser);
        await redis.lrem("Light talk", 0, userId);
        await redis.lrem("Small talk", 0, matchedUser);
        await redis.lrem("Small talk", 0, userId);
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
  //   setTimeout(
  //     () =>
  //       pubsub.publish("WaitingRoom", {
  //         waitingRoom: {
  //           message: "matched",
  //           users: [4, 5],
  //           channel: `chat-${nanoid(15)}`,
  //         },
  //       }),
  //     1000
  //   ); // sim a match of others after 2 secs. client should ignore this
  // setTimeout(
  //   () =>
  //     pubsub.publish("WaitingRoom", {
  //       waitingRoom: {
  //         message: "matched",
  //         users: [1, 2],
  //         channel: `chat-${nanoid(15)}`,
  //       },
  //     }),
  //   3000
  // ); // sim a match after 2 secs
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
