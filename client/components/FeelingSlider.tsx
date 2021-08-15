import * as React from "react";
import {View} from "react-native";
import styled from "styled-components/native";

import {User} from "../../backend/src/resolvers-types";
import Slider from "../components/Slider";
import {MOODS} from "../constants/Moods";

import MoodIcon from "./emotions/MoodIcon";
import Row from "./Row";
import Space from "./Space";

type FeelingSliderProps = {
  mood: number;
  setMood: any;
  textColor?: string;
};

const FeelingIconsContainer = styled(Row)`
  height: 70px;
  align-items: flex-end;
  justify-content: center;
`;

const FeelingIconContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FeelingIcon = (props: {
  mood: User["mood"];
  width: number;
  height: number;
  fillOpacity: number;
}) => {
  return (
    <FeelingIconContainer>
      <MoodIcon {...props} />
    </FeelingIconContainer>
  );
};

const FEELING_SIZES = [
  {
    width: 130,
    height: 80,
  },
  {width: 80, height: 80},
  {width: 90, height: 90},
  {width: 80, height: 80},
  {width: 110, height: 80},
];

const feelingIconProps = (index: number, currentValue: number) => {
  const feeling = index + 1;
  const currentFeeling = currentValue / 10;
  const ratio = Math.min(feeling, currentFeeling) / Math.max(feeling, currentFeeling, 1);
  const scaleFactor = Math.max(ratio, 0.8);
  const fillOpacity = Math.max(ratio, 0.5);
  const {width, height} = FEELING_SIZES[index];
  return {
    width: width * scaleFactor,
    height: height * scaleFactor,
    fillOpacity,
  };
};

const FeelingSlider = ({mood, setMood, textColor}: FeelingSliderProps) => {
  const [value, setValue] = React.useState(mood * 10);
  const label = React.useMemo(() => MOODS[Math.floor(value / 10) - 1], [value]);

  return (
    <>
      <FeelingIconsContainer>
        {MOODS.map((mood, index) => (
          <FeelingIcon key={mood} mood={mood} {...feelingIconProps(index, value)} />
        ))}
      </FeelingIconsContainer>
      <View style={{alignItems: "center"}}>
        <Space height={20} />
        <Slider
          value={value}
          label={label}
          width={300}
          onValueChange={setValue}
          onSlidingComplete={(value) => setMood(Math.floor(value / 10))}
          minimumValue={10}
          maximumValue={50}
          textColor={textColor}
        />
      </View>
    </>
  );
};
export default FeelingSlider;
