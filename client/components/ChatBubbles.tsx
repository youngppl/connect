import * as React from "react";
import styled from "styled-components/native";

const WhiteChatText = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  flex-wrap: wrap;
  flex-shrink: 1;
`;

export const BlackChatText = styled(WhiteChatText)`
  color: #371463;
`;

const NameText = styled(WhiteChatText)`
  font-size: 14px;
`;

const ProfileImage = styled.View`
  background-color: #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 18px;
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
  align-self: flex-end;
`;

const LeftChatBubbleContainer = styled.View`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  border-top-left-radius: 4px;
  padding-vertical: 20px;
  padding-right: 10px;
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
  flex: 3;
`;

interface ChatBubbleProps {
  author?: string;
  message?: string;
  isFirstInChain: boolean;
}

export const LeftChatBubble = ({
  author,
  message,
  isFirstInChain,
}: ChatBubbleProps) => {
  return (
    <ChatContainer>
      {isFirstInChain && (
        <ChatBubbleContainer>
          <Space style={{ alignItems: "center", top: 18 }}>
            <ProfileImage />
          </Space>
          <NameContainer>
            <NameText>{author}</NameText>
          </NameContainer>
          <Space />
        </ChatBubbleContainer>
      )}
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

export const RightChatBubble = ({
  message,
  isFirstInChain,
  children,
}: ChatBubbleProps & { children?: React.ReactElement }) => {
  return (
    <ChatContainer>
      {/* {isFirstInChain && (
        <ChatBubbleContainer>
          <Space />
          <NameContainer>
            <NameText style={{ textAlign: "right" }}>You</NameText>
          </NameContainer>
        </ChatBubbleContainer>
      )} */}
      <ChatBubbleContainer>
        <Space />
        <RightChatBubbleContainer>{children}</RightChatBubbleContainer>
      </ChatBubbleContainer>
    </ChatContainer>
  );
};
