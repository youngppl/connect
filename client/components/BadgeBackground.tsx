import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={83}
      height={95}
      viewBox="0 0 83 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M76.391 73.489c2.897-5.31 1.246-45.101.402-61.968C76.58 7.29 73.083 4 68.848 4H13.643C9.484 4 6.026 7.158 5.73 11.306 4.5 28.603 2.022 70.942 6.902 75.334c5.03 4.527 25.284 11.934 32.49 14.48a7.587 7.587 0 005.115-.005c7.454-2.675 28.845-10.749 31.884-16.32z"
        fill="#FF97D5"
        fillOpacity={0.3}
        stroke="#fff"
        strokeOpacity={0.1}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
