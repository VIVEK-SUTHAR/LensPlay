import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const FlashOn = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
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
        d="M6.08913 13.2799H9.17913V20.4799C9.17913 22.1599 10.0891 22.4999 11.1991 21.2399L18.7691 12.6399C19.6991 11.5899 19.3091 10.7199 17.8991 10.7199H14.8091V3.5199C14.8091 1.8399 13.8991 1.4999 12.7891 2.7599L5.21913 11.3599C4.29913 12.4199 4.68913 13.2799 6.08913 13.2799Z"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default FlashOn;
