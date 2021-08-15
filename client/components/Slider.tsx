import * as React from "react";
import {Slider as DefaultSlider, SliderProps as DefaultSliderProps} from "react-native-elements";
import styled from "styled-components/native";

const SliderThumb = styled.View`
  width: 24px;
  height: 24px;
  background-color: #ff97d5;
  border-radius: 12px;
  align-items: center;
  overflow: visible;
`;

const SliderThumbContainer = styled.View`
  position: relative;
`;
interface SliderProps extends DefaultSliderProps {
  width?: number;
  label?: string;
  textColor?: string;
}

const SliderThumbLabel = styled.Text`
  position: absolute;
  top: -30px;
  left: -30px;
  width: 82px;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: ${(props: SliderProps) => (props.textColor ? props.textColor : "#371463")};
  text-align: center;
`;

const Slider = (props: SliderProps) => {
  return (
    <DefaultSlider
      thumbStyle={{height: 25, width: 20, backgroundColor: "transparent"}}
      thumbProps={{
        children: (
          <SliderThumbContainer>
            <SliderThumbLabel textColor={props.textColor}>{props.label}</SliderThumbLabel>
            <SliderThumb />
          </SliderThumbContainer>
        ),
      }}
      step={1}
      {...props}
    />
  );
};

export default Slider;
