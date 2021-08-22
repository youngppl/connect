import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";

const GoBackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 16px;
`;

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <GoBackButton
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </GoBackButton>
  );
};

export default GoBack;
