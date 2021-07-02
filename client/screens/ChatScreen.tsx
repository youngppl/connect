import { gql, useMutation, useSubscription } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
  BlackChatText,
  LeftChatBubble,
  RightChatBubble,
} from "../components/ChatBubbles";
import DismissKeyboard from "../components/DismissKeyboard";
import Space from "../components/Space";
import UserInfoCard from "../components/UserInfoCard";
import { RootStackParamList } from "../types";

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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
`;

const TimerText = styled.Text`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 14px;
  color: white;
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

const chatSubscription = gql`
  subscription ChatScreen($channel: String!) {
    chat(channel: $channel) {
      message
      author
    }
  }
`;

const createChatMutation = gql`
  mutation createChat($channel: String!, $message: String!, $author: ID!) {
    createChat(channel: $channel, message: $message, author: $author) {
      message
    }
  }
`;

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const userId = "1"; // !MOCK USER ID
  const {
    params: { channel },
  } = route;
  console.log("subbing to this channel: ", channel);
  const { data } = useSubscription(chatSubscription, {
    variables: { channel },
  });
  const [createChat] = useMutation(createChatMutation);
  const [messages, setMessages] = React.useState<Record<string, any>[]>([]);
  const [messageText, setMessageText] = React.useState<string | undefined>();
  const messagesViewRef = React.useRef(null);
  const [showUserInfo, setShowUserInfo] = React.useState(false);

  React.useEffect(() => {
    console.log("incoming message", data);
    if (data) {
      const { chat } = data;
      setMessages((prev) => [...prev, chat]);
    }
  }, [data]);

  const scrollToLastMessage = () =>
    ((messagesViewRef.current as unknown) as ScrollView)?.scrollToEnd({
      animated: true,
    });

  const onSendMessage = (message: string) => {
    if (message) {
      createChat({ variables: { message, author: userId, channel } });
      setMessageText(undefined);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <FlagButtonContainer>
          <Feather name="flag" size={24} color="white" />
        </FlagButtonContainer>
        <UserInfoButton onPress={() => setShowUserInfo((show) => !show)}>
          <Name>Naomi</Name>
          <Feather
            name={showUserInfo ? "chevron-up" : "chevron-down"}
            size={24}
            color="white"
          />
        </UserInfoButton>
        <TimerContainer>
          <TimerText>10 minutes</TimerText>
        </TimerContainer>
      </HeaderContainer>

      {showUserInfo && (
        <UserInfoContainer>
          <UserInfoCard />
        </UserInfoContainer>
      )}

      <DismissKeyboard>
        <MessagesContainer
          showsVerticalScrollIndicator={false}
          ref={messagesViewRef}
          onContentSizeChange={scrollToLastMessage}
        >
          {messages.map((message, index) => {
            if (message.author === userId)
              return (
                <RightChatBubble
                  author={message.author}
                  key={index}
                  isFirstInChain={message.isFirstInChain}
                >
                  <BlackChatText>{message.message}</BlackChatText>
                </RightChatBubble>
              );
            return (
              <LeftChatBubble
                author={message.author}
                message={message.message}
                key={index}
                isFirstInChain={messages[index - 1].author !== message.author}
                options={message.options}
                onOptionSelect={message.onOptionSelect}
              />
            );
          })}
          <Space height={30} />
        </MessagesContainer>
        <MessageInputContainer>
          <MessageInput
            placeholder={"Message Naomi..."}
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

export default ChatScreen;
