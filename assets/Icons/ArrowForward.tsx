import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const ArrowForward = (props: SvgProps) => (
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
        d="M13 6L19 12M19 12L13 18M19 12H5"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default ArrowForward;
