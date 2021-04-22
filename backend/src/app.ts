import { PrismaClient } from "@prisma/client";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import expressPlayground from "graphql-playground-middleware-express";

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
export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

const app = express();
const port = 5000;

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

app.listen(port, () => console.log(`Running on port ${port}`));
