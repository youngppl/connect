import * as React from "react";
import Svg, {
  Path,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width={375}
      height={144}
      viewBox="0 0 375 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M66.727 111.185c9.685-72.454-44.3-79.112-73.84-70.665-9.977 10.882-17.26 44.921 6.696 65.431 16.995 14.55 43.237 17.024 67.144 5.234z"
        fill="#F39FFF"
      />
      <Path
        d="M35.66 96.487c-8.124 8.095 16.345 11.612 29.256 11.357l1.018-7.042c-5.638.039-18.063-1.283-21.31-2.869-4.058-1.982 13.709-14.665 12.695-17.673-.81-2.406 5.978-2.385 9.474-2.074l-1.352-4.011c-4.115-.474-12.855.088-14.887 6.131-2.54 7.554-4.74 6.063-14.894 16.181z"
        fill="#F6C5FD"
      />
      <Path
        d="M35.66 96.487c-8.124 8.095 16.345 11.612 29.256 11.357l1.018-7.042c-5.638.039-18.063-1.283-21.31-2.869-4.058-1.982 13.709-14.665 12.695-17.673-.81-2.406 5.978-2.385 9.474-2.074l-1.352-4.011c-4.115-.474-12.855.088-14.887 6.131-2.54 7.554-4.74 6.063-14.894 16.181zM30.08 82.724c-10.138 3.415-13.857 28.678-14.45 40.883L8.7 118.739c1.995-13.278 8.41-41.01 18.113-45.719 12.128-5.886 6.58-32.83 10.293-32.28 2.97.44 8.697 4.875 11.189 7.036-1.568 2.33-4.267 8.28-2.523 13.456 2.179 6.469-3.018 17.223-15.69 21.492zM17.5 38.824c4.504 5.341-18.506 35.383-31.093 48.197C-14.87 79.22 1.518 49.923 10.39 37.789l7.11 1.035z"
        fill="#F6C5FD"
      />
      <Path
        d="M33.812 67.887l-7.643 2.575c-.43.144-.715.56-.627 1.005.413 2.084 2.064 4.842 6.364 3.393 4.3-1.448 3.946-4.642 3.014-6.552-.2-.407-.679-.566-1.108-.42z"
        fill="#3D0230"
      />
      <Circle
        cx={20.508}
        cy={70.785}
        r={1.5}
        transform="rotate(-18.616 20.508 70.785)"
        fill="#3D0230"
      />
      <Circle
        cx={38.514}
        cy={64.72}
        r={1.5}
        transform="rotate(-18.616 38.514 64.72)"
        fill="#3D0230"
      />
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M79.471 45.515c11.476 5.737-41.985 52.44-70.15 75.073l6.147 3.073c24.759-22.63 77.02-70.87 75.754-78.675-1.582-9.756-9.26-12.31-16.913-9.734-8.83 2.972-23.123 8.932-27.525 14.416l4.618 3.588c4.574-4.97 16.593-13.477 28.069-7.74z"
          fill="#FFCE70"
        />
      </G>
      <G filter="url(#prefix__filter1_f)">
        <Path fill="url(#prefix__paint0_linear)" d="M-12 67h393v67H-12z" />
      </G>
      <G filter="url(#prefix__filter2_d)">
        <Circle cx={137} cy={74} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter3_d)">
        <Circle cx={166} cy={64} r={1} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter4_d)">
        <Circle
          cx={100.877}
          cy={44.231}
          r={3}
          transform="rotate(139.302 100.877 44.23)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter5_d)">
        <Circle cx={341.354} cy={54} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter6_d)">
        <Circle cx={370.354} cy={44} r={1} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter7_d)">
        <Circle
          cx={289.764}
          cy={50.722}
          r={1}
          transform="rotate(139.302 289.764 50.722)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter8_d)">
        <Circle cx={59} cy={37} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter9_d)">
        <Circle
          cx={22.877}
          cy={7.231}
          r={3}
          transform="rotate(139.302 22.877 7.23)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter10_d)">
        <Circle
          cx={7.41}
          cy={33.722}
          r={1}
          transform="rotate(139.302 7.41 33.722)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter11_d)">
        <Circle
          cx={257.23}
          cy={50.231}
          r={3}
          transform="rotate(139.302 257.23 50.23)"
          fill="#fff"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={185.024}
          y1={108.231}
          x2={185.024}
          y2={67}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#371463" />
          <Stop offset={1} stopColor="#371463" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
