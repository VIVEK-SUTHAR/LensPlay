import * as React from "react";
import Svg, { SvgProps, G, Rect, Circle } from "react-native-svg";
const More = (props: SvgProps) => (
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
      <Rect width={24} height={24} fill="white" />
      <Circle
        cx={7}
        cy={12}
        r={0.5}
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={0.5}
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={17}
        cy={12}
        r={0.5}
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default More;
