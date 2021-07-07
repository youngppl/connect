import * as React from "react";
import { View } from "react-native";

import AllEmotionsIcon from "../components/emotions/All";
import Slider from "../components/Slider";

const FeelingSlider = ({ mood, setMood, textColor }) => {
  const label = React.useMemo(() => {
    switch (mood) {
      case 1:
        return "No";
      case 2:
        return "Eh";
      case 3:
        return "Alright";
      case 4:
        return "Good";
      default:
        return "Great!";
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
