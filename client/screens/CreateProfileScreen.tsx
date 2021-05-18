import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components/native";

import {
  BlackChatText,
  LeftChatBubble,
  RightChatBubble,
} from "../components/ChatBubbles";
import { RootStackParamList } from "../types";

const Container = styled.View`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 10px;
`;

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-vertical: 40px;
  z-index: 5;
`;

const MessagesContainer = styled.ScrollView`
  height: 100%;
`;

const BackButtonContainer = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 16px;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
`;

const Input = styled.TextInput`
  color: #371463;
`;

const GetStartedButtonContainer = styled.TouchableOpacity`
  width: 271px;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid #ffffff;
  padding: 10px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const GetStartedText = styled.Text`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;

type CreateProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "CreateProfile"
>;

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const messagesViewRef = React.useRef<ScrollView>(null);

  const [messages, setMessages] = React.useState<any[]>([
    {
      id: 1,
      author: "jufa",
      message:
        "Hey I’m jufa! Before you get right into chatting with new people. I want to make sure I introduce you to people I feel like you’d enjoy talking with. ",
      isFirstInChain: true,
    },
    {
      id: 2,
      author: "jufa",
      message:
        "First off, when is your birthday? We only allow people who are 18+ to join this app.",
    },
    {
      id: 3,
      author: "you",
      message: "hello",
      fieldName: "birthday",
      defaultValue: "00/00/0000",
    },
  ]);

  const [step, setStep] = React.useState(0);

  const prompts = [
    [
      {
        id: 4,
        author: "jufa",
        message:
          "Sweet! What is your name by the way? I want to make sure I correctly share to others what to call you! ",
        isFirstInChain: true,
      },
      {
        id: 5,
        author: "you",
        fieldName: "name",
        defaultValue: "Type name here.",
      },
    ],
    [
      {
        id: 7,
        author: "you",
        fieldName: "pronouns",
        defaultValue: "Pronouns",
      },
    ],
    [
      {
        id: 8,
        author: "jufa",
        isFirstInChain: true,

        message:
          "Great! I think we are ready to get started. If you need to edit anything just click your response and we will fix it right away for you. Otherwise, we will get right into it!",
      },
    ],
  ];

  const processNextStep = React.useCallback(() => {
    switch (step) {
      case 1:
        setMessages([
          ...messages,
          {
            id: 6,
            author: "jufa",
            message: `Hey ${getValues("name")}! What are your pronouns?`,
            isFirstInChain: true,
          },
          ...prompts[step],
        ]);
        break;
      default:
        setMessages([...messages, ...prompts[step]]);
    }
    if (step < prompts.length) {
      setStep(step + 1);
    }
  }, [step]);

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidHide", processNextStep);
    return () => {
      Keyboard.removeListener("keyboardDidHide", processNextStep);
    };
  }, [step]);

  return (
    <Container>
      <HeaderContainer>
        <BackButtonContainer onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButtonContainer>
        <HeaderTitle>Get Started</HeaderTitle>
      </HeaderContainer>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
        behavior="padding"
        enabled
      >
        <MessagesContainer
          ref={messagesViewRef}
          onContentSizeChange={() =>
            messagesViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => {
            if (message.author === "you")
              return (
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <RightChatBubble
                      author={message.author}
                      key={message.id}
                      isFirstInChain={message.isFirstInChain}
                    >
                      {value !== null ? (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          keyboardType={
                            message.fieldName === "birthday"
                              ? "number-pad"
                              : "default"
                          }
                          returnKeyType={"done"}
                          placeholder={message.defaultValue}
                          multiline={true}
                          blurOnSubmit={true}
                        />
                      ) : (
                        <BlackChatText>{message.message}</BlackChatText>
                      )}
                    </RightChatBubble>
                  )}
                  name={message.fieldName}
                  key={message.id}
                  rules={{ required: true }}
                />
              );
            return (
              <LeftChatBubble
                author={message.author}
                message={message.message}
                key={message.id}
                isFirstInChain={message.isFirstInChain}
              />
            );
          })}
          {step === prompts.length && (
            <GetStartedButtonContainer>
              <GetStartedText>Get Started</GetStartedText>
            </GetStartedButtonContainer>
          )}
        </MessagesContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default CreateProfileScreen;
