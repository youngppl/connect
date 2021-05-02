import { addResolversToSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { buildSchema } from "graphql";

const prisma = new PrismaClient();

const corsOptions = {
  origin: true,
  credentials: true,
};

const typeDefs = `
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
    hello: String
  }
  type Subscription {
    greetings: String
  }
`;
const schema = buildSchema(typeDefs);

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    hello: () => {
      return "swag";
    },
  },
  Subscription: {
    greetings: {
      subscribe: personName,
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
