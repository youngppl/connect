import * as React from "react";
import Svg, {SvgProps, G, Circle, Path, Defs, ClipPath} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)">
        <Circle cx={18} cy={18} r={18} fill="#fff" />
        <Path
          d="M21.175 35.758C31.174 12.758 16 4.5 6.5 4 2.499 6.5-3 17 2 26.5 5.547 33.24 13 37 21.175 35.758z"
          fill="#F39FFF"
        />
        <Path
          d="M13.5 27c-3.2 2.4 3.667 7.667 7.5 9.5l1-3c-1.667-.833-5.2-3.3-6-4.5-1-1.5 5.5-4.5 5.5-6 0-1.2 2-.167 3 .5v-2c-1.167-.834-3.8-1.9-5 .5-1.5 3-2 2-6 5z"
          fill="#F6C5FD"
        />
        <Path
          d="M13.5 27c-3.2 2.4 3.667 7.667 7.5 9.5l1-3c-1.667-.833-5.2-3.3-6-4.5-1-1.5 5.5-4.5 5.5-6 0-1.2 2-.167 3 .5v-2c-1.167-.834-3.8-1.9-5 .5-1.5 3-2 2-6 5zM13 20.5c-3.2 0-6.667 6.667-8 10l-1.5-2c1.833-3.5 6.3-10.6 9.5-11 4-.5 5-8.5 6-8 .8.4 2 2.167 2.5 3-.667.5-2 1.9-2 3.5 0 2-2.5 4.5-6.5 4.5zM14 6c.8 2-9 8.5-14 11 .4-2.4 8.167-9.333 12-12l2 1z"
          fill="#F6C5FD"
        />
        <Path
          d="M15.219 16h-1.438c-.46 0-.886.32-.828.775.078.606.456 1.225 1.547 1.225 1.09 0 1.469-.62 1.546-1.225.058-.455-.368-.775-.827-.775z"
          fill="#3D0230"
        />
        <Circle cx={11.5} cy={15.5} r={0.5} fill="#3D0230" />
        <Circle cx={17.5} cy={15.5} r={0.5} fill="#3D0230" />
        <G filter="url(#prefix__filter0_d)">
          <Path
            d="M31.5 14c2.8 2.8-17.5 11.166-28 15L5 30.5c9.5-4.167 29.6-13.1 30-15.5.5-3-1.5-4.5-4-4.5-2.884 0-7.667.333-9.5 1.5l1 1.5c1.833-1 6.2-2.3 9 .5z"
            fill="#FFCE70"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h36v36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
