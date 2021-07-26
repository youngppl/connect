import { gql, useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
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
import { UserContext } from "../providers/UserProvider";
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
    $pronouns: Pronouns!
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

const INITIAL_CREATE_FLOW_STATE = {
  step: 0,
  messages: [
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
  ],
};

const processNextStep = (state, action) => {
  const { getValues, setValue } = action.payload;
  const fieldNames = ["name", "birthday", "pronouns"];
  if (!getValues(fieldNames[state.step])) {
    return;
  }
  if (state.step < prompts.length) {
    switch (state.step) {
      case 0:
        return {
          step: state.step + 1,
          messages: [
            ...state.messages,
            {
              author: "Faju",
              message: `Nice to meet you, ${getValues("name")}. I’m Faju`,
              isFirstInChain: true,
            },
            ...prompts[state.step],
          ],
        };
      case 1: {
        // Birthday step
        const timestamp = Date.parse(getValues("birthday"));
        if (isNaN(timestamp)) {
          // bad date?
          return {
            ...state,
            messages: [
              ...state.messages,
              {
                author: "Faju",
                message:
                  "Are you sure that's your birthday? You might have entered it wrong.",
                isFirstInChain: true,
              },
            ],
          };
        }
        const birthday = new Date(timestamp);
        const today = new Date();
        const minDateCutoff = new Date();
        minDateCutoff.setFullYear(today.getFullYear() - 18);
        if (birthday > today) {
          // born in the future???
          return {
            ...state,
            messages: [
              ...state.messages,
              {
                author: "Faju",
                message: "You from the future or something?",
                isFirstInChain: true,
              },
            ],
          };
        } else if (birthday > minDateCutoff) {
          // must be 18+
          return {
            ...state,
            messages: [
              ...state.messages,
              {
                author: "Faju",
                message:
                  "Sorry bud, this is 18+ only. Come back on your 18th birthday. We’ll celebrate ya 🎊",
                isFirstInChain: true,
              },
            ],
          };
        } else {
          // init pronouns step
          const handlePronounSelection = ({
            text,
          }: Record<string, string | number | undefined>) => {
            setValue("pronouns", text); // manually set pronoun value in form
          };
          return {
            step: state.step + 1,
            messages: [
              ...state.messages,
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
                  { text: "They / Them", value: "THEY_THEM" },
                  { text: "She / Her", value: "SHE_HER" },
                  { text: "He / His", value: "HE_HIS" },
                  { text: "I'd prefer not to say", value: "NONE" },
                ],
                onOptionSelect: handlePronounSelection,
              },
            ],
          };
        }
      }
      case 2:
        return {
          step: state.step + 1,
          messages: [
            ...state.messages,
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
          ],
        };
      default:
        return state;
    }
  }
};

const CreateProfileScreen = ({ navigation }: CreateProfileScreenProps) => {
  const { control, getValues, setValue, handleSubmit } = useForm();
  const { setId } = React.useContext(UserContext);
  const [createProfile] = useMutation(CreateProfileScreenMutation, {
    onCompleted: (data) => {
      setId(data.createProfile.id);
    },
  });

  const messagesViewRef = React.useRef(null);

  const [state, dispatch] = React.useReducer(
    processNextStep,
    INITIAL_CREATE_FLOW_STATE
  );

  const onSubmit = (data: Record<string, any>) => {
    const PRONOUNS: Record<string, string> = {
      "They / Them": "THEY_THEM",
      "She / Her": "SHE_HER",
      "He / His": "HE_HIS",
      "I'd prefer not to say": "NONE",
    };
    data.pronouns = PRONOUNS[data.pronouns];
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

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP", payload: { getValues, setValue } });
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidHide", nextStep);
    Keyboard.addListener("keyboardDidShow", scrollToLastMessage);
    return () => {
      Keyboard.removeListener("keyboardDidHide", nextStep);
      Keyboard.removeListener("keyboardDidShow", scrollToLastMessage);
    };
  }, []);

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
          {state?.messages.map((message, index) => {
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
                onOptionSelect={(value) => {
                  message.onOptionSelect(value);
                  nextStep();
                }}
              />
            );
          })}
          {state?.step === prompts.length && (
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
