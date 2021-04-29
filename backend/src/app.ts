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

const schema = buildSchema(`
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
`);

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },
  Subscription: {
    greetings: {
      resolve: (root) => {
        console.log("subscription server resolve", { root });
        return root;
      },
      subscribe: () => {
        console.log(
          "I AM HERE IN SUBSCRIPTION"
          // pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
        );
        // return pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC);
      },
    },
    // console.log("in greeting");
    // return function* sayHiIn5Languages() {
    //   for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
    //     yield { greetings: hi };
    //   }
  },
};

const roots = {
  query: {
    hello: () => "Hello World!",
  },
  subscription: {
    greetings: function* sayHiIn5Languages() {
      console.log("in func");
      for (const hi of ["Hi", "Bonjour", "Hola", "Ciao", "Zdravo"]) {
        yield { greetings: hi };
      }
    },
  },
};

const server = new ApolloServer({ schema, resolvers: roots });
server.start();

const app = express();
const port = process.env.PORT || 5000;

server.applyMiddleware({ app, cors: corsOptions });

const socketsServer = app.listen(port, () => {
  const wsServer = new ws.Server({
    server: socketsServer,
    path: "/graphql",
  });
  console.log("here");
  useServer(
    {
      schema,
      roots,
      onConnect: (ctx) => {
        console.log("Connect", ctx);
      },
      onSubscribe: (ctx, msg) => {
        console.log("Subscribe", { ctx, msg });
      },
      onNext: (ctx, msg, args, result) => {
        console.debug("Next", { ctx, msg, args, result });
      },
      onError: (ctx, msg, errors) => {
        console.error("Error", { ctx, msg, errors });
      },
      onComplete: (ctx, msg) => {
        console.log("Complete", { ctx, msg });
      },
    },
    wsServer
  );

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
