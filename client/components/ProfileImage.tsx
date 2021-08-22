import * as React from "react";

import {User} from "../../backend/src/resolvers-types";

import Four from "./profileImages/Four";
import One from "./profileImages/One";
import Three from "./profileImages/Three";
import Two from "./profileImages/Two";
import Zero from "./profileImages/Zero";

export const PROFILE_IMAGES = [Zero, One, Two, Three, Four];

interface ProfileImageProps {
  variant: User["profileImage"];
  size?: number;
}

const ProfileImage = ({variant = 4, size = 48}: ProfileImageProps) => {
  if (variant === null) variant = 4;
  const Image = PROFILE_IMAGES[variant];
  return <Image width={size} height={size} />;
};

export default ProfileImage;
