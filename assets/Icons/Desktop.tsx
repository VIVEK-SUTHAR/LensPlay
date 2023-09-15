import * as React from "react";
import Svg, { SvgProps, G, Defs, Line, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Desktop = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="none" stroke={"#ffffff"} {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Defs></Defs>
			<Line x1={8.18} y1={22.5} x2={9.14} y2={17.73} />
			<Line x1={5.32} y1={22.5} x2={18.68} y2={22.5} />
			<Rect x={1.5} y={1.5} width={21} height={16.23} rx={1.91} />
			<Line x1={15.75} y1={22.5} x2={14.8} y2={17.73} />
			<Line x1={1.5} y1={13.91} x2={22.5} y2={13.91} />
		</G>
	</Svg>
);
export default Desktop;
