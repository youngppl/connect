import * as React from "react";
import {View} from "react-native";

import AllEmotionsIcon from "../components/emotions/All";
import Slider from "../components/Slider";
import {MOODS} from "../constants/Moods";

type FeelingSliderProps = {
  mood: number;
  setMood: any;
  textColor?: string;
};

const FeelingSlider = ({mood, setMood, textColor}: FeelingSliderProps) => {
  const label = React.useMemo(() => MOODS[mood - 1], [mood]);
  return (
    <>
      <AllEmotionsIcon />
      <View style={{alignItems: "center"}}>
        <Slider
          value={mood}
          label={label}
          width={300}
          onSlidingComplete={setMood}
          minimumValue={1}
          maximumValue={5}
          textColor={textColor}
        />
      </View>
    </>
  );
};
export default FeelingSlider;
