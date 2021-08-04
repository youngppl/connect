import * as React from "react";
import Svg, {SvgProps, Circle, Mask, G, Ellipse, Path} from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={89}
      height={88}
      viewBox="0 0 89 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={47.117} cy={41.882} r={41.882} fill="#D1FFA4" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={3} width={84} height={85}>
        <Circle cx={41.882} cy={45.809} r={41.882} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={56.279} cy={37.956} r={41.882} fill="#BFFE80" />
      </G>
      <Mask id="prefix__b" maskUnits="userSpaceOnUse" x={9} y={1} width={80} height={82}>
        <Ellipse cx={49.079} cy={41.883} rx={39.919} ry={40.574} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__b)">
        <Ellipse cx={62.802} cy={34.275} rx={39.919} ry={40.574} fill="#ADFF5C" />
      </G>
      <Path d="M53.662 32.72h5.235" stroke="#3D0230" strokeLinecap="round" strokeLinejoin="round" />
      <Ellipse cx={66.093} cy={22.249} rx={7.199} ry={6.544} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={35.993} cy={64.787} r={5.89} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={42.537} cy={30.757} r={1.963} fill="#3D0230" />
      <Circle cx={68.711} cy={30.757} r={1.963} fill="#3D0230" />
    </Svg>
  );
}

export default SvgComponent;
