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
      const user = await prisma.user.create({
        data,
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
  },
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
