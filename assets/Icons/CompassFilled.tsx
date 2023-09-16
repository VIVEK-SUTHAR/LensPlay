import * as React from "react";
import Svg, { SvgProps, G, Circle, Path } from "react-native-svg";
const CompassFilled = (props: SvgProps) => (
	<Svg id="Layer_1" viewBox="0 0 64 64" fill="#000000" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G>
				<Circle fill="#ffffff" cx={32} cy={32} r={4} />
				<Path
					fill="#ffffff"
					d="M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M40,40l-22,6l6-22l22-6 L40,40z"
				/>
			</G>
		</G>
	</Svg>
);
export default CompassFilled;
