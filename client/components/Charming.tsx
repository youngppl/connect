import * as React from "react";
import Svg, {SvgProps, Circle, G, Mask, Path, Rect, Defs} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={49}
      height={53}
      viewBox="0 0 49 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={24.5} cy={28.5} r={22.5} fill="#fff" />
      <G filter="url(#prefix__filter0_i)">
        <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={3} y={7} width={43} height={43}>
          <Circle
            cx={24.5}
            cy={28.5}
            r={20.835}
            transform="rotate(-11.251 24.5 28.5)"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#prefix__a)">
          <Path fill="#F5CD67" d="M9.977 3.347l35.749 7.759-.824 3.797-35.75-7.76z" />
          <Path fill="#F3A96C" d="M9.73 6.37l35.749 7.759-.354 1.629L9.376 7.999z" />
          <Path fill="#EE774C" d="M9.129 7.764l35.749 7.759-.562 2.587-35.749-7.76z" />
          <Path fill="#F3A96C" d="M6.826 10.654l41.862 9.086-.94 4.337L5.884 14.99z" />
          <Rect
            x={6.504}
            y={9.939}
            width={42.837}
            height={0.604}
            rx={0.302}
            transform="rotate(12.245 6.504 9.94)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M5.598 14.716l41.862 9.086-1.433 6.606-41.863-9.086z" />
          <Path fill="#F3A96C" d="M4.494 21.092l41.862 9.086-.414 1.907L4.08 23z" />
          <Rect
            x={3.992}
            y={21.201}
            width={42.837}
            height={0.813}
            rx={0.406}
            transform="rotate(12.245 3.992 21.201)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M3.79 22.724l41.863 9.086-.989 4.556L2.802 27.28z" />
          <Path fill="#F3A96C" d="M2.924 27.996l41.862 9.086-.653 3.009-41.862-9.086z" />
          <Rect
            x={-0.131}
            y={26.43}
            width={47.799}
            height={0.913}
            rx={0.456}
            transform="rotate(12.245 -.13 26.43)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M1.986 30.73l41.862 9.086-.963 4.44L1.023 35.17z" />
          <Path fill="#F3A96C" d="M2.328 35.838l41.862 9.086-.636 2.93L1.692 38.77z" />
          <Rect
            x={1.986}
            y={35.216}
            width={42.837}
            height={0.648}
            rx={0.324}
            transform="rotate(12.245 1.986 35.216)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M1.406 38.493l41.862 9.086-.322 1.487L1.083 39.98z" />
          <Path fill="#FFF2CF" d="M.992 39.942l41.862 9.086-.343 1.58L.65 41.524z" />
          <Path fill="#F3A96C" d="M1.338 40.552L43.2 49.638l-.96 4.427L.377 44.979z" />
          <Path fill="#EE774C" d="M.092 44.702l41.862 9.086-.657 3.028-41.862-9.085z" />
        </G>
      </G>
      <Circle
        cx={13.319}
        cy={21.572}
        r={1.294}
        transform="rotate(2.154 13.319 21.572)"
        fill="#3D0230"
      />
      <Path
        d="M26.079 20.074l-1.787 1.154a.2.2 0 00-.013.327l1.696 1.285"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Path
        d="M18 22.802c1.489.58 2.182.283 3.265-.802"
        stroke="#3D0230"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G filter="url(#prefix__filter1_d)">
        <Path
          d="M15.099 6.603l1.1 2.413c.062.136.25.16.363.06 1.122-1.01 3.854-1.385 5.328-1.457a.202.202 0 00.192-.208l-.088-2.653a.2.2 0 00-.333-.143l-1.045.93a.2.2 0 01-.233.025l-1.755-1.018a.2.2 0 00-.277.08l-.8 1.512a.2.2 0 01-.17.107l-2.107.07a.2.2 0 00-.175.282z"
          fill="#F2C94C"
        />
        <Path
          d="M15.099 6.603l1.1 2.413c.062.136.25.16.363.06 1.122-1.01 3.854-1.385 5.328-1.457a.202.202 0 00.192-.208l-.088-2.653a.2.2 0 00-.333-.143l-1.045.93a.2.2 0 01-.233.025l-1.755-1.018a.2.2 0 00-.277.08l-.8 1.512a.2.2 0 01-.17.107l-2.107.07a.2.2 0 00-.175.282z"
          stroke="#F2C94C"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
