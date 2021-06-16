import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import Row from "../components/Row";
import SaturnIcon from "../components/SaturnIcon";
import HomeTabIcon from "../components/tabIcon/Home";
import ProfileTabIcon from "../components/tabIcon/Profile";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { HomeScreen } from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  BottomTabParamList,
  HomeTabParamList,
  ProfileTabParamList,
} from "../types";

const TabContainer = styled(Row)`
  background: #371463;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 34px;
  padding-horizontal: 64px;
  position: relative;
`;

const ChatButtonContainer = styled.TouchableOpacity`
  position: absolute;
  width: 74px;
  height: 74px;
  border-radius: 37px;
  background: #ff97d5;
  box-shadow: 0px 0px 4px #ff98d5;
  align-items: center;
  justify-content: center;
  left: 62%;
  top: -10px;
`;

const ChatButton = () => {
  return (
    <ChatButtonContainer>
      <SaturnIcon />
    </ChatButtonContainer>
  );
};

const CustomTab = ({ state, descriptors, navigation }: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: "#371463" }}>
      <TabContainer>
        {state.routes.map((route: any, index: number) => {
          const label = route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
            >
              {label === "HomeTab" ? (
                <HomeTabIcon color={isFocused ? "#FF97D5" : "#fff"} />
              ) : (
                <ProfileTabIcon color={isFocused ? "#FF97D5" : "#fff"} />
              )}
            </TouchableOpacity>
          );
        })}
        <ChatButton />
      </TabContainer>
    </View>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomTab {...props} />}
      initialRouteName="HomeTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen name="HomeTab" component={HomeTabNavigator} />
      <BottomTab.Screen name="ProfileTab" component={ProfileTabNavigator} />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeTabStack.Navigator>
  );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileTabStack.Navigator>
  );
}
