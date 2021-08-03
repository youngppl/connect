import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import * as React from "react";
import {ColorSchemeName} from "react-native";

import {useUser} from "../providers/UserProvider";
import ChatScreen from "../screens/ChatScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import Landing from "../screens/Landing";
import NotFoundScreen from "../screens/NotFoundScreen";
import TimesUpScreen from "../screens/TimesUpScreen";
import WaitingScreen from "../screens/WaitingScreen";
import {RootStackParamList} from "../types";

import Tabs from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const user = useUser();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {(!user || !user.id) && (
        <>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        </>
      )}
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name="WaitingScreen" component={WaitingScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="TimesUpScreen" component={TimesUpScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: "Oops!"}} />
    </Stack.Navigator>
  );
}
