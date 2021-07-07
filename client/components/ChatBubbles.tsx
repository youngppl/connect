import * as React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import ProfileImage from "../components/ProfileImage";
import Star from "../components/Star";

import Row from "./Row";

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

interface Option {
  text: string;
  value?: string | number | undefined;
  selectedValue: string | number | undefined;
  setValue: (value: Record<string, string | number | undefined>) => void;
}

const SelectionOptionsContainer = styled.View`
  flex: 10;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 0;
`;

const SelectionOptionContainer = styled.TouchableOpacity`
  padding: 10px;
  height: 42px;
  border: 1px solid #ffffff;
  border-radius: 48px;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  background: ${(props: { selected: boolean }) =>
    props.selected ? "white" : "transparent"};
  margin-right: 8px;
  margin-bottom: 8px;
`;

const SelectionOptionText = styled(WhiteChatText)`
  font-size: 16px;
  color: ${(props: { selected: boolean }) =>
    props.selected ? "#371463" : "#ffffff"};
`;

const SelectionOption = ({ text, value, selectedValue, setValue }: Option) => {
  const selected = (text || value) === selectedValue;

  const handleSelect = () => {
    setValue({ text, value: text || value });
  };

  return (
    <SelectionOptionContainer selected={selected} onPress={handleSelect}>
      <SelectionOptionText selected={selected}>{text}</SelectionOptionText>
    </SelectionOptionContainer>
  );
};

const RatingContainer = styled(Row)`
  margin-top: 12px;
  flex: 8;
  justify-content: flex-start;
`;

const Rating = ({ onOptionSelect }) => {
  const [rating, setRating] = React.useState(-1);
  const handleSelection = (rating: number) => {
    onOptionSelect({ value: rating + 1 });
    setRating(rating);
  };

  return (
    <RatingContainer>
      {[...Array(5).keys()].map((index) => (
        <>
          <TouchableOpacity onPress={() => handleSelection(index)} key={index}>
            <Star filled={index <= rating} />
          </TouchableOpacity>
          <Space />
        </>
      ))}
    </RatingContainer>
  );
};

interface ChatBubbleProps {
  author?: string;
  message?: string;
  isFirstInChain: boolean;
  options?: Option[];
  optionValue?: string | number | undefined;
  onOptionSelect?: (value: Record<string, string | number | undefined>) => void;
  showRating?: boolean;
}

export const LeftChatBubble = ({
  author,
  message,
  isFirstInChain,
  options,
  optionValue,
  onOptionSelect,
  showRating,
}: ChatBubbleProps) => {
  const [optionSelection, setOptionSelection] = React.useState(optionValue);

  const handleSelection = (
    option: Record<string, string | number | undefined>
  ) => {
    setOptionSelection(option.value);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

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
      {options && options.length > 0 && (
        <ChatBubbleContainer>
          <Space />
          <SelectionOptionsContainer>
            {options.map((option, index) => {
              return (
                <SelectionOption
                  {...option}
                  key={index}
                  selectedValue={optionSelection}
                  setValue={(option) => handleSelection(option)}
                />
              );
            })}
          </SelectionOptionsContainer>
        </ChatBubbleContainer>
      )}
      <ChatBubbleContainer>
        <Space />
        {showRating && <Rating onOptionSelect={onOptionSelect} />}
        <Space />
      </ChatBubbleContainer>
    </ChatContainer>
  );
};

export const RightChatBubble = ({
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
