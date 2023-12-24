/**
 *
 * @param profileId profileId of the user
 * @param Token Latest FCM Token of the User
 * @returns a message about successfull update
 */

import { Scalars } from "customTypes/generated";
import Logger from "./logger";

async function updateTokenInCache(profileId: Scalars["ProfileId"], token: string) {
	try {
		const rawBody = {
			profileId: profileId,
			token: token,
		};
		Logger.Log("Getting execuyed");
		const apiResponse = await fetch(`http://notifications.lensplay.xyz/notificaton/updateCache`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rawBody),
		});
		if (apiResponse.ok) {
			Logger.Success("Tokens Updated in Redis Cache !");
		}
	} catch (error) {
		Logger.Error("Failed to Save Token in Cache");
	}
}

export default updateTokenInCache;
