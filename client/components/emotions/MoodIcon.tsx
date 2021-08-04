import * as React from "react";

import CalmIcon from "./Calm";
import ContentIcon from "./Content";
import ExcitedIcon from "./Excited";
import FrustratedIcon from "./Frustrated";
import UpsetIcon from "./Upset";

const MoodIcon = ({mood}: {mood: string}) => {
  switch (mood) {
    case "Frustrated":
      return <FrustratedIcon width={40} height={30} />;
    case "Content":
      return <ContentIcon width={24} height={24} />;
    case "Calm":
      return <CalmIcon width={25} height={25} />;
    case "Upset":
      return <UpsetIcon width={25} height={25} />;
    case "Excited":
      return <ExcitedIcon width={40} height={30} />;
    default:
      return null;
  }
};

export default MoodIcon;
