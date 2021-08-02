import * as React from "react";
import Svg, {SvgProps, Path, G, Circle, Mask, Ellipse, Defs} from "react-native-svg";
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
      <G filter="url(#prefix__filter0_d)">
        <Circle r={0.271} transform="scale(-1 1) rotate(56.991 -57.416 -.29)" fill="#fff" />
      </G>
      <Path
        d="M60.5 47c0 9.628-8.468 17.5-19 17.5s-19-7.872-19-17.5 8.468-17.5 19-17.5 19 7.872 19 17.5z"
        fill="#fff"
        stroke="#371463"
      />
      <Path
        d="M27 52.096V44.31c0-1.14.48-2.237 1.37-2.95 8.377-6.705 18.099-7.586 26.456.024.772.703 1.174 1.72 1.174 2.764v7.938c0 1.563-.904 3-2.362 3.562-7.672 2.957-15.767 3.306-24.285.004C27.9 55.089 27 53.654 27 52.096z"
        fill="#371463"
        stroke="#371463"
      />
      <Circle cx={33.702} cy={42.911} r={2.44} fill="#D1FFA4" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={30} y={40} width={6} height={6}>
        <Circle cx={33.399} cy={43.14} r={2.44} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={34.237} cy={42.683} r={2.44} fill="#BFFE80" />
      </G>
      <Mask id="prefix__b" maskUnits="userSpaceOnUse" x={31} y={40} width={6} height={6}>
        <Ellipse cx={33.82} cy={42.91} rx={2.325} ry={2.364} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__b)">
        <Ellipse cx={34.617} cy={42.466} rx={2.325} ry={2.364} fill="#ADFF5C" />
      </G>
      <Ellipse cx={34.808} cy={41.767} rx={0.419} ry={0.381} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={33.056} cy={44.245} r={0.343} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={46.155} cy={50.771} r={2.202} fill="#F39FFF" />
      <G filter="url(#prefix__filter1_f)">
        <Path
          d="M44.087 51.534c-.565.083-1.488.482-.55.527 1.372.065 5.701-1.55 5.88-1.776.307-.39-.749-.249-1.209-.122"
          stroke="#FFCE70"
          strokeWidth={0.5}
        />
      </G>
      <G filter="url(#prefix__filter2_d)">
        <Circle r={0.5} transform="matrix(-1 0 0 1 46.5 44.5)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter3_d)">
        <Circle transform="scale(1 -1) rotate(-40.698 -31.411 -87.668)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter4_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -34.505 -91.437)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter5_d)">
        <Circle r={0.332} transform="scale(-1 1) rotate(56.991 -58.713 -16.982)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter6_d)">
        <Circle transform="scale(1 -1) rotate(16.292 191.06 104.376)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter7_d)">
        <Circle r={0.332} transform="scale(-1 1) rotate(56.991 -62.358 -3.293)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter8_d)">
        <Circle transform="scale(1 -1) rotate(16.292 174.746 83.938)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter9_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -46.832 -79.23)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter10_d)">
        <Circle r={0.111} transform="scale(-1 1) rotate(56.991 -61.851 .145)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter11_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -39.75 -91.01)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter12_d)">
        <Circle transform="scale(1 -1) rotate(16.292 171.224 82.876)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter13_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -36.429 -72.993)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter14_df)">
        <Path d="M45.419 41H47h-2 .419z" stroke="#fff" />
      </G>
      <G filter="url(#prefix__filter15_df)">
        <Path d="M39 49l-.79-3-.21.162L39 49z" fill="#fff" />
        <Path d="M39 49l-.79-3-.21.162L39 49z" stroke="#fff" />
      </G>
      <Path
        d="M64.176 43.07c-.731-2.386-3.311-3.241-4.53-3.042C62.084 46.47 60.016 52.912 59 55c2.436 0 4.262-1.193 4.567-1.79 1.769-3.963 1.814-6.171.609-10.14zM18.825 53.406C19.86 55.59 23.138 55.025 24 54.62c-1.811-6.312-1.57-13.46-.6-14.675-3.234-2.73-5.114 1.222-5.222 2.233-.518 2.67.216 8.598.647 11.228z"
        fill="#fff"
        stroke="#371463"
      />
      <Circle cx={59} cy={32} r={1.5} fill="#fff" stroke="#371463" />
      <Path d="M58 33h2v6.5h-2V33z" fill="#371463" />
      <Path
        opacity={0.2}
        d="M52.295 46.303c-.135-1.885-.846-3.927-1.185-4.712-.337-.883.163-.593.668-.3l.01.005c.507.295 1.185 5.007 1.185 5.891 0 .884.17 2.062-.339 2.65-.406.472-.395-.196-.339-.588.057-.197.136-1.06 0-2.946z"
        fill="#fff"
      />
      <Path
        d="M31.6 66.08c-6.3-1.398-3.03-4.08 0-4.08 7.755 3.73 16.56 1.554 19.993 0 7.269.583 3.634 3.513 2.423 4.08-1.21.569-14.54 1.75-22.415 0z"
        fill="#fff"
        stroke="#371463"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
