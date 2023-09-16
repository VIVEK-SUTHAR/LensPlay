import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Done = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" stroke={props.color ? props.color : "#ffffff"} {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Path
				d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
				stroke={props.color ? props.color : "#ffffff"}
				strokeLinecap="round"
			/>
		</G>
	</Svg>
);
export default Done;
