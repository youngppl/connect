import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import PlanetBackground from "../components/PlanetBackground";
import Space from "../components/Space";
import Squiggly from "../components/Squiggly";
import { RootStackParamList } from "../types";

type HomeScreenProps = StackScreenProps<RootStackParamList, "HomeScreen">;

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 10px;
`;

const Filler = styled.View`
  flex: 1;
`;

const SpaceBackgroundContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const SpaceBackground = () => {
  return (
    <SpaceBackgroundContainer>
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

const ChatContainer = styled.View`
  padding-horizontal: 20px;
`;

const ChatLogHeader = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
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

const ChatLog = () => {
  return (
    <ChatContainer>
      <ChatLogHeader>Chat log</ChatLogHeader>
      <Space height={18} />
      <ChatLogText>{`You haven't chatted with anyone yet today`}</ChatLogText>
      <Space height={10} />
      <ChatButtonContainer>
        <ChatButtonText>Meet someone</ChatButtonText>
      </ChatButtonContainer>
    </ChatContainer>
  );
};

export const HomeScreen = () => {
  return (
    <Container>
      <SpaceBackground />
      <CalendarWeek />
      <Space height={24} />
      <CalendarDay />
      <Space height={34} />
      <SquigglyContainer>
        <Squiggly />
      </SquigglyContainer>
      <Space height={30} />
      <ChatLog />
    </Container>
  );
};
