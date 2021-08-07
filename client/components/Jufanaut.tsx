import * as React from "react";
import Svg, {SvgProps, G, Circle, Path, Mask, Ellipse, Defs} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={49}
      height={39}
      viewBox="0 0 49 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#prefix__filter0_d)">
        <Circle r={0.271} transform="scale(-1 1) rotate(56.991 -22.205 .868)" fill="#fff" />
      </G>
      <Path
        d="M43.5 18c0 9.628-8.468 17.5-19 17.5s-19-7.872-19-17.5S13.968.5 24.5.5s19 7.872 19 17.5z"
        fill="#fff"
        stroke="#371463"
      />
      <Path
        d="M10 23.096V15.31c0-1.14.48-2.237 1.37-2.95 8.377-6.705 18.099-7.586 26.456.024.772.703 1.174 1.72 1.174 2.764v7.938c0 1.563-.904 3-2.362 3.562-7.672 2.957-15.767 3.306-24.285.003C10.9 26.09 10 24.654 10 23.096z"
        fill="#371463"
        stroke="#371463"
      />
      <Circle cx={16.702} cy={13.911} r={2.44} fill="#D1FFA4" />
      <Mask id="prefix__a" maskUnits="userSpaceOnUse" x={13} y={11} width={6} height={6}>
        <Circle cx={16.399} cy={14.14} r={2.44} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__a)">
        <Circle cx={17.237} cy={13.683} r={2.44} fill="#BFFE80" />
      </G>
      <Mask id="prefix__b" maskUnits="userSpaceOnUse" x={14} y={11} width={6} height={6}>
        <Ellipse cx={16.82} cy={13.911} rx={2.325} ry={2.364} fill="#D1FFA4" />
      </Mask>
      <G mask="url(#prefix__b)">
        <Ellipse cx={17.616} cy={13.466} rx={2.325} ry={2.364} fill="#ADFF5C" />
      </G>
      <Ellipse cx={17.808} cy={12.767} rx={0.419} ry={0.381} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={16.056} cy={15.245} r={0.343} fill="#F2FFE6" fillOpacity={0.5} />
      <Circle cx={29.155} cy={21.771} r={2.202} fill="#F39FFF" />
      <G filter="url(#prefix__filter1_f)">
        <Path
          d="M27.087 22.534c-.565.082-1.488.482-.55.527 1.372.065 5.701-1.55 5.88-1.776.307-.39-.749-.249-1.209-.122"
          stroke="#FFCE70"
          strokeWidth={0.5}
        />
      </G>
      <G filter="url(#prefix__filter2_d)">
        <Circle r={0.5} transform="matrix(-1 0 0 1 29.5 15.5)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter3_d)">
        <Circle transform="scale(1 -1) rotate(-40.698 -.816 -50.25)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter4_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -3.91 -54.019)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter5_d)">
        <Circle r={0.332} transform="scale(-1 1) rotate(56.991 -23.502 -15.824)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter6_d)">
        <Circle transform="scale(1 -1) rotate(16.292 81.262 59.495)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter7_d)">
        <Circle r={0.332} transform="scale(-1 1) rotate(56.991 -27.147 -2.135)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter8_d)">
        <Circle transform="scale(1 -1) rotate(16.292 64.948 39.057)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter9_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -16.236 -41.811)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter10_d)">
        <Circle r={0.111} transform="scale(-1 1) rotate(56.991 -26.64 1.303)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter11_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -9.154 -53.592)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter12_d)">
        <Circle transform="scale(1 -1) rotate(16.292 61.427 37.995)" fill="#fff" r={0.332} />
      </G>
      <G filter="url(#prefix__filter13_d)">
        <Circle r={0.111} transform="scale(1 -1) rotate(-40.698 -5.833 -35.575)" fill="#fff" />
      </G>
      <G filter="url(#prefix__filter14_df)">
        <Path d="M28.419 12H30h-2 .419z" stroke="#fff" />
      </G>
      <G filter="url(#prefix__filter15_df)">
        <Path d="M22 20l-.79-3-.21.162L22 20z" fill="#fff" />
        <Path d="M22 20l-.79-3-.21.162L22 20z" stroke="#fff" />
      </G>
      <Path
        d="M47.176 14.07c-.731-2.386-3.311-3.241-4.53-3.042C45.084 17.47 43.016 23.912 42 26c2.436 0 4.262-1.193 4.567-1.79 1.769-3.963 1.814-6.171.609-10.14zM1.825 24.406C2.86 26.59 6.138 26.025 7 25.62c-1.811-6.312-1.57-13.46-.6-14.675-3.234-2.73-5.114 1.222-5.222 2.233-.518 2.67.216 8.598.647 11.228z"
        fill="#fff"
        stroke="#371463"
      />
      <Circle cx={42} cy={3} r={1.5} fill="#fff" stroke="#371463" />
      <Path d="M41 4h2v6.5h-2V4z" fill="#371463" />
      <Path
        opacity={0.2}
        d="M35.295 17.303c-.135-1.885-.846-3.927-1.185-4.712-.337-.883.163-.593.668-.3l.01.005c.507.295 1.185 5.007 1.185 5.891 0 .884.17 2.062-.339 2.65-.406.472-.395-.195-.339-.588.057-.197.136-1.06 0-2.946z"
        fill="#fff"
      />
      <Path
        d="M14.6 37.08c-6.3-1.398-3.03-4.08 0-4.08 7.755 3.73 16.56 1.554 19.993 0 7.269.583 3.634 3.513 2.423 4.08-1.21.569-14.54 1.75-22.415 0z"
        fill="#fff"
        stroke="#371463"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
