/**
 *
 * @param profileId profileId of the user
 * @returns lists of all the playlists of that user
 */

import { LENSPLAY_API, LENSPLAY_WEAVE_API } from "constants/index";
import { Scalars } from "customTypes/generated";

async function getAllVideos(playListId:string) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			Authorization:"Bearer ENGINEERCANTAKEOVERWORLD"
		};

		const bodyContent = JSON.stringify({
			playlistId: playListId,
		});
        
		const response = await fetch(`${LENSPLAY_WEAVE_API}weavedb/getAllVideos`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		
		if (response.ok) {
			console.log('ayaaa',response);
			const jsondata = await response.json();
			console.log('hello',jsondata.data[0]);
            return jsondata?.data;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default getAllVideos;
