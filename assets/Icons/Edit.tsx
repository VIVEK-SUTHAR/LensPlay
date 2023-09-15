import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Edit = (props: SvgProps) => (
  <Svg
    fill="#ffffff"
    viewBox="0 0 24 24"
    id="edit-alt-4"
    data-name="Flat Line"
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
        id="secondary"
        d="M20,8.24,7.24,21H3V16.76L15.76,4A3,3,0,0,1,20,4h0A3,3,0,0,1,20,8.24Z"
      />
      <Path
        id="primary"
        d="M20,8.24,7.24,21H3V16.76L15.76,4A3,3,0,0,1,20,4h0A3,3,0,0,1,20,8.24Z"
      />
    </G>
  </Svg>
);
export default Edit;
