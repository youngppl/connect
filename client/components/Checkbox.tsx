import {Feather} from "@expo/vector-icons";
import * as React from "react";
import styled from "styled-components/native";

const CheckboxContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border: 3px solid ${(props: {selected: boolean}) => (props.selected ? "#371463" : "#ebe8ef")};
  background: ${(props: {selected: boolean}) => (props.selected ? "#371463" : "transparent")};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

interface CheckboxProps {
  selected: boolean;
  onSelect: (value: boolean) => void;
}

const Checkbox = ({selected, onSelect}: CheckboxProps) => {
  return (
    <CheckboxContainer
      selected={selected}
      onPress={() => {
        onSelect(!selected);
      }}
    >
      {selected && <Feather name="check" size={20} color="white" />}
    </CheckboxContainer>
  );
};

export default Checkbox;
