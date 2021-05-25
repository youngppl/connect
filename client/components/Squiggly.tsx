import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={347}
      height={15}
      viewBox="0 0 347 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 6.849c2.606 3.17 13.449 7.606 35.968 0 22.52-7.606 32.32-3.291 42.224 0 20.851 8.776 27.94 7.606 47.957 0s29.191-2.895 37.011 0c23.978 8.877 23.249 5.558 41.18 0 17.932-5.558 32.841-7.313 46.915 0 5.387 3.291 20.747 7.899 39.096 0 18.349-7.899 42.745-3.291 52.649 0"
        stroke="#fff"
        strokeOpacity={0.1}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
