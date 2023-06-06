import { LENSPLAY_API } from "constants/index";
import Logger, { BgColors } from "utils/logger";

export default async function getWatchLaters(profileId: string) {
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		const rawBody = JSON.stringify({
			profileId: profileId,
		});
		const startTime = Date.now();
		const apiResponse = await fetch(`${LENSPLAY_API}watchlater/get`, {
			method: "POST",
			headers,
			body: rawBody,
		});
		if (apiResponse.ok) {
			const endTime = Date.now();
			const callTime = endTime - startTime;
			const jsonRes = await apiResponse.json();
			Logger.Count("LP API Response in", callTime / 1000, "second");
			return jsonRes.items.reverse();
		}
	} catch (error) {
		Logger.Log("Failed to add watch later", error);
	}
}
