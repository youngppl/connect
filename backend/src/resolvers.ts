import {PubSubEngine} from "graphql-subscriptions";
import {Redis} from "ioredis";
import {nanoid} from "nanoid";
import getIcebreaker from "./helpers/icebreakers";
import {Resolvers} from "./resolvers-types";
import _ from "lodash";
import {ConversationType, Message, Prisma, PrismaClient, Pronouns, User} from "@prisma/client";
import * as api from "./logic/api";

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
      await redis.multi(yeetUserFromAllQueuesCommand(userId)).exec();
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
        runMatchingAlgo(redis, pubsub, prisma, chatTypes, userId);
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
    createdAt: newMessage.createdAt.toLocaleDateString(),
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

const runMatchingAlgo = async (
  redis: Redis,
  pubsub: PubSubEngine,
  prisma: PrismaClient,
  chatTypes: ConversationType[],
  userId: string,
) => {
  let matchSucceeded = false;
  let possibleMatchUserIds = [];
  // Match by chat type
  const getUserIds = chatTypes.map((chatType) => ["lindex", chatType, "0"]);
  try {
    const results = await redis.multi(getUserIds).exec();
    possibleMatchUserIds = _.zip(
      chatTypes,
      results.map((result) => result[1]),
    );
  } catch (chatErr) {
    console.log(chatErr);
    return;
  }

  for (const chatTypeMatchedUserId of possibleMatchUserIds) {
    const [chatType, matchedUserId] = chatTypeMatchedUserId;
    const conversationType = ConversationType[chatType];

    if (matchSucceeded) {
      return;
    }
    if (matchedUserId && matchedUserId !== userId) {
      try {
        // Algorithm idea:
        // When a user first enters a queue, check if there is anything available. Otherwise, leave an id on multiple queues.
        // We try booting the person in the queue. If the person got booted via no errors and a count >= 1, then we have a clean match.
        // In the case of a race condition, where someone else takes the user first, we'll have 0 pops. So, we skip.

        const bootOtherPersonResults = await redis
          .multi([
            ...yeetUserFromAllQueuesCommand(userId),
            ...yeetUserFromAllQueuesCommand(matchedUserId),
          ])
          .exec();
        const matchedUserIds = bootOtherPersonResults.slice(3);
        const hasNoErrors = _.every(
          matchedUserIds.map((result) => result[0]),
          (v) => _.isNull(v),
        );
        const redisPops = bootOtherPersonResults.map((result) => result[1]); // [Error, numPopped]
        const bootedMatchedUser = hasNoErrors && _.sum(redisPops) >= 1;
        if (bootedMatchedUser) {
          // race can be introduced here...
          // Only boot yourself if the matched user got booted
          const channelName = nanoid();
          const icebreaker = getIcebreaker(chatType);
          await prisma.conversation.create({
            data: {
              channel: channelName,
              type: conversationType,
              icebreaker,
              people: {
                connect: [{id: parseInt(userId)}, {id: parseInt(matchedUserId)}],
              },
            },
          });
          const matchData = {
            message: "matched",
            users: [matchedUserId, userId],
            channel: channelName,
            chatType,
            icebreaker,
          };
          console.log(matchData);

          pubsub.publish("WaitingRoom", {waitingRoom: matchData});
          matchSucceeded = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!matchSucceeded) {
    const pushUserIds = chatTypes.map((chat) => ["rpush", chat, userId]);
    await redis.multi(pushUserIds).exec();
  }
};

const yeetUserFromAllQueuesCommand = (userId: string) => {
  return [
    ["lrem", ConversationType.DEEP, "0", userId],
    ["lrem", ConversationType.LIGHT, "0", userId],
    ["lrem", ConversationType.SMALL, "0", userId],
  ];
};

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
