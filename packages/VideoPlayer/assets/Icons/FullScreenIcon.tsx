import * as React from 'react';
import Svg, { type SvgProps, G, Path } from 'react-native-svg';

const FullScreenIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props} fill="#FFFFFF">
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
    </G>
  </Svg>
);

export default FullScreenIcon;
