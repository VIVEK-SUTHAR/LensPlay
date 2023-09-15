import * as React from "react";
import Svg, { SvgProps, G, Polygon } from "react-native-svg";
const HomeFilled = (props: SvgProps) => (
  <Svg
    fill="#ffffff"
    viewBox="0 0 512 512"
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
      <Polygon
        fillRule="evenodd"
        points="192 0 0 153.6 0 384 149.333 384 149.333 256 234.667 256 234.667 384 384 384 384 153.6"
        transform="translate(64 64)"
      />
    </G>
  </Svg>
);
export default HomeFilled;
