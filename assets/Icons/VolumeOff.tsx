import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const VolumeOff = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="#000000" {...props}>
		<G id="SVGRepo_bgCarrier" strokeWidth={0} />
		<G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<G id="SVGRepo_iconCarrier">
			<G id="\u9875\u9762-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
				<G id="Media" transform="translate(-672.000000, -144.000000)" fillRule="nonzero">
					<G id="volume_off_fill" transform="translate(672.000000, 144.000000)">
						<Path
							d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
							id="MingCute"
							fillRule="nonzero"
						/>
						<Path
							d="M4.59599,8.00003 L15,18.404 L15,19.8057 C15,20.7004 13.9887,21.2209 13.2606,20.7008 L6.67953,16 L4,16 C2.89543,16 2,15.1046 2,14 L2,10 C2,8.89546 2.89543,8.00003 4,8.00003 L4.59599,8.00003 Z M15,4.19435 L15,13.5857 L16.1133,14.6989 C15.9251182,14.3389909 15.9730521,13.8927182 16.2448552,13.5804424 L16.3331,13.491 C16.7438,13.1234 17,12.5923 17,12 C17,11.46702 16.792478,10.983531 16.4515733,10.6241826 L16.3331,10.5091 C15.9216,10.1407 15.8865,9.50853 16.2549,9.097 C16.6232,8.68548 17.2554,8.65045 17.6669,9.01878 C18.4836,9.74978 19,10.8153 19,12 C19,13.1848 18.4836,14.2503 17.6669,14.9813 C17.3478,15.2669 16.8959,15.31 16.5373,15.1229 L18.0072,16.5929 C17.9694,16.2796 18.0801,15.9535 18.3331,15.7271 C19.3576,14.8102 20,13.4808 20,12 C20,10.5193 19.3576,9.18993 18.3331,8.27297 C17.9216,7.90464 17.8865,7.27244 18.2549,6.86092 C18.6232,6.44939 19.2554,6.41437 19.6669,6.7827 C21.0974,8.06302 22,9.92678 22,12 C22,14.0733 21.0974,15.9371 19.6669,17.2174 C19.4436,17.4173 19.1552,17.4984 18.8793,17.465 L20.4854,19.071 C20.8759,19.4616 20.8759,20.0947 20.4854,20.4853 C20.0949,20.8758 19.4617,20.8758 19.0712,20.4853 L3.51482,4.92891 C3.12429,4.53838 3.12429,3.90522 3.51482,3.51469 C3.90534,3.12417 4.53851,3.12417 4.92903,3.51469 L8.27485,6.86052 L13.2606,3.29924 C13.9887,2.7792 15,3.29964 15,4.19435 Z"
							id="\u5F62\u72B6"
							fill="#ffffff"
						/>
					</G>
				</G>
			</G>
		</G>
	</Svg>
);
export default VolumeOff;
