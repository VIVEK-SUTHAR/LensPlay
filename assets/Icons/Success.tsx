import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Success = (props: SvgProps) => (
	<Svg
		fill={props.color ? props.color : "#ffffff"}
		viewBox="0 0 24 24"
		id="d9090658-f907-4d85-8bc1-743b70378e93"
		data-name="Livello 1"
		{...props}
	>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Path
				id="70fa6808-131f-4233-9c3a-fc089fd0c1c4"
				data-name="done circle"
				d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z"
			/>
		</G>
	</Svg>
);
export default Success;
