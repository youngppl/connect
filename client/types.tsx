/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  CreateProfileScreen: undefined;
  HomeScreen: undefined;
  Landing: undefined;
  MainTabs: undefined;
  ChatScreen: { channel: string; otherUser: User };
  EndChatScreen: { channel: string };
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

export type User = {
  id: string;
  pronouns: string;
  birthday: string;
  createdAt: string;
  name: string;
  interests: string[];
};
