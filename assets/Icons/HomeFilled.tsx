import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const HomeFilled = (props: SvgProps) => (
  <Svg
    viewBox="0 0 1024 1024"
    fill="#ffffff"
    stroke="#ffffff"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        fill="#ffffff"
        d="M512 128L128 447.936V896h255.936V640H640v256h255.936V447.936z"
      />
    </G>
  </Svg>
);
export default HomeFilled;
