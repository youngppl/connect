import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={54}
      height={44}
      viewBox="0 0 54 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.372 22.041c.253 11.668 9.916 20.92 21.583 20.668a21.042 21.042 0 0013.187-4.99c9.348 3.886 2.069-1.939 2.947-3.05a21.044 21.044 0 004.533-13.544C46.37 9.458 36.706.205 25.04.458 13.372.711 4.119 10.374 4.372 22.041z"
        fill="#fff"
      />
      <Path
        d="M3.483 35.388c-1.487-.447.995-4.791 3.619-7.323l-.778-1.86C-3.25 34.918.194 39.46 2.844 38.962c5.959-1.117 49.786-20.11 51.063-25.473 1.02-4.29-6.546-3.9-12.078-2.634l1.006 1.86c3.333-.744 6.727-1.294 7.243.774.422 1.689-42.294 23.19-46.595 21.898z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
