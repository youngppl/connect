import * as React from "react";
import { View } from "react-native";
import {
  Slider as DefaultSlider,
  SliderProps as DefaultSliderProps,
} from "react-native-elements";
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
  color: ${(props: SliderProps) =>
    props.textColor ? props.textColor : "#371463"};
  text-align: center;
`;

const Slider = (props: SliderProps) => {
  const SliderContainer = styled.View`
    width: ${props.width ? props.width : 350}px;
    margin: 20px 0;
    flex-direction: row;
  `;

  return (
    <SliderContainer>
      <View style={{ flex: 4 }}>
        <DefaultSlider
          thumbStyle={{ height: 30, width: 30, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <SliderThumbContainer>
                <SliderThumbLabel textColor={props.textColor}>
                  {props.label}
                </SliderThumbLabel>
                <SliderThumb />
              </SliderThumbContainer>
            ),
          }}
          step={1}
          allowTouchTrack
          {...props}
        />
      </View>
    </SliderContainer>
  );
};

export default Slider;
