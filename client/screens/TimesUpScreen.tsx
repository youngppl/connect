import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import styled from "styled-components/native";

import Space from "../components/Space";
import {RootStackParamList} from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  color: white;
`;

const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

type TimesUpScreenProps = StackScreenProps<RootStackParamList, "TimesUpScreen">;

const TimesUpScreen = ({navigation, route}: TimesUpScreenProps) => {
  const {channel, otherUser} = route.params;

  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace("FeedbackScreen", {channel, otherUser});
    }, 2000);
  }, []);

  return (
    <Container>
      <Content>
        <Title>⏰</Title>
        <Title>{"Time's Up!"}</Title>
        <Space height={40} />
      </Content>
    </Container>
  );
};

export default TimesUpScreen;
