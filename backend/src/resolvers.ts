import {Resolvers} from "./resolvers-types";
import _ from "lodash";
import {Message, Prisma, PrismaClient, Pronouns, User} from "@prisma/client";
import * as api from "./logic/api";
import * as matching from "./logic/matching";
import {GraphQLScalarType, Kind} from "graphql";
import {sendMessage} from "./logic/pushNotifications";
import {withFilter} from "graphql-subscriptions";

// Taken from the following link:
// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (typeof value === "string") {
      return new Date(value).getTime();
    }
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    getUser: async (_parent, {id}, {prisma}) => {
      const user = await prisma.user.findFirst({where: {id: parseInt(id)}});
      if (!user) {
        console.log(`invalid user with id: ${id}`);
        return null;
      }
      return api.convertPrismaUsertoGraphQLUser(user);
    },
    getConversations: async (_parent, {userId}, {prisma}) => {
      const conversations = await prisma.conversation.findMany({
        orderBy: [{createdAt: "desc"}],
        where: {people: {some: {id: {equals: parseInt(userId)}}}},
        include: {people: true},
      });
      return conversations.map((conversation) => {
        return {
          id: conversation.id.toString(),
          channel: conversation.channel,
          createdAt: conversation.createdAt.toString(),
          people: conversation.people.map((person) => {
            return api.convertPrismaUsertoGraphQLUser(person);
          }),
        };
      });
    },
    getConversation: async (_parent, {channel}, {prisma}) => {
      const conversation = await prisma.conversation.findUnique({where: {channel}});
      return {
        ...conversation,
        id: conversation.id.toString(),
        createdAt: conversation.createdAt.toString(),
      };
    },
    onlineUsers: async (_parent, _data, {redis}) => {
      const numUsers = await redis.get("OnlineUsers"); // parseInt(null) is NaN
      return parseInt(numUsers) || 0;
    },
  },
  User: {
    formattedPronouns: (user) => {
      // HE_HIS -> He/his
      const pronouns = user.pronouns.split("_").join("/").toLowerCase();
      return pronouns.charAt(0).toUpperCase() + pronouns.slice(1);
    },
    overallRating: async (user, data, {prisma}) => {
      const feedback = await prisma.feedback.findMany({
        where: {
          NOT: {userId: {equals: parseInt(user.id)}},
          conversation: {people: {some: {id: {equals: parseInt(user.id)}}}},
        },
      });
      // Benefit of the doubt, no rating = 5 star score
      const feedbackRatings: Array<number> = feedback.map(
        (singleFeedback) => ((singleFeedback.survey as Prisma.JsonObject)["rating"] as number) || 5,
      );
      const feedBackSum = feedbackRatings.reduce((a, b) => a + b, 0);
      const averageScore = feedBackSum / feedbackRatings.length;
      return averageScore || 5;
    },
    talkNumbers: async (user, _data, {prisma}) => {
      const conversations = await prisma.conversation.findMany({
        select: {type: true},
        where: {
          people: {some: {id: {equals: parseInt(user.id)}}},
        },
      });
      const talkMap = _.countBy(conversations.map((conversation) => conversation.type));
      return {
        small: talkMap["SMALL"] || 0,
        light: talkMap["LIGHT"] || 0,
        deep: talkMap["DEEP"] || 0,
      };
    },
    badgeNumbers: async (user, _data, {prisma}) => {
      return await api.getBadgeNumbers({userId: user.id, prisma});
    },
  },
  Conversation: {
    lastMessage: async (conversation, _, {prisma}) => {
      const message = await prisma.message.findFirst({
        where: {conversationId: parseInt(conversation.id)},
        orderBy: {createdAt: "desc"},
      });
      if (message) {
        return convertPrismaMessagetoGraphQLMessage(message);
      } else {
        return null;
      }
    },
    messages: async (conversation, _, {prisma}) => {
      const messages = await prisma.message.findMany({
        orderBy: [{createdAt: "asc"}],
        where: {
          conversation: {
            is: {channel: {equals: conversation.channel}},
          },
        },
      });
      return messages.map((message) => {
        return convertPrismaMessagetoGraphQLMessage(message);
      });
    },
    streak: async (conversation, _, {prisma}) => {
      const streak = await api.getStreak({conversation, prisma});
      return streak;
    },
    isUnread: async (conversation, {userId}, {prisma}) => {
      if (![null, undefined].includes(conversation.isUnread)) {
        return conversation.isUnread;
      }
      const unread = await api.getIsUnread({conversation, userId, prisma});
      return unread;
    },
  },
  Mutation: {
    createMessage: async (_parent, {channel, author, message}, {pubsub, prisma, expo}) => {
      const newMessage = await prisma.message.create({
        data: {
          text: message,
          author: {connect: {id: parseInt(author)}},
          conversation: {connect: {channel}},
        },
        include: {
          author: true,
        },
      });
      await pubsub.publish(channel, {
        chat: {
          ...convertPrismaMessagetoGraphQLMessage(newMessage),
        },
      });
      // Maybe move this into its own thing
      const conversation = await prisma.conversation.findUnique({
        where: {channel},
        include: {
          people: {
            where: {
              NOT: {id: parseInt(author)},
            },
          },
        },
      });
      const otherPerson = conversation.people[0];
      await pubsub.publish("HomeScreenChatUpdates", {
        homeScreenChatUpdates: {channel, userId: otherPerson.id.toString()},
      });
      await sendMessage({
        expo,
        message: newMessage,
        user: otherPerson,
      });
      return convertPrismaMessagetoGraphQLMessage(newMessage);
    },
    createProfile: async (_parent, {name, birthday, pronouns}, {prisma}) => {
      const user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(birthday),
          createdAt: new Date(),
          pronouns: Pronouns[pronouns],
        },
      });
      return {message: "Profile made", id: user.id.toString()};
    },
    createChatFeedback: async (_parent, data, {prisma}) => {
      return await api.createChatFeedback({data, prisma});
    },
    dismissBadge: async (_parent, {userId, badge}, {prisma}) => {
      // Make this an enum...
      const userBadgeField: Record<string, string> = {
        Joymaker: "showJoymaker",
        "Jufa-naut": "showJufanaut",
        Charming: "showCharming",
      };
      if (!(badge in userBadgeField)) return null;
      const user = await prisma.user.update({
        where: {id: parseInt(userId)},
        data: {extra: {[userBadgeField[badge]]: false}},
      });
      return api.convertPrismaUsertoGraphQLUser(user);
    },
    leaveWaitingRoom: async (_parent, {userId}, {redis}) => {
      // TODO: maybe we should update user status, dunno?
      await redis.multi(matching.yeetUserFromAllQueuesCommand(userId)).exec();
      return "done";
    },
    setLastMessageTime: async (_parent, {conversationId, userId}, {prisma}) => {
      return await api.setLastMessageTime({conversationId, prisma, userId});
    },
    setPushToken: async (_parent, {userId, pushToken}, {prisma}) => {
      console.log(`setPushToken ${userId} ${pushToken}`);
      const user = await api.setPushToken({prisma, userId, pushToken});
      return api.convertPrismaUsertoGraphQLUser(user);
    },
    updateInterests: async (_parent, {userId, interests}, {prisma}) => {
      const user = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          interests: interests,
        },
      });
      return api.convertPrismaUsertoGraphQLUser(user);
    },
    updateMood: async (_parent, {userId, mood}, {prisma}) => {
      const user = await updateMood(prisma, userId, mood);
      return api.convertPrismaUsertoGraphQLUser(user);
    },
  },
  Subscription: {
    chat: {
      subscribe: (_parent, data, {pubsub}) => {
        return pubsub.asyncIterator(data.channel);
      },
    },
    homeScreenChatUpdates: {
      subscribe: withFilter(
        (_parent, _data, {pubsub}) => pubsub.asyncIterator("HomeScreenChatUpdates"),
        (payload, variables) => {
          return payload.homeScreenChatUpdates.userId === variables.userId;
        },
      ),
    },
    waitingRoom: {
      subscribe: (_parent, {chatTypes, userId}, {redis, pubsub, prisma}) => {
        matching.runMatchingAlgo(redis, pubsub, prisma, chatTypes, userId);
        return pubsub.asyncIterator("WaitingRoom");
      },
    },
  },
};

function convertPrismaMessagetoGraphQLMessage(newMessage: Message) {
  return {
    ...newMessage,
    id: newMessage.id.toString(),
    createdAt: newMessage.createdAt,
    userId: newMessage.userId.toString(),
  };
}

const updateMood = (prisma: PrismaClient, userId: string, mood: string) => {
  return prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      mood,
    },
  });
};
