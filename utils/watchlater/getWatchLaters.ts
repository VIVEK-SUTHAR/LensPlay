import { LENSPLAY_API } from "constants/index";
import Logger from "utils/logger";

export default async function getWatchLaters(profileId: string) {
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		const rawBody = JSON.stringify({
			profileId: profileId,
		});

		const apiResponse = await fetch(`${LENSPLAY_API}watchlater/get`, {
			method: "POST",
			headers,
			body: rawBody,
		});

		if (apiResponse.ok) {
			const jsonRes = await apiResponse.json();
			return jsonRes.items;
		}
	} catch (error) {
		Logger.Log("Failed to add watch later", error);
	}
}
