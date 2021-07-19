import * as React from "react";
import { View } from "react-native";

import AllEmotionsIcon from "../components/emotions/All";
import Slider from "../components/Slider";

type FeelingSliderProps = {
  mood: string;
  setMood: () => void;
  textColor: string;
};
const FeelingSlider = ({ mood, setMood, textColor }: FeelingSliderProps) => {
  const label = React.useMemo(() => {
    switch (mood) {
      case 1:
        return "Frustrated";
      case 2:
        return "Upset";
      case 3:
        return "Calm";
      case 4:
        return "Content";
      default:
        return "Excited";
    }
  }, [mood]);
  return (
    <>
      <AllEmotionsIcon />
      <View style={{ alignItems: "center" }}>
        <Slider
          value={mood}
          label={label}
          width={320}
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
