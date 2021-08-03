import {gql, useMutation, useQuery} from "@apollo/client";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import * as React from "react";
import {ActivityIndicator, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
  Conversation,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  User,
} from "../../backend/src/resolvers-types";
import {BlackChatText, LeftChatBubble, RightChatBubble} from "../components/ChatBubbles";
import DismissKeyboard from "../components/DismissKeyboard";
import Space from "../components/Space";
import UserInfoCard from "../components/UserInfoCard";
import {useActualUser} from "../providers/UserProvider";
import {RootStackParamList} from "../types";

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
`;

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 16px 20px;
  z-index: 5;
  border-bottom-color: rgba(255, 255, 255, 0.25);
  border-bottom-width: 1px;
`;

const MessagesContainer = styled.ScrollView`
  padding: 10px;
  flex: 1;
  width: 100%;
`;

const FlagButtonContainer = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  width: 32px;
  height: 32px;
`;

const UserInfoButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const Name = styled.Text`
  color: white;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
`;

const TimerContainer = styled.View`
  position: absolute;
  right: 20px;
  background: ${(props: {secondsLeft: number}) =>
    props.secondsLeft > 60 ? "rgba(255, 255, 255, 0.1)" : "#FF97D5"};
  border-radius: 8px;
  padding: 10px;
`;

const TimerText = styled.Text`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 14px;
  color: ${(props: {secondsLeft: number}) => (props.secondsLeft > 60 ? "white" : "#371463")};
`;

const UserInfoContainer = styled.View`
  position: absolute;
  z-index: 5;
  top: 105px;
  background: #371463;
  padding: 20px 16px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  width: 100%;
`;

const IcebreakerCardContainer = styled.View`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 16px;
  margin: 16px;
`;
const IcebreakerHeading = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 10px;
`;
const IcebreakerText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
`;

const IcebreakerCard = ({icebreaker}: {icebreaker: string}) => (
  <IcebreakerCardContainer>
    <IcebreakerHeading>ICEBREAKER</IcebreakerHeading>
    <IcebreakerText>{icebreaker}</IcebreakerText>
  </IcebreakerCardContainer>
);

const MessageInputContainer = styled.View`
  background-color: #371463;
  padding: 22px 16px;
  z-index: 5;
  bottom: 0;
  width: 100%;
  border-top-color: rgba(255, 255, 255, 0.25);
  border-top-width: 1px;
`;

const MessageInput = styled.TextInput`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 64px;
  width: 100%;
  height: 48px;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  color: #ffffff;
  padding: 14px 16px;
`;

type ChatScreenProps = StackScreenProps<RootStackParamList, "ChatScreen">;

const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    text
    createdAt
    userId
  }
`;

const CHAT_SUBSCRIPTION = gql`
  ${MESSAGE_FRAGMENT}
  subscription ChatScreen($channel: String!) {
    chat(channel: $channel) {
      id
      ...MessageFragment
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  ${MESSAGE_FRAGMENT}
  mutation createMessage($channel: String!, $message: String!, $author: ID!) {
    createMessage(channel: $channel, message: $message, author: $author) {
      id
      ...MessageFragment
      __typename
    }
  }
`;

const CONVERSATION_QUERY = gql`
  ${MESSAGE_FRAGMENT}
  query ChatScreenConversation($channel: String!) {
    getConversation(channel: $channel) {
      id
      messages {
        id
        ...MessageFragment
      }
    }
  }
`;

// TODO: set up the yarn graphql codegen for operations to fix these type errors
interface ChatScreenDataContainerProps {
  channel: string;
  icebreaker: string | undefined;
  otherUser: User; // Fix
  conversation: Conversation; // Fix
  subscribeToNewMessages: () => void;
  alreadyMessaged: boolean;
}

