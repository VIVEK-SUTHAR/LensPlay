import { STATIC_ASSET } from 'constants/index';
import { EncryptableImageSet, Maybe, ProfilePicture } from "customTypes/generated";

function getRawurl(originalMediaObject: Maybe<ProfilePicture> | Maybe<EncryptableImageSet> | undefined) {
    if (typeof originalMediaObject === "undefined") {
        return STATIC_ASSET;
    }

    if (originalMediaObject?.__typename === "ImageSet" || originalMediaObject?.__typename === "EncryptableImageSet") {
        return originalMediaObject?.optimized?.uri || originalMediaObject?.raw?.uri;
    }

    if (originalMediaObject?.__typename === "NftImage") {
        return originalMediaObject?.image?.optimized?.uri || originalMediaObject?.image?.raw?.uri;
    }

}
export default getRawurl;