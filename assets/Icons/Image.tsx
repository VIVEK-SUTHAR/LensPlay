import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Image = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10ZM10.3536 13.3536L12.5 15.5L18.1464 9.85355C18.4614 9.53857 19 9.76165 19 10.2071V19H5V18L9.64645 13.3536C9.84171 13.1583 10.1583 13.1583 10.3536 13.3536Z"
				fill={props.color ? props.color : "#fffffff"}
			/>
		</G>
	</Svg>
);
export default Image;