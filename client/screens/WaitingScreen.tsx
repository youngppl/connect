import {gql, useLazyQuery, useMutation, useSubscription} from "@apollo/client";
import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {TouchableOpacityProps, TouchableOpacity} from "react-native";
import styled from "styled-components/native";

import Column from "../components/Column";
import OuterSpaceBackground from "../components/OuterSpaceBackground";
import Space from "../components/Space";
import UserInfoCard from "../components/UserInfoCard";
import {useActualUser} from "../providers/UserProvider";
import {RootStackParamList} from "../types";

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

const ContentContainer = styled(Column)`
  position: absolute;
  top: -30px;
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const BannerText = styled.Text`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  width: 80%;
`;

const TalkTypeText = styled(BannerText)`
  color: #f39fff;
`;

const InfoText = styled(BannerText)`
  font-size: 16px;
`;

const PinkInfoText = styled(InfoText)`
  color: #f39fff;
`;

const ButtonContainer = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid #ffffff;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 56px;
  padding-vertical: 12px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
`;

const CancelText = styled(ButtonText)`
  color: #f39fff;
`;

const CancelButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <CancelText>Cancel</CancelText>
    </TouchableOpacity>
  );
};

type WaitingScreenProps = StackScreenProps<RootStackParamList, "WaitingScreen">;

const waitingRoomSubscription = gql`
  subscription WaitingScreen($userId: ID!, $chatTypes: [ConversationType!]!) {
    waitingRoom(userId: $userId, chatTypes: $chatTypes) {
      message
      users
      channel
      icebreaker
      chatType
    }
  }
`;

const getUserQuery = gql`
  query getUserQuery($id: ID!) {
    getUser(id: $id) {
      id
      name
      pronouns
      createdAt
      birthday
    }
  }
`;

const leaveWaitingRoomMutation = gql`
  mutation leaveWaitingRoom($userId: ID!) {
    leaveWaitingRoom(userId: $userId)
  }
`;

const WaitingScreen = ({navigation, route}: WaitingScreenProps) => {
  const {id: userId} = useActualUser();
  const {chatTypes} = route.params;
  const {data: matchData} = useSubscription(waitingRoomSubscription, {
    variables: {userId, chatTypes},
    onSubscriptionData: ({subscriptionData}) => {
      const matchData = subscriptionData.data;
      const {
        waitingRoom: {users, channel, chatType},
      } = matchData;
      if (users.includes(userId)) {
        clearTimeout(matchTimeoutTimerId);
        const toChatTimer = setInterval(
          () => setToChatScreenSeconds((seconds) => seconds - 1),
          1000,
        );
        setState("matched");
        const id = users.filter((id: string) => id !== userId)[0];
        getMatchedUser({variables: {id}});
        setMatchedChatType(chatType + " talk");
        setChannel(channel);
        return () => clearInterval(toChatTimer);
      }
    },
  });
  const [getMatchedUser, {data: matchedUserData}] = useLazyQuery(getUserQuery);
  const [leaveWaitingRoom] = useMutation(leaveWaitingRoomMutation);

  const [state, setState] = React.useState("waiting");
  const [channel, setChannel] = React.useState("");
  const [matchedChatType, setMatchedChatType] = React.useState("");
  const [matchTimeoutTimerId, setMatchTimeoutTimerId] = React.useState<number>();
  const [toChatScreenSeconds, setToChatScreenSeconds] = React.useState(5);

  React.useEffect(() => {
    // Match timeout - quit waiting after 30 seconds
    const timerId = setTimeout(() => setState("no match"), 10000);
    setMatchTimeoutTimerId(timerId);
  }, []);

  React.useEffect(() => {
    // after a match, go to chat screen after 5 seconds
    if (toChatScreenSeconds === 0) {
      navigation.replace("ChatScreen", {
        channel,
        otherUser: matchedUserData.getUser,
        alreadyMessaged: false,
      });
    }
  }, [toChatScreenSeconds]);

  const goBackToHomeScreen = (params: {initiateChat?: boolean} = {}) => {
    leaveWaitingRoom({variables: {userId}});
    navigation.replace("MainTabs", params);
  };

  return (
    <Container>
      <Background />
      <ContentContainer>
        {state === "waiting" && <BannerText>One sec. We’re finding someone for you...</BannerText>}
        {state === "matched" && matchedUserData && (
          <>
            <BannerText>
              {"You’ve been matched to have a "}
              <TalkTypeText>{matchedChatType}</TalkTypeText>
            </BannerText>
            <Space height={24} />
            <UserInfoCard user={matchedUserData?.getUser} />
            <Space height={70} />
            <InfoText>
              You’ll be taken to the chat room in <PinkInfoText>{toChatScreenSeconds}</PinkInfoText>{" "}
              seconds
            </InfoText>
          </>
        )}

        {state === "no match" && (
          <>
            <BannerText>{"Uh oh! We couldn't find anyone for you."}</BannerText>
            <Space height={36} />
            <ButtonContainer onPress={() => goBackToHomeScreen({initiateChat: true})}>
              <ButtonText>Adjust type of conversation</ButtonText>
            </ButtonContainer>
            <Space height={18} />
            <CancelButton onPress={() => goBackToHomeScreen()} />
          </>
        )}

        {state === "user left" && (
          <>
            <BannerText>Uh oh! Looks like someone just got lost in space.</BannerText>
            <Space height={36} />
            <ButtonContainer>
              <ButtonText>Find someone else for me</ButtonText>
            </ButtonContainer>
            <Space height={18} />
            <CancelButton />
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default WaitingScreen;
