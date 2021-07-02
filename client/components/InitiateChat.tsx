import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

import BottomSheet, {
  BottomSheetButton,
  BottomSheetHeading,
  BottomSheetModalProps,
} from "../components/BottomSheet";

import Checkbox from "./Checkbox";
import Column from "./Column";
import Row from "./Row";
import SaturnIcon from "./SaturnIcon";
import Space from "./Space";

const ChatButtonContainer = styled.TouchableOpacity`
  position: absolute;
  width: 74px;
  height: 74px;
  border-radius: 37px;
  background: #ff97d5;
  box-shadow: 0px 0px 4px #ff98d5;
  align-items: center;
  justify-content: center;
  left: 62%;
  top: -10px;
`;

// Chat Type Sheet

const ChatOptionContainer = styled.TouchableOpacity`
  background: #ffffff;
  border: 3px solid
    ${(props: { selected: boolean }) =>
      props.selected ? "#371463" : "#ebe8ef"};
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  margin-vertical: 8px;
`;

const ChatOptionHeading = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
`;

const ChatOptionSubheading = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #6c6c6c;
`;

interface ChatOptionProps {
  heading: string;
  subheading: string;
  selected: boolean;
  onSelect: (value: boolean) => void;
}

interface StringMapProps {
  [key: string]: string;
}

const ChatOption = ({
  heading,
  subheading,
  selected,
  onSelect,
}: ChatOptionProps) => {
  return (
    <ChatOptionContainer
      selected={selected}
      onPress={() => onSelect(!selected)}
    >
      <Column>
        <ChatOptionHeading>{heading}</ChatOptionHeading>
        <ChatOptionSubheading>{subheading}</ChatOptionSubheading>
      </Column>
      <Column style={{ justifyContent: "center" }}>
        <Checkbox selected={selected} onSelect={() => onSelect(!selected)} />
      </Column>
    </ChatOptionContainer>
  );
};

const CHAT_OPTIONS: StringMapProps = {
  DEEP_TALK: "DEEP_TALK",
  LIGHT_TALK: "LIGHT_TALK",
  SMALL_TALK: "SMALL_TALK",
};

const CHAT_SUBHEADINGS = {
  [CHAT_OPTIONS.DEEP_TALK]: "let’s talk life or current events",
  [CHAT_OPTIONS.LIGHT_TALK]: "I’m bored, help me smile & laugh",
  [CHAT_OPTIONS.SMALL_TALK]: "let’s talk irrelevant stuff",
};

const CHAT_HEADINGS: StringMapProps = {
  [CHAT_OPTIONS.DEEP_TALK]: "Deep talk",
  [CHAT_OPTIONS.LIGHT_TALK]: "Light talk",
  [CHAT_OPTIONS.SMALL_TALK]: "Small talk",
};

const ChatTypeSheet = (
  props: BottomSheetModalProps & {
    onContinue: (preferredChatType: string[]) => void;
  }
) => {
  const [chatSelections, setChatSelections] = React.useState<
    Record<string, boolean>
  >({
    [CHAT_OPTIONS.DEEP_TALK]: false,
    [CHAT_OPTIONS.LIGHT_TALK]: false,
    [CHAT_OPTIONS.SMALL_TALK]: false,
  });

  return (
    <BottomSheet {...props}>
      <BottomSheetHeading>
        What kind of conversation are you looking to have?
      </BottomSheetHeading>
      <Space height={24} />
      {Object.keys(CHAT_OPTIONS).map((option) => (
        <ChatOption
          heading={CHAT_HEADINGS[option]}
          subheading={CHAT_SUBHEADINGS[option]}
          key={option}
          selected={chatSelections[option]}
          onSelect={(value) =>
            setChatSelections((oldSelections) => ({
              ...oldSelections,
              [option]: value,
            }))
          }
        />
      ))}
      <Space height={24} />
      <BottomSheetButton
        onPress={() =>
          props.onContinue(
            Object.keys(chatSelections).filter(
              (key) => chatSelections[key]
            ) as string[]
          )
        }
        disabled={!Object.values(chatSelections).some((value) => value)}
      >
        Continue
      </BottomSheetButton>
    </BottomSheet>
  );
};

// AgreementsSheet

const AgreementContainer = styled(Row)`
  padding: 0 10px;
  padding-right: 50px;
  margin-vertical: 10px;
`;

const AGREEMENTS = {
  "Commit 10 minutes to talk":
    "We want you to have a real full conversation. So, no multi-tasking.",
  "Be kind and respectful": "We’re not all friends and we’re not enemies.",
  "Share within your comfort":
    "We are here for connection, so authenticity and honesty are key! No fake information ",
};

const AgreementsSheet = (
  props: BottomSheetModalProps & { onContinue: () => void }
) => {
  const [agreements, setAgreements] = React.useState([false, false, false]);

  return (
    <BottomSheet {...props}>
      <BottomSheetHeading>I agree to:</BottomSheetHeading>
      <Space height={24} />
      {Object.entries(AGREEMENTS).map(([heading, subheading], index) => (
        <AgreementContainer key={index}>
          <Column style={{ justifyContent: "flex-start" }}>
            <Checkbox
              selected={agreements[index]}
              onSelect={(value) => {
                setAgreements((old) => {
                  const updated = [...old];
                  updated[index] = value;
                  return updated;
                });
              }}
            />
          </Column>
          <Space width={8} />
          <Column>
            <ChatOptionHeading style={{ fontSize: 19 }}>
              {heading}
            </ChatOptionHeading>
            <ChatOptionSubheading style={{ fontSize: 12 }}>
              {subheading}
            </ChatOptionSubheading>
          </Column>
        </AgreementContainer>
      ))}
      <Space height={30} />
      <BottomSheetButton
        onPress={props.onContinue}
        disabled={!agreements.every((agreed) => agreed)}
      >
        Blast off 🚀
      </BottomSheetButton>
    </BottomSheet>
  );
};

const ChatButton = () => {
  const [showChatTypeSheet, setShowChatTypeSheet] = React.useState(false);
  const [showAgreementSheet, setShowAgreementSheet] = React.useState(false);
  const [chatTypes, setChatTypes] = React.useState<string[]>();
  const navigation = useNavigation();

  return (
    <>
      <ChatButtonContainer onPress={() => setShowChatTypeSheet(true)}>
        <SaturnIcon />
      </ChatButtonContainer>
      <ChatTypeSheet
        visible={showChatTypeSheet}
        setVisible={setShowChatTypeSheet}
        onContinue={(chatTypes) => {
          setShowAgreementSheet(true);
          setShowChatTypeSheet(false);
          setChatTypes(chatTypes);
        }}
      />
      <AgreementsSheet
        visible={showAgreementSheet}
        setVisible={setShowAgreementSheet}
        onContinue={() => {
          setShowAgreementSheet(false);
          navigation.replace("WaitingScreen", { chatTypes });
        }}
      />
    </>
  );
};

export default ChatButton;
