/**
 *
 * @param profileId profileId of the user
 * @param creatorId profileId of the creator
 * @param pubId publicationId of the video
 * @param message message
 * @param amount amount
 * @returns a message about the successfull donation
 */

import { LENSPLAY_POSTGRES_API } from "constants/index";
import { Scalars } from "customTypes/generated";

async function donate(
	profileId: Scalars["ProfileId"],
	creatorId: Scalars["ProfileId"],
	pubId: Scalars["PublicationId"],
	message: string,
	amount: Number
) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
		};

		const bodyContent = JSON.stringify({
			profileId,
			creatorId,
			pubId,
			message,
			amount,
		});

		const response = await fetch(`${LENSPLAY_POSTGRES_API}/donate`, {
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
export default donate;
