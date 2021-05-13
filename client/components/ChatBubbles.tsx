import * as React from "react";

import styled from "styled-components/native";

const WhiteChatText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

const BlackChatText = styled(WhiteChatText)`
  color: #371463;
`;

const NameText = styled(WhiteChatText)`
  font-size: 14px;
`;

const Space = styled.View`
  flex: 2;
`;

const FixedSpace = styled.View`
  width: 20px;
`;

const ChatContainer = styled.View`
  flex-direction: column;
  margin-bottom: 14px;
`;

const ChatBubbleContainer = styled.View`
  flex-direction: row;
`;

const NameContainer = styled.View`
  flex: 8;
  margin: 0;
  padding: 0;
`;

const LeftChatBubbleContainer = styled.View`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border-top-left-radius: 4px;
  padding-vertical: 20px;
  flex-direction: row;
  flex: 8;
`;

const RightChatBubbleContainer = styled.View`
  background: #ff97d5;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border-top-right-radius: 4px;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  margin-right: 14px;
  flex: 3;
`;

export const LeftChatBubble = ({ name, message }) => {
  return (
    <ChatContainer>
      <ChatBubbleContainer>
        <Space />
        <NameContainer>
          <NameText>{name}</NameText>
        </NameContainer>
        <Space />
      </ChatBubbleContainer>
      <ChatBubbleContainer>
        <Space />
        <LeftChatBubbleContainer>
          <FixedSpace />
          <WhiteChatText>{message}</WhiteChatText>
        </LeftChatBubbleContainer>
        <Space />
      </ChatBubbleContainer>
    </ChatContainer>
  );
};

export const RightChatBubble = ({ name, message }) => {
  return (
    <ChatBubbleContainer>
      <Space />
      <RightChatBubbleContainer>
        <BlackChatText>{message}</BlackChatText>
      </RightChatBubbleContainer>
    </ChatBubbleContainer>
  );
};
