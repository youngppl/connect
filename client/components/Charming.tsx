import * as React from "react";
import Svg, {SvgProps, Path, Circle, G, Mask, Rect, Defs} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={83}
      height={95}
      viewBox="0 0 83 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M76.391 73.489c2.897-5.31 1.246-45.101.402-61.968C76.58 7.29 73.083 4 68.848 4H13.643C9.484 4 6.026 7.158 5.73 11.306 4.5 28.603 2.022 70.942 6.902 75.334c5.03 4.527 25.284 11.934 32.49 14.48a7.587 7.587 0 005.115-.005c7.454-2.675 28.845-10.749 31.884-16.32z"
        fill="#FF97D5"
        fillOpacity={0.3}
        stroke="#fff"
        strokeOpacity={0.1}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={40.5} cy={46.5} r={22.5} fill="#fff" />
      <G filter="url(#prefix__filter0_i)">
        <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={19} y={25} width={43} height={43}>
          <Circle
            cx={40.5}
            cy={46.5}
            r={20.835}
            transform="rotate(-11.251 40.5 46.5)"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#prefix__a)">
          <Path fill="#F5CD67" d="M25.977 21.347l35.749 7.759-.824 3.797-35.75-7.76z" />
          <Path fill="#F3A96C" d="M25.73 24.37l35.749 7.759-.354 1.629-35.749-7.759z" />
          <Path fill="#EE774C" d="M25.129 25.764l35.749 7.759-.562 2.587-35.748-7.76z" />
          <Path fill="#F3A96C" d="M22.826 28.654l41.862 9.086-.94 4.337-41.863-9.086z" />
          <Rect
            x={22.504}
            y={27.939}
            width={42.837}
            height={0.604}
            rx={0.302}
            transform="rotate(12.245 22.504 27.94)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M21.598 32.716l41.862 9.086-1.433 6.606-41.863-9.086z" />
          <Path fill="#F3A96C" d="M20.494 39.092l41.862 9.086-.414 1.907L20.08 41z" />
          <Rect
            x={19.992}
            y={39.201}
            width={42.837}
            height={0.813}
            rx={0.406}
            transform="rotate(12.245 19.992 39.201)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M19.79 40.724l41.863 9.086-.989 4.556-41.862-9.086z" />
          <Path fill="#F3A96C" d="M18.924 45.996l41.862 9.086-.653 3.009-41.862-9.086z" />
          <Rect
            x={15.869}
            y={44.43}
            width={47.799}
            height={0.913}
            rx={0.456}
            transform="rotate(12.245 15.87 44.43)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M17.986 48.73l41.862 9.086-.963 4.44-41.862-9.086z" />
          <Path fill="#F3A96C" d="M18.328 53.838l41.862 9.086-.636 2.93-41.862-9.085z" />
          <Rect
            x={17.986}
            y={53.216}
            width={42.837}
            height={0.648}
            rx={0.324}
            transform="rotate(12.245 17.986 53.216)"
            fill="#FFF2CF"
          />
          <Path fill="#EE774C" d="M17.406 56.493l41.862 9.086-.322 1.487-41.863-9.086z" />
          <Path fill="#FFF2CF" d="M16.992 57.942l41.862 9.086-.343 1.58-41.862-9.085z" />
          <Path fill="#F3A96C" d="M17.338 58.552L59.2 67.638l-.96 4.427-41.863-9.086z" />
          <Path fill="#EE774C" d="M16.092 62.702l41.862 9.086-.657 3.028-41.862-9.085z" />
        </G>
      </G>
      <Circle
        cx={29.319}
        cy={39.572}
        r={1.294}
        transform="rotate(2.154 29.319 39.572)"
        fill="#3D0230"
      />
      <Path
        d="M42.079 38.074l-1.787 1.154a.2.2 0 00-.013.327l1.696 1.285"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Path
        d="M34 40.802c1.489.58 2.182.283 3.265-.802"
        stroke="#3D0230"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <G filter="url(#prefix__filter1_d)">
        <Path
          d="M31.099 24.603l1.1 2.413c.062.136.25.16.363.06 1.122-1.01 3.855-1.385 5.328-1.457a.202.202 0 00.192-.209l-.088-2.652a.2.2 0 00-.333-.143l-1.045.93a.2.2 0 01-.233.025l-1.755-1.018a.2.2 0 00-.277.08l-.8 1.512a.2.2 0 01-.17.107l-2.107.07a.2.2 0 00-.175.282z"
          fill="#F2C94C"
        />
        <Path
          d="M31.099 24.603l1.1 2.413c.062.136.25.16.363.06 1.122-1.01 3.855-1.385 5.328-1.457a.202.202 0 00.192-.209l-.088-2.652a.2.2 0 00-.333-.143l-1.045.93a.2.2 0 01-.233.025l-1.755-1.018a.2.2 0 00-.277.08l-.8 1.512a.2.2 0 01-.17.107l-2.107.07a.2.2 0 00-.175.282z"
          stroke="#F2C94C"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
