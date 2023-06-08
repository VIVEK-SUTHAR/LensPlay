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
					token: "33a7ed7c61c940384d30edaf7d54d663",
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
