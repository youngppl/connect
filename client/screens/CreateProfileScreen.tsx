import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";

import styled from "styled-components/native";

import { LeftChatBubble, RightChatBubble } from "../components/ChatBubbles";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
`;

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 50px 0;
`;

const BackButtonContainer = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 16px;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
`;

type CreateProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "CreateProfile"
>;

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
  return (
    <Container>
      <HeaderContainer>
        <BackButtonContainer onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButtonContainer>
        <HeaderTitle>Get Started</HeaderTitle>
      </HeaderContainer>
      <LeftChatBubble name={"jufa"} message={"asdf"} />
      <RightChatBubble name={"you"} message={"asdfafs"} />
    </Container>
  );
};

export default CreateProfileScreen;
