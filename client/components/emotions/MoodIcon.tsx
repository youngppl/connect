import * as React from "react";

import {User} from "../../../backend/src/resolvers-types";

import CalmIcon from "./Calm";
import ContentIcon from "./Content";
import ExcitedIcon from "./Excited";
import FrustratedIcon from "./Frustrated";
import UpsetIcon from "./Upset";

const MoodIcon = ({mood, ...props}: {mood: User["mood"]}) => {
  switch (mood) {
    case "Frustrated":
      return <FrustratedIcon width={40} height={30} {...props} />;
    case "Content":
      return <ContentIcon width={24} height={24} {...props} />;
    case "Calm":
      return <CalmIcon width={25} height={25} {...props} />;
    case "Upset":
      return <UpsetIcon width={25} height={25} {...props} />;
    case "Excited":
      return <ExcitedIcon width={40} height={30} {...props} />;
    default:
      return null;
  }
};

export default MoodIcon;
