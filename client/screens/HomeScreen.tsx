import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styled from "styled-components/native";

import Column from "../components/Column";
import OkayIcon from "../components/emotions/Okay";
import Background from "../components/PlanetBackground";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";
import Squiggly from "../components/Squiggly";
import { RootStackParamList } from "../types";

type HomeScreenProps = StackScreenProps<RootStackParamList, "HomeScreen">;

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 18px;
`;

const Filler = styled.View`
  flex: 1;
`;

const SpaceBackgroundContainer = styled.View`
  position: absolute;
  top: ${(props: { top: number }) => props.top}px;
  left: 0;
`;

const PlanetBackground = styled(Background)`
  position: absolute;
`;

const SpeechBubble = styled.View`
  position: relative;
  width: 274px;
  top: 5px;
  left: 80px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border-bottom-left-radius: 4px;
  z-index: 2;
  padding: 12px;
  padding-left: 18px;
`;

const SpeechText = styled.Text`
  font-family: Quicksand;
`;

const CurrentUsers = () => {
  const insets = useSafeAreaInsets();

  return (
    <SpaceBackgroundContainer top={insets.top}>
      <SpeechBubble>
        <SpeechText>147 people are having deep convos right now</SpeechText>
      </SpeechBubble>
      <PlanetBackground />
    </SpaceBackgroundContainer>
  );
};

const CalendarWeekContainer = styled.View`
  margin: 14px;
`;

const CalendarWeekHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CalendarWeekHeaderText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  color: #ffffff;
`;

const CalendarWeekViewContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface CalendarMiniDayContainerProps {
  isSelected: boolean;
}

const CalendarMiniDayContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${(props: CalendarMiniDayContainerProps) =>
    props.isSelected ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  padding-vertical: 10px;
  padding-horizontal: 14px;
  border-radius: 16px;
`;

interface CalendarMiniDayTextProps {
  isSelected: boolean;
}

const CalendarMiniDayText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: ${(props: CalendarMiniDayTextProps) =>
    props.isSelected ? "#FF97D5" : "#ffffff"};
`;

interface CalendarMiniDayProps {
  dayName: string;
  dayNumber: number;
  isSelected: boolean;
}
const CalendarMiniDay = ({
  dayName,
  dayNumber,
  isSelected,
}: CalendarMiniDayProps) => {
  return (
    <CalendarMiniDayContainer isSelected={isSelected}>
      <CalendarMiniDayText isSelected={isSelected}>
        {dayName}
      </CalendarMiniDayText>
      <CalendarMiniDayText isSelected={isSelected}>
        {dayNumber}
      </CalendarMiniDayText>
    </CalendarMiniDayContainer>
  );
};

const CalendarWeekView = () => {
  return (
    <CalendarWeekViewContainer>
      {[
        { dayNumber: 12, dayName: "Sun" },
        { dayNumber: 13, dayName: "Mon" },
        { dayNumber: 14, dayName: "Tue" },
        { dayNumber: 15, dayName: "Wed" },
        { dayNumber: 16, dayName: "Thurs" },
        { dayNumber: 17, dayName: "Fri" },
      ].map((data, index) => {
        return (
          <CalendarMiniDay
            key={index}
            dayName={data.dayName}
            dayNumber={data.dayNumber}
            isSelected={index === 0}
          />
        );
      })}
    </CalendarWeekViewContainer>
  );
};

const CalendarWeek = () => {
  return (
    <CalendarWeekContainer>
      <CalendarWeekHeaderContainer>
        <CalendarWeekHeaderText>June 2021</CalendarWeekHeaderText>
        <Space width={8} />
        <Ionicons name="chevron-down-outline" size={24} color="white" />
      </CalendarWeekHeaderContainer>
      <Space height={8} />
      <CalendarWeekView />
    </CalendarWeekContainer>
  );
};

const CurrentDate = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  color: #ff97d5;
`;

const CalendarDayButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #ffffff;
  border-radius: 64px;
  padding-horizontal: 16px;
  padding-vertical: 18px;
`;

const CalendarDayButtonText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
`;

const CalendarDayHeaderText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
`;

const CalendarDay = () => {
  return (
    <ChatContainer>
      <CalendarDayHeaderText>Today</CalendarDayHeaderText>
      <Space height={14} />
      <CurrentDate>Jun 12, 2021</CurrentDate>
      <Space height={26} />
      <CalendarDayButtonContainer>
        <CalendarDayButtonText>How are you feeling?</CalendarDayButtonText>
        <Filler />
        <Ionicons name="chevron-forward" size={24} color="white" />
      </CalendarDayButtonContainer>
    </ChatContainer>
  );
};

const SquigglyContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ChatContainer = styled.View``;

const ChatLogHeader = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
`;

const ChatLogText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
`;

const ChatButtonContainer = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #ffffff;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 8px;
`;

const ChatButtonText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
`;

const OldChatContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  padding-vertical: 24px;
`;

const NameText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  color: #ffffff;
`;

const LastMessageText = styled(NameText)`
  font-size: 14px;
`;

const UnreadsContainer = styled.View`
  width: 16px;
  height: 16px;
  background: #f29efe;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const UnreadsText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #371463;
`;

const Unreads = () => {
  return (
    <UnreadsContainer>
      <UnreadsText>10</UnreadsText>
    </UnreadsContainer>
  );
};

const OldChat = () => {
  return (
    <OldChatContainer>
      <Column>
        <Row>
          <Column style={{ justifyContent: "center" }}>
            <ProfileImage />
          </Column>
          <Space width={10} />
          <Column>
            <NameText>Naomi • 2 🔥</NameText>
            <LastMessageText>hello</LastMessageText>
          </Column>
        </Row>
      </Column>
      <Column>
        <LastMessageText>12m</LastMessageText>
        <Space height={8} />
        <Unreads />
      </Column>
    </OldChatContainer>
  );
};

const ChatLog = () => {
  return (
    <ChatContainer>
      <ChatLogHeader>Chat</ChatLogHeader>
      <Space height={18} />
      <OldChat />
      <OldChat />
      {false && (
        <>
          <ChatLogText>{`You haven't chatted with anyone yet today`}</ChatLogText>
          <Space height={10} />
          <ChatButtonContainer>
            <ChatButtonText>Meet someone</ChatButtonText>
          </ChatButtonContainer>
        </>
      )}
    </ChatContainer>
  );
};

const FeelingContainer = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  flex-direction: row;
`;

const FeelingLabel = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
`;

const FeelingText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-size: 19px;
  color: #ffffff;
  margin-left: 4px;
`;

const Feeling = () => {
  return (
    <FeelingContainer>
      <Column>
        <FeelingLabel>{`i'm feeling...`}</FeelingLabel>
        <Space height={8} />
        <Row>
          <OkayIcon />
          <FeelingText>Happy</FeelingText>
        </Row>
      </Column>
      <Ionicons name="chevron-forward" size={24} color="white" />
    </FeelingContainer>
  );
};

export const HomeScreen = () => {
  return (
    <Container edges={["top"]}>
      <CurrentUsers />
      <Space height={130} />

      <Feeling />
      <Space height={32} />
      <ChatLog />
    </Container>
  );
};
