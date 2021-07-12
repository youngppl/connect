import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import Column from "../components/Column";
import OuterSpaceBackground from "../components/OuterSpaceBackground";
import Space from "../components/Space";
import UserInfoCard from "../components/UserInfoCard";
import { UserContext } from "../providers/UserProvider";
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
  subscription WaitingScreen($userId: ID!, $chatTypes: [String!]!) {
    waitingRoom(userId: $userId, chatTypes: $chatTypes) {
      message
      users
      channel
    }
  }
`;

const getUserQuery = gql`
  query getUserQuery($id: ID!) {
    getUser(id: $id) {
      name
      pronouns
      joined
      birthday
    }
  }
`;

const WaitingScreen = ({ navigation, route }: WaitingScreenProps) => {
  const { id: userId } = React.useContext(UserContext);
  const {
    params: { chatTypes },
  } = route;
  const { data: matchData } = useSubscription(waitingRoomSubscription, {
    variables: { userId, chatTypes },
  });
  const [getMatchedUser, { loading, data: matchedUserData }] = useLazyQuery(
    getUserQuery
  );

  const [state, setState] = React.useState("waiting");
  const [channel, setChannel] = React.useState("");

  React.useEffect(() => {
    console.log(matchData);
    if (matchData) {
      const {
        waitingRoom: { users, channel },
      } = matchData;
      if (users.includes(userId)) {
        setState("matched");
        setChannel(channel);
        const id = users.filter((id: string) => id !== userId)[0];
        getMatchedUser({ variables: { id } });
      }
    }
  }, [matchData]);

  return (
    <Container>
      <Background />
      <ContentContainer>
        {state === "waiting" && (
          <BannerText>One sec. We’re finding someone for you...</BannerText>
        )}
        {state === "matched" && matchedUserData && (
          <>
            <BannerText>
              {"You’ve been matched to have a "}
              <TalkTypeText>{matchData.waitingRoom.chatType}</TalkTypeText>
            </BannerText>
            <Space height={24} />
            <UserInfoCard user={matchedUserData.getUser} />
            <Space height={70} />
            <ButtonContainer
              onPress={() => navigation.replace("ChatScreen", { channel })}
            >
              <ButtonText>Talk to {matchedUserData.getUser.name}</ButtonText>
            </ButtonContainer>
          </>
        )}

        {state === "no match" && (
          <>
            <BannerText>
              Uh oh! There isn’t anyone online for a deep talk.
            </BannerText>
            <Space height={36} />
            <ButtonContainer>
              <ButtonText>Adjust type of conversation</ButtonText>
            </ButtonContainer>
            <Space height={18} />
            <CancelButton />
          </>
        )}

        {state === "user left" && (
          <>
            <BannerText>
              Uh oh! Looks like someone just got lost in space.
            </BannerText>
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
