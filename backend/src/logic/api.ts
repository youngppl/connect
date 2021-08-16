import {User, PrismaClient, Prisma} from "@prisma/client";
import {Conversation, MutationCreateChatFeedbackArgs} from "../resolvers-types";

interface getStreakProps {
  conversation: Conversation;
  prisma: PrismaClient;
}

function getLongestStreakFromDayNumber(arrayOfNumbers: number[], dayNumber: number): number {
  const sortedNumbers = [...arrayOfNumbers].reverse();
  if (sortedNumbers.length === 0 || sortedNumbers[0] !== dayNumber) {
    return 0;
  }
  let result = 1;
  for (let i = 1; i < sortedNumbers.length; i++) {
    const priorNumberPlusOne = sortedNumbers[i - 1];
    if (sortedNumbers[i] === priorNumberPlusOne) {
      result += 1;
    } else {
      return result;
    }
  }
  return result;
}

function convertMillisecondsToDayNumber(milli: number): number {
  return Math.floor(milli / (1000 * 60 * 60 * 24));
}

export async function getStreak({conversation, prisma}: getStreakProps): Promise<number> {
  const messageDates = await prisma.message.findMany({
    select: {createdAt: true, userId: true},
    where: {conversationId: {equals: parseInt(conversation.id)}},
  });
  const userIds = messageDates.map((messageDate) => messageDate.userId);
  const uniqueUserIds = new Set(userIds);
  if (uniqueUserIds.size === 2) {
    const [userOneId, userTwoId] = [...uniqueUserIds];
    const daysFrom1970 = (datesList: {createdAt: Date; userId: number}[]) =>
      new Set(
        datesList.map((messageDate) =>
          convertMillisecondsToDayNumber(messageDate.createdAt.getTime()),
        ),
      );
    const userOneMessageDates = daysFrom1970(
      messageDates.filter((messageDate) => messageDate.userId === userOneId),
    );
    const userTwoMessageDates = daysFrom1970(
      messageDates.filter((messageDate) => messageDate.userId === userTwoId),
    );
    const intersection: number[] = [...userOneMessageDates].filter((x) =>
      userTwoMessageDates.has(x),
    );
    const startTime = new Date().getTime();
    const dayNumber = convertMillisecondsToDayNumber(startTime);
    return Math.max(
      getLongestStreakFromDayNumber(intersection, dayNumber),
      getLongestStreakFromDayNumber(intersection, dayNumber - 1),
    );
  }
  return 0;
}

interface getIsUnreadProps {
  conversation: Conversation;
  userId: string;
  prisma: PrismaClient;
}

export async function getIsUnread({
  conversation,
  userId,
  prisma,
}: getIsUnreadProps): Promise<boolean> {
  const lastReadTimeObject = await prisma.participant.findFirst({
    where: {userId: parseInt(userId), conversationId: parseInt(conversation.id)},
    select: {lastReadTime: true},
  });
  if (!lastReadTimeObject?.lastReadTime) {
    return false;
  }
  const count = await prisma.message.count({
    where: {
      userId: {
        not: parseInt(userId),
      },
      createdAt: {
        gt: lastReadTimeObject.lastReadTime,
      },
    },
  });
  return count > 0;
}

interface setLastMessageReadProps {
  conversationId: string;
  userId: string;
  prisma: PrismaClient;
}

export async function setLastMessageTime({
  prisma,
  conversationId,
  userId,
}: setLastMessageReadProps): Promise<number> {
  const result: number = await prisma.$executeRaw(
    `UPDATE "Participant" SET "lastReadTime" = CURRENT_TIMESTAMP WHERE "userId" = '${userId}' AND "conversationId" = '${conversationId}'`,
  );
  return result;
}

interface setPushTokenProps {
  userId: string;
  pushToken: string;
  prisma: PrismaClient;
}

export async function setPushToken({userId, pushToken, prisma}: setPushTokenProps): Promise<User> {
  const user = await prisma.user.update({
    where: {id: parseInt(userId)},
    data: {pushToken},
  });
  return user;
}

