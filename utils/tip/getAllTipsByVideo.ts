/**
 *
 * @param profileId profileId of the user
 * @returns lists of all the user's videos that has got tip
 */

import { LENSPLAY_POSTGRES_API } from "constants/index";
import { Scalars } from "customTypes/generated";

async function getAllTipsByVideo(profileId: Scalars["ProfileId"]) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};

		const bodyContent = JSON.stringify({
			profileId: profileId,
		});

		const response = await fetch(`${LENSPLAY_POSTGRES_API}/getAllTipsByVideo`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const jsonRes = await response.json();
			return jsonRes;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default getAllTipsByVideo;
