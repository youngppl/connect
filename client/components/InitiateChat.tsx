import * as React from "react";
import styled from "styled-components/native";

import BottomSheet, {
  BottomSheetButton,
  BottomSheetHeading,
  BottomSheetModalProps,
} from "../components/BottomSheet";

import Checkbox from "./Checkbox";
import Column from "./Column";
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

const CHAT_OPTIONS = {
  "Deep talk": "let’s talk life or current events",
  "Light talk": "I’m bored, help me smile & laugh",
  "Small talk": "let’s talk irrelevant stuff",
};

const ChatTypeSheet = (
  props: BottomSheetModalProps & { onContinue: () => void }
) => {
  const [chatSelections, setChatSelections] = React.useState<
    Record<string, boolean>
  >({
    "Deep talk": false,
    "Light talk": false,
    "Small talk": false,
  });

  const allowContinue = React.useMemo(
    () => !Object.values(chatSelections).some((value) => value),
    [chatSelections]
  );

  return (
    <BottomSheet {...props}>
      <BottomSheetHeading>
        What kind of conversation are you looking to have?
      </BottomSheetHeading>
      <Space height={24} />
      {Object.entries(CHAT_OPTIONS).map(([heading, subheading]) => (
        <ChatOption
          heading={heading}
          subheading={subheading}
          key={heading}
          selected={chatSelections[heading]}
          onSelect={(value) =>
            setChatSelections((oldSelections) => ({
              ...oldSelections,
              [heading]: value,
            }))
          }
        />
      ))}
      <Space height={24} />
      <BottomSheetButton onPress={null} disabled={allowContinue}>
        Continue
      </BottomSheetButton>
    </BottomSheet>
  );
};

const AgreementsSheet = (
  props: BottomSheetModalProps & { onContinue: () => void }
) => {
  return (
    <BottomSheet {...props}>
      <BottomSheetHeading>
        Hey Nicole, how are you feeling right now?
      </BottomSheetHeading>

      <BottomSheetButton onPress={null}>Done</BottomSheetButton>
    </BottomSheet>
  );
};

const ChatButton = () => {
  const [showChatTypeSheet, setShowChatTypeSheet] = React.useState(false);
  const [showAgreementSheet, setShowAgreementSheet] = React.useState(false);

  return (
    <>
      <ChatButtonContainer onPress={() => setShowChatTypeSheet(true)}>
        <SaturnIcon />
      </ChatButtonContainer>
      <ChatTypeSheet
        visible={showChatTypeSheet}
        setVisible={setShowChatTypeSheet}
      />
    </>
  );
};

export default ChatButton;
