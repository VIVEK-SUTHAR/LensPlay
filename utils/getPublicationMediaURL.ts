import { Post } from "customTypes/generated";
import getIPFSLink from "./getIPFSLink";
import Logger from "./logger";

let localVideosURLsArray: string[] = [];

function getPublicationMediaURL(publication: Post) {
	try {
		let playbackURL = "";
		if (publication?.metadata?.media[0]?.optimized?.url) {
			playbackURL = publication?.metadata?.media[0]?.optimized?.url;
		} else {
			playbackURL = getIPFSLink(publication?.metadata?.media[0].original?.url);
        }
        Logger.Warn("Playback URL", playbackURL)
        if (localVideosURLsArray.includes(playbackURL)) {
            const repeated = localVideosURLsArray.indexOf(playbackURL);
            console.log("repeated video url", localVideosURLsArray[repeated])
            if (localVideosURLsArray[repeated] === playbackURL) {
                console.log("sanneeeeee")
            }
        }
        localVideosURLsArray.push(playbackURL);
		return playbackURL;
	} catch (error) {}
}
export default getPublicationMediaURL