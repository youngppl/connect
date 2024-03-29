import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Ellipse,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={375}
      height={812}
      viewBox="0 0 375 812"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M106.063 687.594C14.9 632.159-59.03 728.565-85.264 784.902a18.127 18.127 0 01-1.422 2.491c-12.696 18.806-8.57 28.084-3.686 31.266 1.157.755 2.555.978 3.933 1.088l262.743 20.898c12.828 1.02 21.311-13.159 10.837-20.637-28.023-20.009-57.998 6.435-90.077-19.272-39.608-31.74 123.825-43.318 8.999-113.142z"
        fill="#FDEE92"
        fillOpacity={0.2}
      />
      <Ellipse
        cx={269.5}
        cy={114.5}
        rx={103.5}
        ry={102.5}
        fill="url(#prefix__paint0_linear)"
        fillOpacity={0.2}
      />
      <Path
        d="M28.82 114.351C134.334 130.188 165.196 12.684 167.585-49.416c.037-.962.159-1.904.347-2.847 4.429-22.255-2.966-29.213-8.701-30.257-1.359-.248-2.735.087-4.048.519L-95.175.406c-12.224 4.024-14.559 20.38-2.008 23.223C-63.6 31.234-46.193-4.749-6.666 6.541 42.14 20.48-104.079 94.403 28.82 114.35z"
        fill="#FDEE92"
      />
      <Path
        d="M190.59 300.313c-1.824 0-3.52-.368-5.088-1.104-1.568-.768-2.848-1.824-3.84-3.168-.384-.576-.576-1.136-.576-1.68 0-.768.304-1.424.912-1.968.608-.576 1.232-.864 1.872-.864.832 0 1.728.48 2.688 1.44.608.576 1.232.992 1.872 1.248.64.224 1.36.336 2.16.336.928 0 1.808-.24 2.64-.72a5.676 5.676 0 002.064-1.92c.512-.832.768-1.696.768-2.592v-20.16c0-.832.304-1.52.912-2.064.608-.576 1.312-.864 2.112-.864.896 0 1.616.272 2.16.816.544.544.816 1.248.816 2.112v20.16c0 1.92-.512 3.728-1.536 5.424-1.024 1.696-2.416 3.056-4.176 4.08-1.76.992-3.68 1.488-5.76 1.488zm35.796-26.16c.832 0 1.52.288 2.064.864.544.544.816 1.232.816 2.064v12.192c0 3.456-.96 6.16-2.88 8.112-1.888 1.952-4.592 2.928-8.112 2.928-3.52 0-6.224-.976-8.112-2.928s-2.832-4.656-2.832-8.112v-12.192c0-.832.272-1.52.816-2.064.544-.576 1.232-.864 2.064-.864.832 0 1.52.288 2.064.864.544.544.816 1.232.816 2.064v12.192c0 1.952.432 3.408 1.296 4.368.864.928 2.16 1.392 3.888 1.392 1.76 0 3.072-.464 3.936-1.392.864-.96 1.296-2.416 1.296-4.368v-12.192c0-.832.272-1.52.816-2.064.544-.576 1.232-.864 2.064-.864zm20.012-4.752c-1.088 0-1.856.32-2.304.96a3.32 3.32 0 00-.672 2.016v2.256h4.368c.768 0 1.408.256 1.92.768.512.48.768 1.104.768 1.872s-.256 1.408-.768 1.92c-.512.48-1.152.72-1.92.72h-4.368v16.992c0 .832-.272 1.536-.816 2.112-.544.544-1.232.816-2.064.816-.832 0-1.52-.272-2.064-.816-.544-.576-.816-1.28-.816-2.112v-16.992h-2.592c-.768 0-1.408-.24-1.92-.72-.512-.512-.768-1.152-.768-1.92s.256-1.392.768-1.872c.512-.512 1.152-.768 1.92-.768h2.592v-2.208c0-2.4.816-4.352 2.448-5.856 1.664-1.504 4.048-2.256 7.152-2.256 1.184 0 2.208.24 3.072.72.896.48 1.344 1.216 1.344 2.208 0 .768-.224 1.392-.672 1.872-.448.48-.992.72-1.632.72-.16 0-.336-.016-.528-.048a16.74 16.74 0 00-.528-.096c-.768-.192-1.408-.288-1.92-.288zm27.024 4.272c.832 0 1.52.272 2.064.816.544.544.816 1.248.816 2.112v20.304c0 .832-.272 1.536-.816 2.112-.544.544-1.232.816-2.064.816-.832 0-1.52-.272-2.064-.816-.512-.544-.784-1.232-.816-2.064-.8.928-1.888 1.728-3.264 2.4a9.813 9.813 0 01-4.272.96c-2.208 0-4.208-.56-6-1.68-1.792-1.152-3.216-2.736-4.272-4.752-1.024-2.016-1.536-4.304-1.536-6.864 0-2.56.512-4.848 1.536-6.864 1.024-2.048 2.416-3.632 4.176-4.752a10.699 10.699 0 015.904-1.728c1.536 0 2.976.288 4.32.864 1.344.544 2.48 1.248 3.408 2.112v-.048c0-.832.272-1.52.816-2.064.544-.576 1.232-.864 2.064-.864zm-9.696 21.36c2.08 0 3.776-.752 5.088-2.256 1.312-1.536 1.968-3.456 1.968-5.76s-.656-4.224-1.968-5.76c-1.312-1.536-3.008-2.304-5.088-2.304-2.048 0-3.728.768-5.04 2.304-1.312 1.536-1.968 3.456-1.968 5.76s.64 4.224 1.92 5.76c1.312 1.504 3.008 2.256 5.088 2.256z"
        fill="#fff"
      />
      <Ellipse
        cx={101}
        cy={418.5}
        rx={63}
        ry={62.5}
        fill="url(#prefix__paint1_linear)"
        fillOpacity={0.2}
      />
      <G filter="url(#prefix__filter0_d)" strokeWidth={4}>
        <Path
          d="M54.439 385.931c-18.8 2.985-30.665 11.564-37.67 20.221-6.212 7.679.648 16.885 10.524 17.072l160.282 3.029c12.351.233 18.771-12.499 7.953-18.463-6.022-3.321-12.076-5.353-16.817-6.26-10.711-2.05-35.79 7.654-46.608 8.187-10.817.533-37.3-30.193-77.664-23.786z"
          stroke="#fff"
        />
        <Path
          d="M54.439 385.931c-18.8 2.985-30.665 11.564-37.67 20.221-6.212 7.679.648 16.885 10.524 17.072l160.282 3.029c12.351.233 18.771-12.499 7.953-18.463-6.022-3.321-12.076-5.353-16.817-6.26-10.711-2.05-35.79 7.654-46.608 8.187-10.817.533-37.3-30.193-77.664-23.786z"
          stroke="url(#prefix__paint2_linear)"
        />
      </G>
      <G filter="url(#prefix__filter1_d)" strokeWidth={4}>
        <Path
          d="M174.658 143.438c-11.205 1.778-19.068 6.253-24.397 11.274-7.19 6.774-.535 16.125 9.341 16.312l105.881 2.001c12.35.233 18.144-12.31 6.519-16.489-2.065-.742-4.014-1.271-5.73-1.599-7.896-1.511-26.384 5.643-34.359 6.036-7.975.393-27.498-22.259-57.255-17.535z"
          stroke="#fff"
        />
        <Path
          d="M174.658 143.438c-11.205 1.778-19.068 6.253-24.397 11.274-7.19 6.774-.535 16.125 9.341 16.312l105.881 2.001c12.35.233 18.144-12.31 6.519-16.489-2.065-.742-4.014-1.271-5.73-1.599-7.896-1.511-26.384 5.643-34.359 6.036-7.975.393-27.498-22.259-57.255-17.535z"
          stroke="url(#prefix__paint3_linear)"
        />
      </G>
      <G filter="url(#prefix__filter2_d)" strokeWidth={4}>
        <Path
          d="M277.801 55.25c-10.369 1.646-17.756 5.698-22.856 10.306-7.33 6.622-.708 15.994 9.168 16.181l99.723 1.885c12.351.233 18.049-12.303 6.317-16.17a35.846 35.846 0 00-4.435-1.167c-7.577-1.45-25.319 5.415-32.972 5.792-7.653.377-26.389-21.36-54.945-16.827z"
          stroke="#fff"
        />
        <Path
          d="M277.801 55.25c-10.369 1.646-17.756 5.698-22.856 10.306-7.33 6.622-.708 15.994 9.168 16.181l99.723 1.885c12.351.233 18.049-12.303 6.317-16.17a35.846 35.846 0 00-4.435-1.167c-7.577-1.45-25.319 5.415-32.972 5.792-7.653.377-26.389-21.36-54.945-16.827z"
          stroke="url(#prefix__paint4_linear)"
        />
      </G>
      <G filter="url(#prefix__filter3_d)" strokeWidth={4}>
        <Path
          d="M-94.561 432.931c-18.8 2.985-30.665 11.564-37.669 20.221-6.213 7.679.647 16.885 10.523 17.072l160.282 3.029c12.35.233 18.77-12.499 7.953-18.463-6.023-3.321-12.076-5.353-16.817-6.26-10.71-2.05-35.79 7.654-46.608 8.187-10.817.533-37.3-30.193-77.664-23.786z"
          stroke="#fff"
        />
        <Path
          d="M-94.561 432.931c-18.8 2.985-30.665 11.564-37.669 20.221-6.213 7.679.647 16.885 10.523 17.072l160.282 3.029c12.35.233 18.77-12.499 7.953-18.463-6.023-3.321-12.076-5.353-16.817-6.26-10.71-2.05-35.79 7.654-46.608 8.187-10.817.533-37.3-30.193-77.664-23.786z"
          stroke="url(#prefix__paint5_linear)"
        />
      </G>
      <G filter="url(#prefix__filter4_d)">
        <Circle cx={278} cy={357} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter5_d)">
        <Circle cx={56} cy={334} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter6_d)">
        <Circle cx={85} cy={324} r={1} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter7_d)">
        <Circle cx={76} cy={227} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter8_d)">
        <Circle cx={105} cy={217} r={1} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter9_d)">
        <Circle
          cx={58.877}
          cy={285.231}
          r={3}
          transform="rotate(139.302 58.877 285.231)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter10_d)">
        <Circle
          cx={43.41}
          cy={311.722}
          r={1}
          transform="rotate(139.302 43.41 311.722)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter11_d)">
        <Circle
          cx={231.877}
          cy={245.231}
          r={3}
          transform="rotate(139.302 231.877 245.231)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter12_d)">
        <Circle
          cx={216.41}
          cy={271.722}
          r={1}
          transform="rotate(139.302 216.41 271.722)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter13_d)">
        <Circle
          cx={241.877}
          cy={327.231}
          r={3}
          transform="rotate(139.302 241.877 327.231)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter14_d)">
        <Circle
          cx={226.41}
          cy={353.722}
          r={1}
          transform="rotate(139.302 226.41 353.722)"
          fill="#fff"
        />
      </G>
      <G filter="url(#prefix__filter15_d)">
        <G filter="url(#prefix__filter16_if)">
          <Path
            d="M82.72 273.998c.504 23.289 19.793 41.759 43.082 41.254a42.004 42.004 0 0026.323-9.961c18.66 7.757 4.131-3.869 5.883-6.089a42.006 42.006 0 009.049-27.033c-.505-23.289-19.794-41.76-43.083-41.255-23.29.505-41.76 19.794-41.255 43.084z"
            fill="#F7C1FF"
          />
        </G>
      </G>
      <G filter="url(#prefix__filter17_f)">
        <Path
          d="M124.235 293.981c10.202.843 29.75-10.424 43.032-17.347.722 1.69-1.262 6.454-1.221 6.933-24.196 11.902-59.537 28.362-61.411 26.74-1.875-1.623-8.018-4.944-6.248-5.41 4.365-3.99 15.645-11.758 25.848-10.916z"
          fill="#F19EFF"
        />
      </G>
      <G filter="url(#prefix__filter18_df)">
        <Path
          d="M77.604 304.246c-3.248-.961 2.17-10.301 7.897-15.746l-1.696-4c-20.9 18.737-13.381 28.501-7.598 27.433 13.007-2.402 108.674-43.239 111.461-54.77 2.229-9.225-14.288-8.386-26.363-5.663l2.195 4c7.276-1.601 12.468-1.412 15.812 1.663 4.179 3.843-92.32 49.86-101.708 47.083z"
          fill="#F6C377"
        />
      </G>
      <G filter="url(#prefix__filter19_f)">
        <Path
          d="M116 270.5c-5.6 4.4-23.667 8.834-32 10.5-.8-2.399-1-5.333-1-6.5 2.833-1.333 9.2-4.2 12-5 3.5-1 19.5-8.5 19.5-14.5s26.5-21 32.5-17.5c4.8 2.8 9 7.5 10.5 9.5-2.5 1.834-9.9 5.8-19.5 7-12 1.5-15 11-22 16.5z"
          fill="#F29FFF"
        />
      </G>
      <G filter="url(#prefix__filter20_d)">
        <Circle cx={76} cy={227} r={3} fill="#fff" />
      </G>
      <G filter="url(#prefix__filter21_f)">
        <Path
          d="M139 269.5c-6 8-36.167 20.167-50 25.5.8 1.6 2.167 3.667 2.5 4 24.667-10.167 74.5-31.6 74.5-34 0-2.4-1.333-6-2-7.5-5.833.667-19 4-25 12z"
          fill="#F19EFF"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={269.5}
          y1={12}
          x2={269.5}
          y2={217}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#E5E5E5" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={101}
          y1={356}
          x2={101}
          y2={481}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#E5E5E5" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={97.204}
          y1={373.15}
          x2={196}
          y2={432.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#6BAB7D" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={206.185}
          y1={134.015}
          x2={279.017}
          y2={177.768}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#6BAB7D" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={308.056}
          y1={46.208}
          x2={377.95}
          y2={88.195}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#6BAB7D" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={-51.796}
          y1={420.15}
          x2={47}
          y2={479.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDEE92" />
          <Stop offset={1} stopColor="#6BAB7D" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
