import {gql, useLazyQuery, useMutation, useQuery, useSubscription} from "@apollo/client";
import {Ionicons} from "@expo/vector-icons";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {formatDistance} from "date-fns";
import _ from "lodash";
import pluralize from "pluralize";
import * as React from "react";
import {ActivityIndicator} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import styled from "styled-components/native";

import {Conversation} from "../../backend/src/resolvers-types";
import BottomSheet, {BottomSheetButton, BottomSheetHeading} from "../components/BottomSheet";
import Column from "../components/Column";
import EarnedBadgeSheet from "../components/EarnedBadgeSheet";
import MoodIcon from "../components/emotions/MoodIcon";
import FeelingSlider from "../components/FeelingSlider";
import Background from "../components/PlanetBackground";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";
import {MOODS} from "../constants/Moods";
import {useActualUser} from "../providers/UserProvider";
import {RootStackParamList, User} from "../types";

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 18px;
`;

const SpaceBackgroundContainer = styled.View`
  position: absolute;
  top: ${(props: {top: number}) => props.top}px;
  left: 0;
`;

const PlanetBackground = styled(Background)`
  position: absolute;
`;

const SpeechBubble = styled.View`
  position: relative;
  width: 180px;
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

const CurrentUsers = ({numPeople}: {numPeople: number}) => {
  const insets = useSafeAreaInsets();

  return (
    <SpaceBackgroundContainer top={insets.top}>
      <SpeechBubble>
        <SpeechText>{pluralize("person", numPeople, true)} online</SpeechText>
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

function makeNiceDate(dbDate: string | null | undefined) {
  return formatDistance(dbDate ? new Date(parseInt(dbDate)) : new Date(), Date.now(), {
    addSuffix: true,
  });
}

const OldChat = ({conversation, userId}: {conversation: Conversation; userId: string | null}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const otherPerson = _.reject(conversation.people, ["id", userId])[0]; // Assuming 2 ppl -> 1 person on this filter.
  return (
    <OldChatContainer
      onPress={() => {
        navigation.push("ChatScreen", {
          channel: conversation.channel,
          otherUser: otherPerson,
          alreadyMessaged: true,
        });
      }}
    >
      <Column>
        <Row>
          <Column style={{justifyContent: "center"}}>
            <ProfileImage />
          </Column>
          <Space width={10} />
          <Column>
            <NameText>
              {otherPerson?.name}
              {conversation?.streak ? `• ${conversation.streak} 🔥` : ""}
            </NameText>
            <LastMessageText>{conversation?.lastMessage?.text || `hi`}</LastMessageText>
          </Column>
        </Row>
      </Column>
      <Column>
        <LastMessageText>{makeNiceDate(conversation?.lastMessage?.createdAt)}</LastMessageText>
        <Space height={8} />
        {conversation?.isUnread && <UnreadsContainer />}
      </Column>
    </OldChatContainer>
  );
};

const CHAT_LOG_QUERY = gql`
  query ChatLogQuery($userId: ID!) {
    getConversations(userId: $userId) {
      id
      createdAt
      channel
      streak
      lastMessage {
        id
        text
        createdAt
      }
      people {
        id
        name
      }
      isUnread(userId: $userId)
    }
  }
`;

const SINGLE_CHAT_QUERY = gql`
  query SingleChatQuery($channel: String!) {
    getConversation(channel: $channel) {
      id
      lastMessage {
        id
        text
        createdAt
      }
    }
  }
`;

const HOME_SCREEN_CHAT_UPDATE_SUBSCRIPTION = gql`
  subscription HomeScreenChatUpdateSubscription($userId: ID!) {
    homeScreenChatUpdates(userId: $userId) {
      channel
    }
  }
`;

const ChatLog = () => {
  const {id} = useActualUser();
  const [singleChatQuery] = useLazyQuery(SINGLE_CHAT_QUERY, {
    fetchPolicy: "network-only",
  });
  const {data, loading} = useQuery(CHAT_LOG_QUERY, {
    variables: {userId: id},
    skip: !id,
  });
  useSubscription(HOME_SCREEN_CHAT_UPDATE_SUBSCRIPTION, {
    variables: {userId: id},
    onSubscriptionData: ({subscriptionData}) => {
      console.log(subscriptionData);
      const returnData = subscriptionData.data;
      const {
        homeScreenChatUpdates: {channel},
      } = returnData;
      singleChatQuery({variables: {channel}});
    },
  });

  if (loading) {
    return null;
  }

  const renderItem = ({item}: {item: Conversation}) => {
    return <OldChat conversation={item} userId={id} />;
  };

  return (
    <ChatContainer>
      <ChatLogHeader>Chat</ChatLogHeader>
      <Space height={18} />
      <FlatList
        data={data?.getConversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingBottom: 300}}
        showsVerticalScrollIndicator={false}
      />
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
    updateMood(userId: $userId, mood: $mood) {
      id
      mood
    }
  }
`;

const FeelingSheet = ({
  name,
  currentMood,
  visible,
  setVisible,
}: {
  name: string;
  currentMood: string;
  visible: boolean;
  setVisible: any;
}) => {
  const {id} = useActualUser();
  const [updateMood] = useMutation(updateMoodMutation);
  const [mood, setMood] = React.useState(3);

  React.useEffect(() => setMood(MOODS.indexOf(currentMood) + 1), [currentMood]);

  const handleDone = async () => {
    await updateMood({variables: {userId: id, mood: MOODS[mood - 1]}});
    setVisible(false);
  };

  return (
    <BottomSheet visible={visible} setVisible={setVisible}>
      <BottomSheetHeading>Hey {name}, how are you feeling right now?</BottomSheetHeading>
      <Space height={44} />
      <FeelingSlider mood={mood} setMood={setMood} />
      <Space height={40} />
      <BottomSheetButton onPress={handleDone}>Done</BottomSheetButton>
    </BottomSheet>
  );
};

const Feeling = ({user}: {user: User}) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <FeelingContainer onPress={() => setShowModal(true)}>
        <Column>
          <FeelingLabel>{`i'm feeling...`}</FeelingLabel>
          <Space height={8} />
          <Row>
            <MoodIcon mood={user.mood} />
            <FeelingText>{user.mood || "🤷🏽‍♀️"}</FeelingText>
          </Row>
        </Column>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </FeelingContainer>
      <FeelingSheet
        name={user.name as string}
        currentMood={user.mood || "Calm"}
        visible={showModal}
        setVisible={setShowModal}
      />
    </>
  );
};

const HOME_SCREEN_QUERY = gql`
  query HomeScreen($id: ID!) {
    onlineUsers
    getUser(id: $id) {
      id
      name
      mood
      badgeNumbers {
        joymaker
        charming
        jufanaut
      }
      extra {
        showJoymaker
        showCharming
        showJufanaut
      }
    }
  }
`;

export const HomeScreen = () => {
  const {id} = useActualUser();
  const {data, refetch, loading} = useQuery(HOME_SCREEN_QUERY, {
    variables: {id},
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [data?.getUser]),
  );

  if (loading || !data) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <Container edges={["top"]}>
      <EarnedBadgeSheet user={data?.getUser} badge={"Joymaker"} count={data?.getUser.badgeNumbers.joymaker} />
      <EarnedBadgeSheet user={data?.getUser} badge={"Jufa-naut"} count={data?.getUser.badgeNumbers.jufanaut} />
      <EarnedBadgeSheet user={data?.getUser} badge={"Charming"} count={data?.getUser.badgeNumbers.charming} />
      <CurrentUsers numPeople={data?.onlineUsers} />
      <Space height={130} />
      <Feeling user={data?.getUser || {}} />
      <Space height={32} />
      <ChatLog />
    </Container>
  );
};
