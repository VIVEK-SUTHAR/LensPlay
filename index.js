/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
const { Platform } = require("react-native");

if (Platform.OS !== "web") {
	require("./global");
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log("Message handled in the background!", remoteMessage);
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
	// Check if the user pressed the "Mark as read" action
	if (type === EventType.ACTION_PRESS) {
		// Update external API
		console.log("here");
	}
});

const { registerRootComponent } = require("expo");
const { default: App } = require("./App");

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
