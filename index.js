import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";
import App from "./App";
import Logger from "utils/logger";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	Logger.Count("here", remoteMessage);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
	// Check if the user pressed the "Mark as read" action
	if (type === EventType.ACTION_PRESS) {
		// Update external API
		console.log("here");
	}
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
