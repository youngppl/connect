import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

function SvgComponent(props: SvgProps & {filled: boolean}) {
  return (
    <Svg
      width={36}
      height={34}
      viewBox="0 0 36 34"
      fill={props.filled ? "#fff" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        clipRule="evenodd"
        d="M20.024 2.658l3.35 6.693a2.251 2.251 0 001.698 1.218l7.494 1.08c1.852.267 2.589 2.51 1.249 3.797l-5.42 5.207a2.206 2.206 0 00-.649 1.971l1.28 7.352c.314 1.819-1.621 3.207-3.276 2.346l-6.7-3.473a2.288 2.288 0 00-2.1 0l-6.7 3.473c-1.655.86-3.59-.527-3.273-2.346l1.277-7.352a2.206 2.206 0 00-.65-1.97l-5.419-5.208c-1.34-1.286-.603-3.53 1.249-3.798l7.494-1.079a2.254 2.254 0 001.7-1.218l3.348-6.693c.828-1.655 3.22-1.655 4.048 0z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
