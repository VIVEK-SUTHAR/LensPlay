import * as React from 'react';
import Svg, { Defs, G, Path, type SvgProps } from 'react-native-svg';
const ExitFullScreenIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill="#ffffff" {...props}>
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Defs />
      <G
        id="Page-1"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <G
          id="Dribbble-Light-Preview"
          transform="translate(-260.000000, -4199.000000)"
          fill="#ffffff"
        >
          <G id="icons" transform="translate(56.000000, 160.000000)">
            <Path
              d="M218,4047 L224,4047 L224,4045 L218,4045 L218,4039 L216,4039 L216,4043.959 L216,4047 L218,4047 Z M218,4053 L224,4053 L224,4051 L218,4051 L216,4051 L216,4051.959 L216,4059 L218,4059 L218,4053 Z M210,4059 L212,4059 L212,4051.959 L212,4051 L210,4051 L204,4051 L204,4053 L210,4053 L210,4059 Z M210,4039 L212,4039 L212,4043.959 L212,4047 L210,4047 L204,4047 L204,4045 L210,4045 L210,4039 Z"
              id="exit_full_screen-[#905]"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);
export default React.memo(ExitFullScreenIcon);
