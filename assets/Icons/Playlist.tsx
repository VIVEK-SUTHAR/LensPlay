import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const PlaylistIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="#000000"
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
        d="M11 14L3 14"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M11 18H3"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M18.875 14.1183C20.5288 15.0732 21.3558 15.5506 21.4772 16.2394C21.5076 16.4118 21.5076 16.5881 21.4772 16.7604C21.3558 17.4492 20.5288 17.9266 18.875 18.8815C17.2212 19.8363 16.3942 20.3137 15.737 20.0745C15.5725 20.0147 15.4199 19.9265 15.2858 19.814C14.75 19.3644 14.75 18.4096 14.75 16.4999C14.75 14.5902 14.75 13.6354 15.2858 13.1858C15.4199 13.0733 15.5725 12.9852 15.737 12.9253C16.3942 12.6861 17.2212 13.1635 18.875 14.1183Z"
        stroke="#000000"
        strokeWidth={1.5}
      />
      <Path
        d="M3 6L13.5 6M20 6L17.75 6"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M20 10L9.5 10M3 10H5.25"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </G>
  </Svg>
);
export default PlaylistIcon;
