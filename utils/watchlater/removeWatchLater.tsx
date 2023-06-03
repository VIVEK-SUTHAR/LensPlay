import { LENSPLAY_API } from "constants/index";
import Logger from "utils/logger";

export default async function removeWatchLater(profileId: string, pubId: string) {
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		const rawBody = JSON.stringify({
			pubId: pubId,
			profileId: profileId,
		});

		const apiResponse = await fetch(`${LENSPLAY_API}watchlater/remove`, {
			method: "POST",
			headers,
			body: rawBody,
		});
		if (apiResponse.ok) {
			const jsonRes = await apiResponse.json();
			return jsonRes;
		}
	} catch (error) {
		Logger.Log("Failed to delete watch later", error);
		throw new Error("Failed to delete watch later");
	}
}
