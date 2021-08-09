import {PubSubEngine} from "graphql-subscriptions";
import {Redis} from "ioredis";
import {nanoid} from "nanoid";
import getIcebreaker from "../helpers/icebreakers";
import {ConversationType, PrismaClient} from "@prisma/client";
import _ from "lodash";

export const yeetUserFromAllQueuesCommand = (userid: string): string[][] => {
  return [
    ["lrem", ConversationType.DEEP, "0", userid],
    ["lrem", ConversationType.LIGHT, "0", userid],
    ["lrem", ConversationType.SMALL, "0", userid],
  ];
};

export const runMatchingAlgo = async (
  redis: Redis,
  pubsub: PubSubEngine,
  prisma: PrismaClient,
  chatTypes: ConversationType[],
  userId: string,
): Promise<void> => {
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
              participants: {
                create: [
                  {
                    userId: parseInt(userId),
                  },
                  {
                    userId: parseInt(matchedUserId),
                  },
                ],
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
