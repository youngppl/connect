import { PrismaClient } from "@prisma/client";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start();

const app = express();
const port = process.env.PORT || 5000;

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
