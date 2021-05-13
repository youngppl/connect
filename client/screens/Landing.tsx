import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";

import styled from "styled-components/native";

import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
  align-items: center;
`;

const Space = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  color: #ffffff;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 311px;
  height: 68px;
  background: #ff97d5;
  box-shadow: 0px 0px 10px #ff97d5;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #371463;
`;

type LandingProps = StackScreenProps<RootStackParamList, "Landing">;

const Landing = ({ navigation }: LandingProps) => {
  return (
    <Container>
      <Space />
      <Title>Jufa</Title>
      <Space />
      <ButtonContainer onPress={() => navigation.push("CreateProfile")}>
        <ButtonText>Get Started</ButtonText>
      </ButtonContainer>
      <Space />
    </Container>
  );
};

export default Landing;
