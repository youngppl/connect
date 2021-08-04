import * as React from "react";
import Svg, {SvgProps, Circle, Path} from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={36} cy={36} r={36} fill="#FFA63D" />
      <Path
        d="M41.627 28.125c1.75 1.857 2.746 1.608 4.5 0"
        stroke="#3D0230"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={32.065} cy={26.438} r={1.688} fill="#3D0230" />
      <Circle cx={54.563} cy={26.438} r={1.688} fill="#3D0230" />
    </Svg>
  );
}

export default SvgComponent;
