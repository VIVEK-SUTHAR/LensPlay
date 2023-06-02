import { LENSPLAY_API } from "constants/index";
import { useProfile } from "store/Store";
import Logger from "utils/logger";

export default async function getWatchLaters() {
	const { currentProfile } = useProfile();
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		const rawBody = JSON.stringify({
			profileId: currentProfile?.id,
		});

		const apiResponse = await fetch(`${LENSPLAY_API}watchlater/add`, {
			method: "POST",
			headers,
			body: rawBody,
		});
		if (apiResponse.ok) {
			const jsonRes = await apiResponse.json();
			return jsonRes;
		}
	} catch (error) {
		Logger.Log("Failed to add watch later", error);
	}
}
