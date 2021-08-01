import * as React from "react";
import Svg, {SvgProps, Path} from "react-native-svg";

function SvgComponent(props: SvgProps & {color: string}) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        d="M10.41 24.526v-3.68c0-.936.802-1.697 1.798-1.703h3.645c1 0 1.81.762 1.81 1.703v3.691c0 .795.675 1.444 1.52 1.463h2.43C24.036 26 26 24.153 26 21.874v0-10.469c-.013-.896-.46-1.738-1.215-2.285l-8.312-6.298a4.184 4.184 0 00-4.982 0l-8.276 6.31C2.458 9.675 2.01 10.52 2 11.416v10.457C2 24.153 3.964 26 6.387 26h2.43c.866 0 1.568-.66 1.568-1.474v0"
        stroke={props.color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
