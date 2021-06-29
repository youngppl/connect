import * as React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const DismissKeyboard = ({ children }: { children: any }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ height: "100%" }}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default DismissKeyboard;
