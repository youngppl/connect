import {Message, User} from "@prisma/client";
import Expo, {ExpoPushErrorReceipt, ExpoPushMessage, ExpoPushSuccessTicket} from "expo-server-sdk";

interface sendMessageProps {
  expo: Expo;
  message: Message & {author: User};
  user: User;
}

export async function sendMessage({user, message, expo}: sendMessageProps): Promise<void> {
  if (!user.pushToken) {
    console.log("The user does not have a push token.");
  }
  if (!Expo.isExpoPushToken(user.pushToken)) {
    console.error(`Push token ${user.pushToken} is not a valid Expo push token`);
    return;
  }
  const expoMessage: ExpoPushMessage = {
    to: user.pushToken,
    sound: "default",
    title: `${message.author.name}`,
    body: message.text,
  };

  const tickets = [];
  try {
    const ticketChunk = await expo.sendPushNotificationsAsync([expoMessage]);
    tickets.push(...ticketChunk);
  } catch (error) {
    console.error(error);
  }

  const receiptIds = [];
  for (const ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if ((ticket as ExpoPushSuccessTicket).id) receiptIds.push((ticket as ExpoPushSuccessTicket).id);
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (const receiptId in receipts) {
          const {status} = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            const {message, details} = receipts[receiptId] as ExpoPushErrorReceipt;
            console.error(`There was an error sending a notification: ${message}`);
            if (details && details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
              // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
}
