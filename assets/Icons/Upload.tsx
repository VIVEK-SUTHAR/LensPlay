import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Upload = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="#ffffff"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <G>
        <Path fill="none" d="M0 0H24V24H0z" />
        <Path d="M16 4c.552 0 1 .448 1 1v4.2l5.213-3.65c.226-.158.538-.103.697.124.058.084.09.184.09.286v12.08c0 .276-.224.5-.5.5-.103 0-.203-.032-.287-.09L17 14.8V19c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1V5c0-.552.448-1 1-1h14zM9 8l-4 4h3v4h2v-4h3L9 8z" />
      </G>
    </G>
  </Svg>
);
export default Upload;
