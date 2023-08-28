import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import handleNotifications from "utils/notifications/handleNotifications";
import linking from "./LinkingConfiguration";
import StackNavigation from "./StackNavigation";

export default function Navigation() {
	const navRef = React.useRef();

	React.useEffect(() => {
		const unsubscribe = handleNotifications(navRef);
		return unsubscribe;
	}, []);

	return (
		<NavigationContainer linking={linking} ref={navRef}>
			<StackNavigation />
		</NavigationContainer>
	);
}
