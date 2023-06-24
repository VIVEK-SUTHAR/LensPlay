import * as React from "react";
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg";
const FlashOFF = (props: SvgProps) => (
	<Svg fill="#000000" viewBox="0 0 24 24" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G data-name="Layer 2">
				<G data-name="flash-off">
					<Rect width={24} height={24} opacity={0} />
					<Path d="M17.33 14.5l2.5-3.74A1 1 0 0 0 19 9.2h-5.89l.77-7.09a1 1 0 0 0-.65-1 1 1 0 0 0-1.17.38L8.94 6.11z" />
					<Path d="M6.67 9.5l-2.5 3.74A1 1 0 0 0 5 14.8h5.89l-.77 7.09a1 1 0 0 0 .65 1.05 1 1 0 0 0 .34.06 1 1 0 0 0 .83-.44l3.12-4.67z" />
					<Path d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
				</G>
			</G>
		</G>
	</Svg>
);
export default FlashOFF;
