import { gql, useMutation, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styled from "styled-components/native";

import BottomSheet, {
  BottomSheetButton,
  BottomSheetHeading,
} from "../components/BottomSheet";
import Column from "../components/Column";
import OkayIcon from "../components/emotions/Okay";
import FeelingSlider from "../components/FeelingSlider";
import Background from "../components/PlanetBackground";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";
import { MOODS } from "../constants/Moods";
import { UserContext } from "../providers/UserProvider";
import { User } from "../types";

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 18px;
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

const updateMoodMutation = gql`
  mutation updateMood($userId: ID!, $mood: String!) {
    updateMood(userId: $userId, mood: $mood)
  }
`;

const FeelingSheet = ({
  name,
  visible,
  setVisible,
  refetchUser,
}: {
  name: string;
  visible: boolean;
  setVisible: any;
  refetchUser: () => void;
}) => {
  const { id } = React.useContext(UserContext);
  const [updateMood] = useMutation(updateMoodMutation);
  const [mood, setMood] = React.useState(3);

  const handleDone = async () => {
    await updateMood({ variables: { userId: id, mood: MOODS[mood - 1] } });
    await refetchUser();
    setVisible(false);
  };

  return (
    <BottomSheet visible={visible} setVisible={setVisible}>
      <BottomSheetHeading>
        Hey {name}, how are you feeling right now?
      </BottomSheetHeading>
      <Space height={44} />
      <FeelingSlider mood={mood} setMood={setMood} />
      <Space height={40} />
      <BottomSheetButton onPress={handleDone}>Done</BottomSheetButton>
    </BottomSheet>
  );
};

const Feeling = ({
  user,
  refetchUser,
}: {
  user: User;
  refetchUser: () => void;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <FeelingContainer onPress={() => setShowModal(true)}>
        <Column>
          <FeelingLabel>{`i'm feeling...`}</FeelingLabel>
          <Space height={8} />
          <Row>
            <OkayIcon />
            <FeelingText>{user.mood || "🤷🏽‍♀️"}</FeelingText>
          </Row>
        </Column>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </FeelingContainer>
      <FeelingSheet
        refetchUser={refetchUser}
        name={user.name}
        visible={showModal}
        setVisible={setShowModal}
      />
    </>
  );
};

const getUserQuery = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      name
      mood
    }
  }
`;

export const HomeScreen = () => {
  const { id } = React.useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(getUserQuery, {
    variables: { id },
  });

  useFocusEffect(React.useCallback(() => refetch, [data]));

  return (
    <Container edges={["top"]}>
      <CurrentUsers />
      <Space height={130} />
      <Feeling user={data?.getUser || {}} refetchUser={refetch} />
      <Space height={32} />
      <ChatLog />
    </Container>
  );
};
