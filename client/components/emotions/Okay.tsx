import * as React from "react";
import Svg, {SvgProps, Circle, Path} from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={23}
      height={24}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={11.5} cy={12} r={11} fill="#FFA63D" stroke="#fff" />
      <Path
        d="M13.299 9.484c.559.593.877.514 1.437 0"
        stroke="#3D0230"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={10.244} cy={8.945} r={0.539} fill="#3D0230" />
      <Circle cx={17.43} cy={8.945} r={0.539} fill="#3D0230" />
    </Svg>
  );
}

export default SvgComponent;
