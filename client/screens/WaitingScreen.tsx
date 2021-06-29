import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import styled from "styled-components/native";

import OuterSpaceBackground from "../components/OuterSpaceBackground";
import { RootStackParamList } from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

const Background = styled(OuterSpaceBackground)`
  height: 100vh;
  width: 100vw;
  aspect-ratio: 1;
`;

type WaitingScreenProps = StackScreenProps<RootStackParamList, "WaitingScreen">;

const WaitingScreen = ({ navigation }: WaitingScreenProps) => {
  return (
    <Container>
      <Background />
    </Container>
  );
};

export default WaitingScreen;
