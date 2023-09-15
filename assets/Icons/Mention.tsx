import * as React from "react";
import Svg, { SvgProps, G, Circle, Path } from "react-native-svg";
const Mention = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Circle cx={12} cy={12} r={4} stroke={props.color} strokeWidth={2} />
			<Path
				d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C14.2516 22 16.3295 21.2558 18.001 20"
				stroke={props.color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M16 8V12C16 13 16.6 15 19 15C21.4 15 22 13 22 12"
				stroke={props.color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</G>
	</Svg>
);
export default Mention;
