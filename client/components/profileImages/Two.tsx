import * as React from "react";
import Svg, {SvgProps, Circle, Mask, G, Path, Defs} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

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
      <Circle cx={36} cy={36} r={36} fill="#201C1C" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={72} height={72}>
        <Circle cx={36} cy={36} r={36} fill="#C4C4C4" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={29.633} cy={45.156} r={30.037} fill="#F44" />
        <Path
          d="M26.701 36.6c1.43-1.225 2.303-1.142 3.755 0"
          stroke="#3D0230"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.246 29.78c1.585 1.054 4.884 3.023 5.397 2.474"
          stroke="#3D0230"
          strokeLinecap="round"
        />
        <Circle cx={22.947} cy={34.303} r={1.408} fill="#3D0230" />
        <Path
          d="M37.214 29.472c-1.45 1.232-4.495 3.576-5.068 3.092"
          stroke="#3D0230"
          strokeLinecap="round"
        />
        <Circle cx={35.148} cy={34.303} r={1.408} fill="#3D0230" />
        <Path
          d="M26.7 36.598c1.428-1.224 2.302-1.141 3.754 0"
          stroke="#3D0230"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.248 29.782c1.585 1.053 4.884 3.022 5.397 2.473"
          stroke="#3D0230"
          strokeLinecap="round"
        />
        <Circle cx={22.943} cy={34.304} r={1.408} fill="#3D0230" />
        <Path
          d="M37.21 29.472c-1.45 1.232-4.495 3.576-5.068 3.092"
          stroke="#3D0230"
          strokeLinecap="round"
        />
        <Circle cx={35.148} cy={34.304} r={1.408} fill="#3D0230" />
        <Path
          d="M4.285 47.033C.53 45.531-.095 48.285.06 49.85L1 53.604c1.408 1.565 4.318 3.755 4.693 0 .47-4.693.939 1.408 6.57 4.694 5.633 3.285 5.633 0 9.857-.939 4.223-.939 4.223 0 7.978 2.816s4.224.47 6.57-2.816c2.348-3.285 1.878-.47 6.102.939 4.224 1.408 5.163-2.347 6.57-6.102 1.409-3.754 1.409.939 5.163 2.816 3.755 1.878 3.286 0 3.755-2.816a706.196 706.196 0 011.408-7.978c-.782 0-2.628.845-3.755 4.224-1.408 4.224-3.754 1.407-5.162-1.409s-3.755.939-6.101 4.693v.001c-2.347 3.755-6.571 1.408-7.98-1.878-1.407-3.285-5.631-.469-8.447 2.347-2.816 2.816-5.632 1.878-8.448-2.347-2.816-4.224-8.917 0-10.795 1.878-1.877 1.878 0-2.816-4.693-4.694z"
          fill="#F63232"
        />
        <G filter="url(#prefix__filter0_d)">
          <Path
            d="M1.28 36.086c-6.69-3.973-19.883-7.64-10.323.9C4.922 49.461 64.61 69.441 68.443 68.563c6.598-1.513-5.802-9.083-11.762-11.683"
            stroke="#FF6F6F"
            strokeWidth={3}
          />
        </G>
        <G filter="url(#prefix__filter1_d)">
          <Path
            d="M1.406 55.555C-6.3 56.68-18.882 62.13-6.08 62.74c18.701.89 77.755-21.136 80.194-24.225 4.197-5.317-10.213-3.391-16.488-1.66"
            stroke="#FF6F6F"
            strokeWidth={3}
          />
        </G>
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
