import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const NotificationsOutlined = (props: SvgProps) => (
	<Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
		<Path
			d="M48.4945 8.36996C31.6539 9.16316 18.75 23.6321 18.75 40.3768V55.5176L13.2284 66.626C13.2186 66.6462 13.2091 66.6666 13.1999 66.687C10.9785 71.411 14.5744 77.0833 19.7957 77.0833H37.5C37.5 83.9497 43.1336 89.5833 50 89.5833C56.8664 89.5833 62.5 83.9497 62.5 77.0833H80.2002C85.4215 77.0833 89.022 71.4121 86.8001 66.687C86.7909 66.6666 86.7814 66.6462 86.7716 66.626L81.25 55.5176V39.5833C81.25 21.8621 66.3819 7.52785 48.4945 8.36996ZM48.7874 14.6118C63.2042 13.9331 75 25.3379 75 39.5833V56.25C74.9996 56.7328 75.111 57.2091 75.3255 57.6416L81.1442 69.3522C81.5184 70.1542 81.0855 70.8333 80.2002 70.8333H19.7957C18.9105 70.8333 18.4811 70.1554 18.8558 69.3522V69.3481L24.6745 57.6416C24.889 57.2091 25.0004 56.7328 25 56.25V40.3768C25 26.834 35.3738 15.2436 48.7874 14.6118ZM43.75 77.0833H56.25C56.25 80.5711 53.4878 83.3333 50 83.3333C46.5122 83.3333 43.75 80.5711 43.75 77.0833Z"
			fill="white"
		/>
	</Svg>
);
export default NotificationsOutlined;
