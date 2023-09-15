import * as React from "react";
import Svg, { SvgProps, G, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const QR = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    aria-labelledby="qrIconTitle"
    stroke="#ffffff"
    strokeWidth={1}
    strokeLinecap="square"
    strokeLinejoin="miter"
    color="#000000"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Rect x={10} y={3} width={7} height={7} transform="rotate(90 10 3)" />
      <Rect width={1} height={1} transform="matrix(-1 0 0 1 7 6)" />
      <Rect x={10} y={14} width={7} height={7} transform="rotate(90 10 14)" />
      <Rect x={6} y={17} width={1} height={1} />
      <Rect x={14} y={20} width={1} height={1} />
      <Rect x={17} y={17} width={1} height={1} />
      <Rect x={14} y={14} width={1} height={1} />
      <Rect x={20} y={17} width={1} height={1} />
      <Rect x={20} y={14} width={1} height={1} />
      <Rect x={20} y={20} width={1} height={1} />
      <Rect x={21} y={3} width={7} height={7} transform="rotate(90 21 3)" />
      <Rect x={17} y={6} width={1} height={1} />
    </G>
  </Svg>
);
export default QR;
