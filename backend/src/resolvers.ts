import {Resolvers} from "./resolvers-types";
import _ from "lodash";
import {Message, Prisma, PrismaClient, Pronouns, User} from "@prisma/client";
import * as api from "./logic/api";
import * as matching from "./logic/matching";

const formatYear = (year: Date) => {
  return year.toLocaleString("default", {month: "long"}) + " " + year.getFullYear();
};

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_parent, {id}, {prisma}) => {
      const user = await prisma.user.findFirst({where: {id: parseInt(id)}});
      return convertPrismaUsertoGraphQLUser(user);
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
            return {
              ...person,
              id: person.id.toString(),
              createdAt: formatYear(person.createdAt),
              birthday: person.birthday.toLocaleDateString(),
            };
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
      const feedback = await prisma.feedback.findMany({
        select: {survey: true},
        where: {
          NOT: {userId: {equals: parseInt(user.id)}},
          conversation: {people: {some: {id: {equals: parseInt(user.id)}}}},
        },
      });
      const messageDates = await prisma.message.findMany({
        distinct: ["createdAt"],
        select: {createdAt: true},
        where: {userId: {equals: parseInt(user.id)}},
      });
      const daysFrom1970 = messageDates.map((messageDate) =>
        Math.floor(messageDate.createdAt.getTime() / (1000 * 60 * 60 * 24)),
      );
      const longestMessageChain = longestConsecutive(daysFrom1970);
      // TODO: convert number of smiles to an enum
      const numberOfSmiles = feedback
        .map((singleFeedback) => (singleFeedback.survey as Prisma.JsonObject)["smile"] as string)
        .filter(Boolean).length;

      // TODO: convert talk again to boolean value, since there are two only values
      const numberOfTalkAgain = feedback
        .map(
          (singleFeedback) => (singleFeedback.survey as Prisma.JsonObject)["talkAgain"] as string,
        )
        .filter(Boolean).length;

      return {joymaker: numberOfSmiles, charming: numberOfTalkAgain, jufanaut: longestMessageChain};
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
      const unread = await api.getIsUnread({conversation, userId, prisma});
      return unread;
    },
  },
  Mutation: {
    createMessage: async (_parent, {channel, author, message}, {pubsub, prisma}) => {
      const newMessage = await prisma.message.create({
        data: {
          text: message,
          author: {connect: {id: parseInt(author)}},
          conversation: {connect: {channel}},
        },
      });
      await pubsub.publish(channel, {
        chat: {
          ...convertPrismaMessagetoGraphQLMessage(newMessage),
        },
      });
      return convertPrismaMessagetoGraphQLMessage(newMessage);
    },
    leaveWaitingRoom: async (_parent, {userId}, {redis}) => {
      // TODO: maybe we should update user status, dunno?
      await redis.multi(matching.yeetUserFromAllQueuesCommand(userId)).exec();
      return "done";
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
      // TODO: Store the current user in the context
      // Get the current user for the before mood.
      const {mood: oldMood} = await prisma.user.findUnique({
        select: {mood: true},
        where: {id: parseInt(data.author)},
      });
      const user = await prisma.user.update({
        where: {id: parseInt(data.author)},
        data: {
          mood: data.mood,
          conversations: {
            update: {
              data: {
                feedback: {
                  create: [
                    {
                      userId: parseInt(data.author),
                      survey: {
                        beforeMood: oldMood,
                        afterMood: data.mood,
                        howFeelingAfter: data.howFeelingAfter,
                        smile: data.smile,
                        talkAgain: data.talkAgain,
                        rating: data.engagementRating,
                      },
                    },
                  ],
                },
              },
              where: {channel: data.channel},
            },
          },
        },
      });
      return convertPrismaUsertoGraphQLUser(user);
    },
    setLastMessageTime: async (_parent, {conversationId, userId}, {prisma}) => {
      return await api.setLastMessageTime({conversationId, prisma, userId});
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
      return convertPrismaUsertoGraphQLUser(user);
    },
    updateMood: async (_parent, {userId, mood}, {prisma}) => {
      const user = await updateMood(prisma, userId, mood);
      return convertPrismaUsertoGraphQLUser(user);
    },
  },
  Subscription: {
    chat: {
      subscribe: (_parent, data, {pubsub}) => {
        return pubsub.asyncIterator(data.channel);
      },
    },
    waitingRoom: {
      subscribe: (_parent, {chatTypes, userId}, {redis, pubsub, prisma}) => {
        matching.runMatchingAlgo(redis, pubsub, prisma, chatTypes, userId);
        return pubsub.asyncIterator("WaitingRoom");
      },
    },
  },
};

function convertPrismaUsertoGraphQLUser(user: User) {
  const createdAt = formatYear(user.createdAt);
  const birthday = user.birthday.toLocaleDateString();
  return {...user, id: user.id.toString(), createdAt, birthday};
}

function convertPrismaMessagetoGraphQLMessage(newMessage: Message) {
  return {
    ...newMessage,
    id: newMessage.id.toString(),
    createdAt: newMessage.createdAt,
    userId: newMessage.userId.toString(),
  };
}

function longestConsecutive(arrayOfNumbers: number[]) {
  const sortedArrayOfNumbers = arrayOfNumbers.sort();
  let longest_streak = 1;
  let current_streak = 1;
  for (let i = 1; i < sortedArrayOfNumbers.length; i++) {
    if (sortedArrayOfNumbers[i] - sortedArrayOfNumbers[i - 1] == 1) {
      current_streak += 1;
    } else {
      longest_streak = Math.max(longest_streak, current_streak);
      current_streak = 1;
    }
  }
  return longest_streak;
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
