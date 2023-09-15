import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Mail = (props: SvgProps) => (
	<Svg viewBox="0 0 512 512" fill="#000000" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
				<G id="mail-filled-white" fill="#ffffff" transform="translate(42.686667, 85.339333)">
					<Path
						d="M3.55271368e-14,28.7 L213.333914,220.70134 L426.667,28.701 L426.667248,341.333608 L0.00058094128,341.333608 L3.55271368e-14,28.7 Z M394.776,1.42108547e-14 L213.333914,163.285608 L31.89,1.42108547e-14 L394.776,1.42108547e-14 Z"
						id="Combined-Shape"
					/>
				</G>
			</G>
		</G>
	</Svg>
);
export default Mail;
