import {gql, useMutation} from "@apollo/client";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React from "react";
import {Platform} from "react-native";

import {useUser} from "./UserProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const SET_PUSH_TOKEN_MUTATION = gql`
  mutation SetPushToken($userId: ID!, $pushToken: String!) {
    setPushToken(userId: $userId, pushToken: $pushToken) {
      id
    }
  }
`;

export const NotificationProvider = ({children}: {children?: React.ReactNode}) => {
  const user = useUser();
  const notificationListener = React.useRef<any | null>(null);
  const responseListener = React.useRef<any | null>(null);
  const [setUserPushToken] = useMutation(SET_PUSH_TOKEN_MUTATION);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (user.id) {
        setUserPushToken({variables: {userId: user.id, pushToken: token}});
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);

  return children;
};
