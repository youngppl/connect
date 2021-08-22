import * as React from "react";
import Svg, {SvgProps, Circle, Mask, G, Path} from "react-native-svg";

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
      <Circle cx={36} cy={36} r={36} fill="#617EE3" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={72} height={72}>
        <Circle cx={36} cy={36} r={36} fill="#C4C4C4" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={29.572} cy={43.287} r={40.714} fill="#FFA63D" />
        <Path
          d="M35.934 34.38c1.979 2.1 3.105 1.818 5.089 0"
          stroke="#3D0230"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={25.119} cy={32.471} r={1.908} fill="#3D0230" />
        <Circle cx={50.565} cy={32.471} r={1.908} fill="#3D0230" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
