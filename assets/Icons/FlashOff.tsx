import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const FlashOff = (props: SvgProps) => (
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
        d="M9.18005 18.04V20.48C9.18005 22.16 10.0901 22.5 11.2001 21.24L18.7701 12.64C19.7001 11.59 19.3101 10.72 17.9001 10.72H16.9701"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.82 8.84002V3.52002C14.82 1.84002 13.91 1.50002 12.8 2.76002L5.23 11.36C4.3 12.41 4.69 13.28 6.1 13.28H9.19V14.46"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 2L2 22"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default FlashOff;