const ChatScreenDataContainer = ({
  channel,
  icebreaker,
  otherUser,
  conversation,
  subscribeToNewMessages,
  alreadyMessaged,
}: ChatScreenDataContainerProps) => {
  const navigation = useNavigation();
  const {id: userId} = useActualUser();
  const [createMessage] = useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
    CREATE_MESSAGE_MUTATION,
  );
  const [messageText, setMessageText] = React.useState<string | undefined>();
  const messagesViewRef = React.useRef(null);
  const [showUserInfo, setShowUserInfo] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(60);
  const [showIcebreaker, setShowIcebreaker] = React.useState(true);

  const scrollToLastMessage = () =>
    ((messagesViewRef.current as unknown) as ScrollView)?.scrollToEnd({
      animated: true,
    });

  React.useEffect(() => {
    scrollToLastMessage();
    const unsubscribe = subscribeToNewMessages();
    return () => unsubscribe(); // TODO: Apollo docs fix
  }, []);

  React.useEffect(() => {
    if (!alreadyMessaged) {
      const intervalId = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const formatTimeLeft = React.useMemo(() => {
    if (secondsLeft === 0) navigation.replace("TimesUpScreen", {channel});
    if (secondsLeft > 60) {
      const minutesLeft = Math.floor(secondsLeft / 60);
      return `${minutesLeft} min left`;
    } else {
      return `${secondsLeft}s left`;
    }
  }, [secondsLeft]);

  React.useEffect(() => {
    if (conversation.messages.length > 1) {
      setShowIcebreaker(false);
    }
  }, [conversation.messages]);

  console.log(userId);
  console.log(conversation.messages);
  const onSendMessage = (message: string) => {
    if (message) {
      createMessage({variables: {message, author: userId, channel}});
      setMessageText(undefined);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <FlagButtonContainer>
          <Feather name="flag" size={24} color="white" />
        </FlagButtonContainer>
        {alreadyMessaged && <Space width={150} />}
        <UserInfoButton onPress={() => setShowUserInfo((show) => !show)}>
          <Name>{otherUser.name}</Name>
          <Feather name={showUserInfo ? "chevron-up" : "chevron-down"} size={24} color="white" />
        </UserInfoButton>
        {alreadyMessaged ? (
          <>
            <Space width={100} />
            <GoBack />
          </>
        ) : (
          <TimerContainer secondsLeft={secondsLeft}>
            <TimerText secondsLeft={secondsLeft}>{formatTimeLeft}</TimerText>
          </TimerContainer>
        )}
      </HeaderContainer>

      {showUserInfo && (
        <UserInfoContainer>
          <UserInfoCard user={otherUser} />
        </UserInfoContainer>
      )}

      {!alreadyMessaged && showIcebreaker && <IcebreakerCard icebreaker={icebreaker} />}

      <DismissKeyboard>
        <MessagesContainer
          showsVerticalScrollIndicator={false}
          ref={messagesViewRef}
          onContentSizeChange={scrollToLastMessage}
        >
          {conversation.messages.map((message, index) => {
            if (message.userId === userId)
              return (
                <RightChatBubble author={message.name} key={index}>
                  <BlackChatText>{message.text}</BlackChatText>
                </RightChatBubble>
              );
            return (
              <LeftChatBubble
                author={otherUser.name}
                message={message.text}
                key={index}
                isFirstInChain={index === 0 || conversation.messages[index - 1].id !== message.id}
              />
            );
          })}
          <Space height={30} />
        </MessagesContainer>
        <MessageInputContainer>
          <MessageInput
            placeholder={`Message ${otherUser.name}...`}
            placeholderTextColor={"white"}
            returnKeyType="send"
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={(event) => onSendMessage(event.nativeEvent.text)}
          />
        </MessageInputContainer>
      </DismissKeyboard>
    </Container>
  );
};

const GoBackButton = styled.TouchableOpacity`
  right: 0px;
`;

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <GoBackButton
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Feather name="chevron-left" size={24} color="white" />
    </GoBackButton>
  );
};

const ChatScreen = ({route}: ChatScreenProps) => {
  const {
    params: {channel, otherUser, icebreaker, alreadyMessaged},
  } = route;
  const {subscribeToMore, data, loading} = useQuery(CONVERSATION_QUERY, {
    variables: {channel},
  });
  if (loading)
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );

  return (
    <ChatScreenDataContainer
      conversation={data.getConversation}
      channel={channel}
      otherUser={otherUser}
      icebreaker={icebreaker}
      alreadyMessaged={alreadyMessaged || false}
      subscribeToNewMessages={() =>
        subscribeToMore({
          document: CHAT_SUBSCRIPTION,
          variables: {channel},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) return prev;
            const newMessageItem = subscriptionData.data.chat;
            return Object.assign({}, prev, {
              getConversation: {
                messages: [newMessageItem, ...prev.getConversation.messages],
              },
            });
          },
        })
      }
    />
  );
};

export default ChatScreen;
