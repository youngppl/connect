import { User } from "../backend/src/resolvers-types";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  CreateProfileScreen: undefined;
  HomeScreen: undefined;
  Landing: undefined;
  MainTabs: { initiateChat?: boolean };
  ChatScreen: { channel: string; otherUser: User; icebreaker: string };
  FeedbackScreen: { channel: string };
  WaitingScreen: {
    chatTypes: string[];
  };
  TimesUpScreen: { channel: string };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

export type HomeTabParamList = {
  HomeScreen: undefined;
};

export type ProfileTabParamList = {
  ProfileScreen: undefined;
};

export { User };
