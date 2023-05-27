import { STATIC_ASSET } from "../constants";
import { type Maybe, type ProfileMedia } from "../types/generated";

function getRawurl(originalMediaObject: Maybe<ProfileMedia> | undefined): any {
	if (typeof originalMediaObject === "undefined") {
		return STATIC_ASSET;
	}

	if (originalMediaObject?.__typename === "MediaSet") {
		return Boolean(originalMediaObject?.optimized?.url) || originalMediaObject?.original?.url;
	}
	if (originalMediaObject?.__typename === "NftImage") {
		return originalMediaObject?.uri;
	}
}
export default getRawurl;
