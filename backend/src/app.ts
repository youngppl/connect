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
    createChat(message: String!): Chat
    createProfile(name: String!, pronouns: String!, birthday: String!): Profile
  }
  type Subscription {
    greetings: String
    chat: String
    waitingRoom(userId: ID!): Match
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
    createChat: async (parent, { message }, context, info) => {
      await pubsub.publish("chat", { chat: message });
      return { message };
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
    greetings: {
      subscribe: personName,
    },
    chat: {
      subscribe: () => pubsub.asyncIterator("chat"),
    },
    waitingRoom: {
      subscribe: (parent, data, context, info) => {
        console.log("matching", data);
        // add user id/matching preferences to pool
        runMatchingAlgo();
        return pubsub.asyncIterator("WaitingRoom");
      },
    },
  },
};

const runMatchingAlgo = () => {
  // TODO: matching algo goes here
  setTimeout(
    () =>
      pubsub.publish("WaitingRoom", {
        waitingRoom: {
          message: "matched",
          users: [4, 5],
          channel: "some redis channel",
        },
      }),
    1000
  ); // sim a match of others after 2 secs. client should ignore this
  setTimeout(
    () =>
      pubsub.publish("WaitingRoom", {
        waitingRoom: {
          message: "matched",
          users: [1, 2],
          channel: "some redis channel",
        },
      }),
    3000
  ); // sim a match after 2 secs
};

async function* personName() {
  for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
    yield { greetings: hi };
  }
}

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
