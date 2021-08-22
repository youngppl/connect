import * as React from "react";
import Svg, {SvgProps, Circle, Mask, G, Ellipse, Path} from "react-native-svg";

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
      <Circle cx={36} cy={36} r={36} fill="#045E58" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={72} height={72}>
        <Circle cx={36} cy={36} r={36} fill="#fff" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={37.524} cy={47.435} r={30.155} fill="#D1FFA4" />
        <Mask id="prefix__b" maskUnits="userSpaceOnUse" x={3} y={20} width={61} height={61}>
          <Circle cx={33.755} cy={50.263} r={30.155} fill="#D1FFA4" />
        </Mask>
        <G mask="url(#prefix__b)">
          <Circle cx={44.12} cy={44.608} r={30.155} fill="#BFFE80" />
        </G>
        <Mask id="prefix__c" maskUnits="userSpaceOnUse" x={10} y={18} width={58} height={59}>
          <Ellipse cx={38.937} cy={47.435} rx={28.742} ry={29.213} fill="#D1FFA4" />
        </Mask>
        <G mask="url(#prefix__c)">
          <Ellipse cx={48.818} cy={41.958} rx={28.742} ry={29.213} fill="#ADFF5C" />
        </G>
        <Path
          d="M42.236 40.838h3.77"
          stroke="#3D0230"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Ellipse cx={51.187} cy={33.3} rx={5.183} ry={4.712} fill="#F2FFE6" fillOpacity={0.5} />
        <Circle cx={29.516} cy={63.927} r={4.241} fill="#F2FFE6" fillOpacity={0.5} />
        <Circle cx={34.228} cy={39.425} r={1.414} fill="#3D0230" />
        <Circle cx={53.072} cy={39.425} r={1.414} fill="#3D0230" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
