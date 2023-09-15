import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const ArrowLeft = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
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
        d="M11 6L5 12M5 12L11 18M5 12H19"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default ArrowLeft;
