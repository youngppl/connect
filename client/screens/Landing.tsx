import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import styled from "styled-components/native";

import LandingBackground from "../components/LandingBackground";
import {RootStackParamList} from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const Background = styled(LandingBackground)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 311px;
  height: 68px;
  background: #ff97d5;
  box-shadow: 0px 0px 10px #ff97d5;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 70%;
`;

const ButtonText = styled.Text`
  font-family: Quicksand;
  font-size: 24px;
  font-weight: bold;
  color: #371463;
`;

type LandingProps = StackScreenProps<RootStackParamList, "Landing">;

const Landing = ({navigation}: LandingProps) => {
  return (
    <Container>
      <Background />
      <ButtonContainer onPress={() => navigation.push("CreateProfileScreen")}>
        <ButtonText>Get Started</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Landing;
