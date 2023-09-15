import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const HomeOutlined = (props: SvgProps) => (
	<Svg fill="#ffffff" viewBox="0 0 512 512" stroke="#ffffff" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Path
				fillRule="evenodd"
				d="M192,1.42108547e-14 L384,153.6 L384,384 L213.333333,384 L213.333333,277.333333 L170.666667,277.333333 L170.666667,384 L1.42108547e-14,384 L1.42108547e-14,153.6 L192,1.42108547e-14 Z M192,53.3333333 L42.6666667,170.666667 L42.6666667,341.333333 L128,341.333333 L128,234.666667 L256,234.666667 L256,341.333333 L341.333333,341.333333 L341.333333,170.666667 L192,53.3333333 Z"
				transform="translate(64 64)"
			/>
		</G>
	</Svg>
);
export default HomeOutlined;