function longestConsecutive(arrayOfNumbers: number[]): number {
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
interface getBadgeNumbersProps {
  userId: string;
  prisma: PrismaClient;
}

export async function getBadgeNumbers({
  userId,
  prisma,
}: getBadgeNumbersProps): Promise<{
  joymaker: number;
  charming: number;
  jufanaut: number;
}> {
  const feedback = await prisma.feedback.findMany({
    select: {survey: true},
    where: {
      NOT: {userId: {equals: parseInt(userId)}},
      conversation: {people: {some: {id: {equals: parseInt(userId)}}}},
    },
  });
  const messageDates = await prisma.message.findMany({
    distinct: ["createdAt"],
    select: {createdAt: true},
    where: {userId: {equals: parseInt(userId)}},
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
    .map((singleFeedback) => (singleFeedback.survey as Prisma.JsonObject)["talkAgain"] as string)
    .filter(Boolean).length;

  return {joymaker: numberOfSmiles, charming: numberOfTalkAgain, jufanaut: longestMessageChain};
}

export const formatYear = (year: Date): string => {
  return year.toLocaleString("default", {month: "long"}) + " " + year.getFullYear();
};

type ModifiedUser = Omit<User, "id" | "createdAt" | "birthday"> & {
  id: string;
  createdAt: string;
  birthday: string;
};

export function convertPrismaUsertoGraphQLUser(user: User) {
  const createdAt = formatYear(user.createdAt);
  const birthday = user.birthday.toLocaleDateString();
  const userExtra = {showJoymaker: false, showJufanaut: false, showCharming: false};
  return {
    ...user,
    id: user.id.toString(),
    createdAt,
    birthday,
    extra: {...userExtra, ...(user.extra as Prisma.JsonObject)},
  };
}

interface createChatFeedbackProps {
  data: MutationCreateChatFeedbackArgs;
  prisma: PrismaClient;
}

export async function createChatFeedback({data, prisma}: createChatFeedbackProps) {
  // TODO: Store the current user in the context
  // Get the current user for the before mood.
  const conversation = await prisma.conversation.findUnique({
    where: {channel: data.channel},
    include: {people: true},
  });
  const [otherUser] = conversation.people.filter((id) => id.toString() !== data.author);
  const [currentUser] = conversation.people.filter((id) => id.toString() === data.author);
  const oldMood = currentUser.mood;
  // Jank but works, might be too many db roundtrips.
  const oldUserBadgeNumbers = await getBadgeNumbers({userId: otherUser.id.toString(), prisma});
  const updatedCurrentUser = await prisma.user.update({
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
  const newUserBadgeNumbers = await getBadgeNumbers({userId: otherUser.id.toString(), prisma});
  function meetsBadgeCriteria(oldBadgeNumber: number, badgeNumber: number): boolean {
    if (oldBadgeNumber === badgeNumber) return false;
    const basicCriteria = badgeNumber === 1 || badgeNumber % 5 === 0;
    return basicCriteria;
  }
  // Update the other user here to keep track of badge state.
  await prisma.user.update({
    where: {id: otherUser.id},
    data: {
      extra: {
        showJoyMaker:
          (otherUser.extra as Prisma.JsonObject).showJoymaker ||
          meetsBadgeCriteria(oldUserBadgeNumbers.joymaker, newUserBadgeNumbers.joymaker),
        showJufanaut:
          (otherUser.extra as Prisma.JsonObject).showJoymaker ||
          meetsBadgeCriteria(oldUserBadgeNumbers.jufanaut, newUserBadgeNumbers.jufanaut),
        showCharming:
          (otherUser.extra as Prisma.JsonObject).showJoymaker ||
          meetsBadgeCriteria(oldUserBadgeNumbers.charming, newUserBadgeNumbers.charming),
      },
    },
  });
  return convertPrismaUsertoGraphQLUser(updatedCurrentUser);
}
