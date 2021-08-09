import {BlurView} from "expo-blur";
import * as React from "react";
import {Modal, ModalProps, View} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import styled, {css} from "styled-components/native";

export interface BottomSheetModalProps extends ModalProps {
  setVisible: (visible: boolean) => void;
  children?: React.ReactNode;
}

export const BottomSheetHeading = styled.Text`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #371463;
  text-align: center;
`;

const BottomSheetButtonContainer = styled.TouchableOpacity<BottomSheetButtonProps>`
  align-items: center;
  justify-content: center;
  height: 68px;
  background: ${(props) =>
    props.disabled ? "rgba(55, 20, 99, 0.25)" : props.light ? "#ffffff" : "#371463"};
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  ${(props) =>
    props.light &&
    css`
      border: 3px solid #371463;
    `}
`;

const BottomSheetButtonText = styled.Text<BottomSheetButtonProps>`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: ${(props) => (props.light ? "#371463" : "#ffffff")};
`;

interface BottomSheetButtonProps {
  disabled?: boolean;
  light?: boolean;
  children?: React.ReactElement | string;
  onPress?: () => void;
}

export const BottomSheetButton = (props: BottomSheetButtonProps) => {
  return (
    <BottomSheetButtonContainer {...props}>
      <BottomSheetButtonText {...props}>{props.children}</BottomSheetButtonText>
    </BottomSheetButtonContainer>
  );
};

const BottomSheet = (props: BottomSheetModalProps) => {
  return (
    <View style={{position: "absolute"}}>
      <Modal animationType="fade" transparent {...props}>
        <BlurView tint={"dark"} style={{height: "100%", justifyContent: "flex-end"}}>
          <TouchableWithoutFeedback onPress={() => props.setVisible(false)}>
            <View style={{height: "100%"}} />
          </TouchableWithoutFeedback>
          <View
            style={{
              marginTop: "10%",
              minHeight: "16%",
              backgroundColor: "white",
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: 16,
              paddingTop: 34,
            }}
          >
            {props.children}
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

export default BottomSheet;
