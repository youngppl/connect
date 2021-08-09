import {PrismaClient} from "@prisma/client";
import {Conversation} from "../resolvers-types";

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
