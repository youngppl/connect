import * as React from "react";
import Svg, {SvgProps, Circle, Path, G, Defs} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={117}
      height={88}
      viewBox="0 0 117 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={57.716} cy={39.163} r={34.163} fill="#F44" />
      <Path
        d="M54.383 29.43c1.625-1.39 2.619-1.297 4.27 0"
        stroke="#3D0230"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47.04 21.676c1.803 1.198 5.556 3.437 6.139 2.813"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Circle cx={50.113} cy={26.819} r={1.601} fill="#3D0230" />
      <Path
        d="M66.338 21.325c-1.65 1.402-5.111 4.067-5.764 3.516"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Circle cx={63.988} cy={26.819} r={1.601} fill="#3D0230" />
      <Path
        d="M54.379 29.429c1.625-1.392 2.619-1.298 4.27 0"
        stroke="#3D0230"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M47.042 21.675c1.803 1.198 5.555 3.437 6.139 2.813"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Circle cx={50.107} cy={26.819} r={1.601} fill="#3D0230" />
      <Path
        d="M66.335 21.323c-1.65 1.402-5.112 4.067-5.765 3.516"
        stroke="#3D0230"
        strokeLinecap="round"
      />
      <Circle cx={63.99} cy={26.819} r={1.601} fill="#3D0230" />
      <Path
        d="M28.89 41.298c-4.271-1.708-4.983 1.423-4.805 3.203l1.068 4.27c1.602 1.78 4.911 4.271 5.338 0 .534-5.337 1.068 1.602 7.473 5.339 6.406 3.736 6.406 0 11.21-1.068 4.804-1.068 4.804 0 9.075 3.203 4.27 3.203 4.804.534 7.473-3.203 2.669-3.737 2.135-.534 6.94 1.068 4.803 1.601 5.87-2.67 7.472-6.94 1.602-4.27 1.602 1.068 5.872 3.203s3.737 0 4.27-3.203a803.475 803.475 0 011.602-9.074c-.89 0-2.99.96-4.27 4.804-1.602 4.804-4.271 1.6-5.872-1.602-1.602-3.203-4.27 1.067-6.94 5.337v.001c-2.669 4.27-7.473 1.602-9.074-2.135-1.602-3.737-6.406-.534-9.609 2.67-3.202 3.202-6.405 2.134-9.608-2.67-3.203-4.805-10.142 0-12.277 2.135-2.136 2.136 0-3.203-5.339-5.338z"
        fill="#F63232"
      />
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M25.474 28.847c-7.608-4.52-22.614-8.69-11.74 1.024 15.883 14.188 83.77 36.913 88.128 35.913 7.504-1.72-6.599-10.33-13.377-13.287"
          stroke="#FF6F6F"
          strokeWidth={3}
        />
      </G>
      <G filter="url(#prefix__filter1_d)">
        <Path
          d="M25.613 50.99c-8.763 1.279-23.075 7.477-8.513 8.17 21.27 1.012 88.436-24.04 91.209-27.553 4.774-6.047-11.615-3.857-18.752-1.888"
          stroke="#FF6F6F"
          strokeWidth={3}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default SvgComponent;
