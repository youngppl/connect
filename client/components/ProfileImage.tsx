import * as React from "react";

import Four from "./profileImages/Four";
import One from "./profileImages/One";
import Three from "./profileImages/Three";
import Two from "./profileImages/Two";
import Zero from "./profileImages/Zero";

export const PROFILE_IMAGES = [Zero, One, Two, Three, Four];

interface ProfileImageProps {
  variant: number;
  size?: number;
}

const ProfileImage = ({variant = 4, size = 48}: ProfileImageProps) => {
  const Image = PROFILE_IMAGES[variant];
  return <Image width={size} height={size} />;
};

export default ProfileImage;
