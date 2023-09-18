import * as React from "react";
import Svg, { SvgProps, G, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */
const Dislike = (props: SvgProps) => (
	<Svg viewBox="0 -0.5 21 21" fill="#000000" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<Defs />
			<G id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
				<G
					id="Dribbble-Light-Preview"
					transform="translate(-139.000000, -760.000000)"
					fill={props.color}
				>
					<G id="icons" transform="translate(56.000000, 160.000000)">
						<Path
							d="M101.900089,600 L99.8000892,600 L99.8000892,611.987622 L101.900089,611.987622 C103.060339,611.987622 104.000088,611.093545 104.000088,609.989685 L104.000088,601.997937 C104.000088,600.894077 103.060339,600 101.900089,600 M87.6977917,600 L97.7000896,600 L97.7000896,611.987622 L95.89514,618.176232 C95.6819901,619.491874 94.2455904,620.374962 92.7902907,619.842512 C91.9198408,619.52484 91.400091,618.66273 91.400091,617.774647 L91.400091,612.986591 C91.400091,612.43516 90.9296911,611.987622 90.3500912,611.987622 L85.8728921,611.987622 C84.0259425,611.987622 82.6598928,610.35331 83.0746427,608.641078 L84.8995423,602.117813 C85.1998423,600.878093 86.360092,600 87.6977917,600"
							id="dislike-[#ffffff1388]"
						/>
					</G>
				</G>
			</G>
		</G>
	</Svg>
);
export default Dislike;