/**
 *
 * @param profileId profileId of the user
 * @param name name of the playlist
 * @param cover cover for the playlist
 * @returns playlistId of the created playlist
 */

import { LENSPLAY_API } from "constants/index";
import { Scalars } from "customTypes/generated";
import Logger from "utils/logger";

async function createPlaylist( profileId: Scalars["ProfileId"], name: string, cover: string ) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			Authorization:"Bearer ENGINEERCANTAKEOVERWORLD"
		};

		const bodyContent = JSON.stringify({
			profileId: profileId,
            name: name,
            cover: cover
		});

		const response = await fetch(`http://192.168.123.216:3000/api/weavedb/createPlaylist`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const jsondata = await response.json();
            Logger.Success(jsondata);
            return jsondata.playlistId;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default createPlaylist;
