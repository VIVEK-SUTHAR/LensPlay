import Logger from "utils/logger";
import StorageKeys from "constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEV } from "constants/index";

async function TrackAction(event: string) {
	if (DEV) return;
	const profileId = await AsyncStorage.getItem(StorageKeys.ProfileId);
	const options = {
		method: "POST",
		headers: { "accept": "text/plain", "content-type": "application/json" },
		body: JSON.stringify([
			{
				properties: {
					token: "f8ec6bd7117b1fa0deb1e2de90680036",
					profileId: profileId ? profileId : "",
				},
				event: event,
			},
		]),
	};

	fetch("https://api.mixpanel.com/track", options)
		.then((res) => Logger.Log("Event Tracked"))
		.catch((err) => Logger.Error("Failed to track", event));
}
export default TrackAction;
