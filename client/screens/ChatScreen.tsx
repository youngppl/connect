import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
  BlackChatText,
  LeftChatBubble,
  RightChatBubble,
} from "../components/ChatBubbles";
import Column from "../components/Column";
import DismissKeyboard from "../components/DismissKeyboard";
import OkayIcon from "../components/emotions/Okay";
import ProfileImage from "../components/ProfileImage";
import Row from "../components/Row";
import Space from "../components/Space";
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
  position: relative;
  z-index: 5;
  border-bottom-color: rgba(255, 255, 255, 0.25);
  border-bottom-width: 1px;
`;

const MessagesContainer = styled.ScrollView`
  flex: 1;
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
`;

const TimerText = styled.Text`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 14px;
  color: white;
`;

const Input = styled.TextInput`
  font-family: Quicksand;
  font-size: 16px;
  color: #371463;
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

const UserInfoCard = styled.View`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px 18px;
`;

const UserInfoHeading = styled(Row)`
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const UserInfoTitle = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #ffffff;
`;

const UserInfoSubtitle = styled(UserInfoTitle)`
  font-size: 16px;
`;

const UserInfoText = styled(UserInfoTitle)`
  font-size: 14px;
  padding-bottom: 10px;
`;

const MessageInputContainer = styled.View`
  padding: 22px 16px;
  position: absolute;
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

const ChatScreen = ({ navigation }: ChatScreenProps) => {
  const [messages, setMessages] = React.useState<Record<string, any>[]>([]);
  const [messageText, setMessageText] = React.useState();
  const messagesViewRef = React.useRef(null);
  const [showUserInfo, setShowUserInfo] = React.useState(false);

  const scrollToLastMessage = () =>
    ((messagesViewRef.current as unknown) as ScrollView)?.scrollToEnd({
      animated: true,
    });

  const onSendMessage = (message) => {
    setMessages((messages) => [...messages, { author: "you", message }]);
    setMessageText("");
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
          <UserInfoCard>
            <UserInfoHeading>
              <Column>
                <ProfileImage />
              </Column>
              <Space width={10} />
              <Column>
                <UserInfoTitle>Naomi</UserInfoTitle>
                <UserInfoSubtitle>She/her</UserInfoSubtitle>
              </Column>
            </UserInfoHeading>
            <Column>
              <Row>
                <UserInfoText>Feeling Happy </UserInfoText>
                <OkayIcon />
              </Row>
              <UserInfoText>Joined in July 2021</UserInfoText>
              <UserInfoText>
                Interested in Basketball, Marvel, and Art
              </UserInfoText>
            </Column>
          </UserInfoCard>
        </UserInfoContainer>
      )}

      <DismissKeyboard>
        <MessagesContainer
          showsVerticalScrollIndicator={false}
          ref={messagesViewRef}
          onContentSizeChange={scrollToLastMessage}
        >
          {messages.map((message, index) => {
            if (message.author === "you")
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
                isFirstInChain={message.isFirstInChain}
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
