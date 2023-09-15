import * as React from "react";
import Svg, { SvgProps, G, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CommentIcon = (props: SvgProps) => (
  <Svg
    fill="#ffffff"
    viewBox="0 0 32 32"
    id="Outlined"
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
      <G id="Fill">
        <Path d="M26,3H6A3,3,0,0,0,3,6V30.41l5.12-5.12A1.05,1.05,0,0,1,8.83,25H26a3,3,0,0,0,3-3V6A3,3,0,0,0,26,3Zm1,19a1,1,0,0,1-1,1H8.83a3,3,0,0,0-2.12.88L5,25.59V6A1,1,0,0,1,6,5H26a1,1,0,0,1,1,1Z" />
        <Rect height={2} width={12} x={10} y={11} />
        <Rect height={2} width={7} x={10} y={15} />
      </G>
    </G>
  </Svg>
);
export default CommentIcon;
