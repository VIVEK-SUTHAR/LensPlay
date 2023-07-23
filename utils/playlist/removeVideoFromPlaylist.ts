/**
 *
 * @param profileId profileId of the user
 * @param name name of the playlist
 * @param cover cover for the playlist
 * @returns playlistId of the created playlist
 */

import { LENSPLAY_API, LENSPLAY_WEAVE_API } from "constants/index";
import { Scalars } from "customTypes/generated";
import Logger from "utils/logger";

async function removeVideoFromPlaylist(playlistId: string, publicationId: Scalars["PublicationId"] ) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			Authorization:"Bearer ENGINEERCANTAKEOVERWORLD"
		};

		const bodyContent = JSON.stringify({
            playlistId: playlistId,
            publicationId: publicationId
		});

		const response = await fetch(`${LENSPLAY_WEAVE_API}weavedb/removeVideoFromPlaylist`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {    
			const jsondata = await response.text();
            Logger.Success(jsondata);
            return jsondata;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default removeVideoFromPlaylist;
