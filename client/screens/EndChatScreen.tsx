import { gql, useMutation } from "@apollo/client";
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
import FeelingSlider from "../components/FeelingSlider";
import Space from "../components/Space";
import { MOODS } from "../constants/Moods";
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

const DoneButtonContainer = styled.TouchableOpacity`
  width: 271px;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid #ffffff;
  padding: 10px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const DoneText = styled.Text`
  font-family: Quicksand;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;

const EndChatScreenMutation = gql`
  mutation ChatFeedback(
    $author: ID!
    $channel: String!
    $engagementRating: Int!
    $howFeelingAfter: String!
    $mood: String!
    $smile: String!
    $talkAgain: String!
  ) {
    createChatFeedback(
      author: $author
      channel: $channel
      engagementRating: $engagementRating
      howFeelingAfter: $howFeelingAfter
      mood: $mood
      smile: $smile
      talkAgain: $talkAgain
    )
  }
`;

type OptionValue = Record<string, string | number | undefined>;

type EndChatScreenProps = StackScreenProps<RootStackParamList, "EndChatScreen">;

const processNextStep = (state, action) => {
  const { getValues, setValue } = action.payload;

  switch (state.step) {
    case 0:
      // Smile or laugh?
      return {
        step: state.step + 1,
        messages: [
          ...state.messages,
          {
            author: "you",
            message: getValues("smile"),
          },
          {
            author: "Faju",
            message: `Great to hear! Please fill in the statement: I feel ____ than when I started this conversation`,
            isFirstInChain: true,
            options: [{ text: "Better" }, { text: "Same" }, { text: "Worse" }],
            onOptionSelect: ({ value }: OptionValue) =>
              setValue("howFeelingAfter", value),
          },
        ],
      };
    case 1:
      // How feeling after chat?
      return {
        step: state.step + 1,
        messages: [
          ...state.messages,
          {
            author: "you",
            message: getValues("howFeelingAfter"),
          },
          {
            author: "Faju",
            message: `How engaging was the conversation?`,
            showRating: true,
            onOptionSelect: ({ value }: OptionValue) =>
              setValue("engagementRating", value),
            isFirstInChain: true,
          },
        ],
      };
    case 2:
      return {
        step: state.step + 1,
        messages: [
          ...state.messages,
          {
            author: "you",
            message: getValues("engagementRating"),
          },
          {
            author: "Faju",
            message: `That’s awesome! Would you ever talk to them again?`,
            options: [{ text: "Yes" }, { text: "No" }],
            onOptionSelect: ({ value }: OptionValue) =>
              setValue("talkAgain", value),
            isFirstInChain: true,
          },
        ],
      };
    case 3:
      return {
        step: state.step + 1,
        messages: [
          ...state.messages,
          {
            author: "you",
            message: getValues("talkAgain"),
          },
          {
            author: "Faju",
            message: `Last thing! Just want to check in to see any upates with your mood. How do you feel right now?`,
            isFirstInChain: true,
          },
        ],
      };
    default:
      return state;
  }
};

const EndChatScreen = ({ navigation, route }: EndChatScreenProps) => {
  const channel = "dsa";
  // const { channel } = route.params;
  const { id: userId } = React.useContext(UserContext);
  const { control, getValues, setValue, handleSubmit } = useForm();
  const [mood, setMood] = React.useState(3);
  const [submitChatFeedback] = useMutation(EndChatScreenMutation);

  const messagesViewRef = React.useRef(null);

  const [state, dispatch] = React.useReducer(processNextStep, {
    step: 0,
    messages: [
      {
        author: "Faju",
        message:
          "Faju again! Let me know how your chat with __ was, so we can do better in connecting you next time!",
        isFirstInChain: true,
      },
      {
        author: "Faju",
        message:
          "Did you genuinely smile and/or laugh during your conversation with her?",
        options: [{ text: "Yes" }, { text: "No" }],
        onOptionSelect: ({ value }: OptionValue) => setValue("smile", value),
      },
    ],
  });

  const onSubmit = (data: Record<string, any>) => {
    submitChatFeedback({
      variables: { ...data, mood: MOODS[mood - 1], channel, author: userId },
    });
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
        <HeaderTitle>Chat Feedback</HeaderTitle>
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
                showRating={message.showRating}
                onOptionSelect={(value) => {
                  message.onOptionSelect(value);
                  nextStep();
                }}
              />
            );
          })}
          {state?.step === 4 && (
            <>
              <FeelingSlider mood={mood} setMood={setMood} textColor="white" />
              <DoneButtonContainer onPress={handleSubmit(onSubmit)}>
                <DoneText>Done</DoneText>
              </DoneButtonContainer>
            </>
          )}
          <Space height={30} />
        </MessagesContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EndChatScreen;
