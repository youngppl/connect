import * as React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export default function TabTwoScreen() {
  return (
    <Container>
      <StyledText>yoooo</StyledText>
    </Container>
  );
}
