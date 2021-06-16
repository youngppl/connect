import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

function SvgComponent(props: SvgProps & { color: string }) {
  return (
    <Svg width={24} height={28} viewBox="0 0 24 28" fill="none">
      <G
        opacity={0.8}
        clipRule="evenodd"
        stroke={props.color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M11.5 18c-5.124 0-9.5.796-9.5 3.986C2 25.176 6.348 26 11.5 26c5.125 0 9.5-.798 9.5-3.986S16.653 18 11.5 18zM11.5 14c3.59 0 6.5-2.687 6.5-6 0-3.314-2.91-6-6.5-6S5 4.686 5 8c-.012 3.302 2.879 5.989 6.455 6h.046z" />
      </G>
    </Svg>
  );
}

export default SvgComponent;
