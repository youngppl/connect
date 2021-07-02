import { gql, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
  BlackChatText,
  LeftChatBubble,
  RightChatBubble,
} from "../components/ChatBubbles";
import Space from "../components/Space";
import { RootStackParamList } from "../types";

const Container = styled(SafeAreaView)`
  background-color: #371463;
  flex: 1;
  padding-horizontal: 10px;
`;

const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 30px;
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
  font-family: Quicksand;
  font-size: 16px;
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

const prompts = [
  [
    {
      author: "Faju",
      message: "When were you born?",
    },
    {
      author: "you",
      fieldName: "birthday",
      defaultValue: "MM/DD/YYYY",
    },
  ],
  [],
  [],
];

const CreateProfileScreenMutation = gql`
  mutation CreateProfile(
    $name: String!
    $birthday: String!
    $pronouns: String!
  ) {
    createProfile(name: $name, birthday: $birthday, pronouns: $pronouns) {
      message
      id
    }
  }
`;

type CreateProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "CreateProfileScreen"
>;

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
  const { control, getValues, setValue, handleSubmit } = useForm();
  const [createProfile] = useMutation(CreateProfileScreenMutation, {
    onCompleted: (data) => {
      AsyncStorage.setItem("connectId", data.id);
    },
  });
  const [step, setStep] = React.useState(0);
  const messagesViewRef = React.useRef(null);
  const [messages, setMessages] = React.useState<any[]>([
    {
      author: "Faju",
      message: "Oh, you’re new 🤔",
      isFirstInChain: true,
    },
    {
      author: "Faju",
      message: "What’s your name?",
    },
    {
      author: "you",
      fieldName: "name",
      defaultValue: "Type name here.",
    },
  ]);

  const processNextStep = React.useCallback(() => {
    const fieldNames = ["name", "birthday", "pronouns"];
    if (!getValues(fieldNames[step])) {
      return;
    }
    if (step < prompts.length) {
      switch (step) {
        case 0:
          setMessages([
            ...messages,
            {
              author: "Faju",
              message: `Nice to meet you, ${getValues("name")}. I’m Faju`,
              isFirstInChain: true,
            },
            ...prompts[step],
          ]);
          break;
        case 1: {
          // Birthday step
          const timestamp = Date.parse(getValues("birthday"));
          if (isNaN(timestamp)) {
            // bad date?
            setMessages([
              ...messages,
              {
                author: "Faju",
                message:
                  "Are you sure that's your birthday? You might have entered it wrong.",
                isFirstInChain: true,
              },
            ]);
            return;
          }
          const birthday = new Date(timestamp);
          const today = new Date();
          const minDateCutoff = new Date();
          minDateCutoff.setFullYear(today.getFullYear() - 18);
          if (birthday > today) {
            // born in the future???
            setMessages([
              ...messages,
              {
                author: "Faju",
                message: "You from the future or something?",
                isFirstInChain: true,
              },
            ]);
            return;
          } else if (birthday > minDateCutoff) {
            // must be 18+
            setMessages([
              ...messages,
              {
                author: "Faju",
                message:
                  "Sorry bud, this is 18+ only. Come back on your 18th birthday. We’ll celebrate ya 🎊",
                isFirstInChain: true,
              },
            ]);
            return;
          } else {
            // init pronouns step
            const handlePronounSelection = ({
              value,
            }: Record<string, string | number | undefined>) => {
              setValue("pronouns", value); // manually set pronoun value in form
              // TODO: somehow trigger processNextStep. problem is cannot directly call processNextStep.
            };
            setMessages([
              ...messages,
              {
                author: "Faju",
                message: "Oh, that’s great! 😁 We welcome 18+.",
                isFirstInChain: true,
              },
              {
                author: "Faju",
                message:
                  "What’s your pronouns? I wanna make sure we all refer to you right (including everyone in jufa).",
                options: [
                  { text: "They / Them" },
                  { text: "She / Her" },
                  { text: "He / His" },
                  { text: "I'd prefer not to say" },
                ],
                onOptionSelect: handlePronounSelection,
              },
            ]);
          }
          break;
        }
        case 2:
          setMessages([
            ...messages,
            {
              author: "you",
              message: getValues("pronouns"),
            },
            {
              author: "Faju",
              isFirstInChain: true,
              message: `Welcome to jufa, ${getValues(
                "name"
              )}. Let me show you around!`,
            },
          ]);
          break;
        default:
          setMessages([...messages, ...prompts[step]]);
      }
      setStep(step + 1);
    }
  }, [step]);

  const onSubmit = (data: Record<string, any>) => {
    console.log(data);
    createProfile({ variables: data });
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  const scrollToLastMessage = () =>
    ((messagesViewRef.current as unknown) as ScrollView)?.scrollToEnd({
      animated: true,
    });

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidHide", processNextStep);
    Keyboard.addListener("keyboardDidShow", scrollToLastMessage);
    return () => {
      Keyboard.removeListener("keyboardDidHide", processNextStep);
      Keyboard.removeListener("keyboardDidShow", scrollToLastMessage);
    };
  }, [step]);

  return (
    <Container edges={["top"]}>
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
          showsVerticalScrollIndicator={false}
          ref={messagesViewRef}
          onContentSizeChange={scrollToLastMessage}
        >
          {messages.map((message, index) => {
            if (message.author === "you" && message.defaultValue)
              return (
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RightChatBubble
                      author={message.author}
                      key={index}
                      isFirstInChain={message.isFirstInChain}
                    >
                      {message.fieldName === "birthday" ? (
                        <TextInputMask
                          type={"datetime"}
                          value={value}
                          options={{
                            format: "MM/DD/YYYY",
                          }}
                          onChangeText={onChange}
                          customTextInput={Input}
                          customTextInputProps={{
                            keyboardType: "number-pad",
                          }}
                          placeholder={message.defaultValue}
                          returnKeyType={"done"}
                        />
                      ) : (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          autoCorrect={false}
                          returnKeyType={"done"}
                          placeholder={message.defaultValue}
                          multiline={true}
                          blurOnSubmit={true}
                        />
                      )}
                    </RightChatBubble>
                  )}
                  name={message.fieldName}
                  key={index}
                  rules={{ required: true }}
                />
              );
            else if (message.author === "you")
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
          {step === prompts.length && (
            <GetStartedButtonContainer onPress={handleSubmit(onSubmit)}>
              <GetStartedText>Let&apos;s Go!</GetStartedText>
            </GetStartedButtonContainer>
          )}
          <Space height={30} />
        </MessagesContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default CreateProfileScreen;
