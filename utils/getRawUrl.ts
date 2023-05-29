import { STATIC_ASSET } from "constants/index";
import type { Maybe, ProfileMedia } from "customTypes/generated";

function getRawurl(originalMediaObject: Maybe<ProfileMedia> | undefined) {
	if (typeof originalMediaObject === "undefined") {
		return STATIC_ASSET;
	}

	if (originalMediaObject?.__typename === "MediaSet") {
		return originalMediaObject?.optimized?.url || originalMediaObject?.original?.url;
	}
	if (originalMediaObject?.__typename === "NftImage") {
		return originalMediaObject?.uri;
	}
}
export default getRawurl;
