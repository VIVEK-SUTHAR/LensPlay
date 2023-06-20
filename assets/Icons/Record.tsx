import * as React from "react";
import Svg, { SvgProps, G, Defs, Path } from "react-native-svg";

const Record = (props: SvgProps) => (
	<Svg viewBox="0 0 20 20" fill="#000000" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Defs />
			<G id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
				<G
					id="Dribbble-Light-Preview"
					transform="translate(-380.000000, -3839.000000)"
					fill="#FF0303"
				>
					<G id="icons" transform="translate(56.000000, 160.000000)">
						<Path
							d="M338,3689 C338,3691.209 336.209,3693 334,3693 C331.791,3693 330,3691.209 330,3689 C330,3686.791 331.791,3685 334,3685 C336.209,3685 338,3686.791 338,3689 M334,3697 C329.589,3697 326,3693.411 326,3689 C326,3684.589 329.589,3681 334,3681 C338.411,3681 342,3684.589 342,3689 C342,3693.411 338.411,3697 334,3697 M334,3679 C328.477,3679 324,3683.477 324,3689 C324,3694.523 328.477,3699 334,3699 C339.523,3699 344,3694.523 344,3689 C344,3683.477 339.523,3679 334,3679"
							id="record-[#982]"
						/>
					</G>
				</G>
			</G>
		</G>
	</Svg>
);
export default Record;
