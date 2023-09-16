import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const More = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G id="Menu / More_Vertical">
				<G id="Vector">
					<Path
						d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18Z"
						stroke="#ffffff"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<Path
						d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
						stroke="#ffffff"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<Path
						d="M11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6Z"
						stroke="#ffffff"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</G>
			</G>
		</G>
	</Svg>
);
export default More;
