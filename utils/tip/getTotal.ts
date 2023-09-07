/**
 *
 * @param profileId profileId of the user
 * @returns object containing total tips and donations of the user
 */

import { LENSPLAY_POSTGRES_API } from "constants/index";
import { Scalars } from "customTypes/generated";
import Logger from "utils/logger";

async function getTotal(profileId: Scalars["ProfileId"]) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};

		const bodyContent = JSON.stringify({
			profileId: profileId,
		});

		const response = await fetch(`${LENSPLAY_POSTGRES_API}/getTotal`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const jsonRes = await response.json();
			return jsonRes?.totalTips[0];
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default getTotal;
