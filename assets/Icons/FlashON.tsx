import * as React from "react";
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg";

const FlashON = (props: SvgProps) => (
	<Svg fill="#000000" viewBox="0 0 24 24" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G data-name="Layer 2">
				<G data-name="flash">
					<Rect width={24} height={24} opacity={0} />
					<Path d="M11.11 23a1 1 0 0 1-.34-.06 1 1 0 0 1-.65-1.05l.77-7.09H5a1 1 0 0 1-.83-1.56l7.89-11.8a1 1 0 0 1 1.17-.38 1 1 0 0 1 .65 1l-.77 7.14H19a1 1 0 0 1 .83 1.56l-7.89 11.8a1 1 0 0 1-.83.44z" />
				</G>
			</G>
		</G>
	</Svg>
);

export default FlashON;
