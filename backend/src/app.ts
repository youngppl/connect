import {addResolversToSchema} from "@graphql-tools/schema";
import express from "express";
import {ApolloServer, PubSubEngine} from "apollo-server-express";
import ws from "ws";
import {PrismaClient} from "@prisma/client";
import {useServer} from "graphql-ws/lib/use/ws";
import {RedisPubSub} from "graphql-redis-subscriptions";
import Redis, {Redis as IORedis} from "ioredis";

import {schema} from "./schema";
import {resolvers} from "./resolvers";

const prisma = new PrismaClient();
const pubsub = new RedisPubSub({
  publisher: new Redis(process.env.REDIS_URL),
  subscriber: new Redis(process.env.REDIS_URL),
});
const redis = new Redis(process.env.REDIS_URL);

export type JufaContextType = {
  prisma: PrismaClient;
  pubsub: PubSubEngine;
  redis: IORedis;
};
const context: JufaContextType = {prisma, redis, pubsub};
const corsOptions = {origin: true, credentials: true};
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({schema: schemaWithResolvers, context});
server.start();

const app = express();
const port = process.env.PORT || 5000;

server.applyMiddleware({app, cors: corsOptions});

const socketsServer = app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  const wsServer = new ws.Server({
    server: socketsServer,
    path: "/graphql",
  });
  useServer(
    {
      schema: schemaWithResolvers,
      context,
      onConnect: async () => {
        await redis.incr("OnlineUsers");
      },
      onDisconnect: async () => {
        await redis.decr("OnlineUsers");
      },
    },
    wsServer,
  );

  console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});
