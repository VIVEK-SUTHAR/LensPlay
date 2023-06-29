import * as React from "react";
import Svg, { SvgProps, G, Polyline, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Clock = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill={props.color} {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G id="Complete">
				<G id="Clock">
					<G>
						<Polyline
							fill="none"
							points="11.9 5.9 11.9 11.9 12 12 14.1 14.1"
							stroke={props.color}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
						/>
						<Circle
							cx={12}
							cy={12}
							data-name="Circle"
							fill="none"
							id="Circle-2"
							r={10}
							stroke={props.color}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
						/>
					</G>
				</G>
			</G>
		</G>
	</Svg>
);
export default Clock;
