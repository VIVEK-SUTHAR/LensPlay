import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Collect = (props: SvgProps) => (
	<Svg
		viewBox="0 0 16 16"
		fill="none"
		stroke={props.color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={1.5}
		{...props}
	>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Path d="m1.75 11 6.25 3.25 6.25-3.25m-12.5-3 6.25 3.25 6.25-3.25m-6.25-6.25-6.25 3.25 6.25 3.25 6.25-3.25z" />
		</G>
	</Svg>
);
export default Collect;
