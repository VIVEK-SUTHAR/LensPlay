import { DEV } from "constants/index";
/**
 *
 * @param formattedLink Publicly Avilable Image Link,can be IPFS,Arweave or Your S3 or Blob storage Link
 * @param imageOptions? image option for transformations
 * @returns A CDN link of given image for faster loading(By default .webp format)
 */

type ImageProxyOptions = {
	formattedLink: string;
	options?: { height?: number; width?: number; format?: "webp" | "png" };
};
export enum LPImageFormat {
	"Webp" = "f-webp",
	"Png" = "f-png",
}
const IMAGE_KIT_PREFIX = "https://ik.imagekit.io/4uh8nmwsx/";

function getImageProxyURL({ formattedLink, options }: ImageProxyOptions) {
	let imageOptions = {
		w: options?.width,
		h: options?.height,
		format: options?.format === "png" ? "f-png" : "f-webp",
	};
	if (formattedLink.includes("lens/media-snapshot/")) {
		return `${formattedLink}?tr=w-${imageOptions.w},h-${imageOptions.h},f-webp`;
	}
	const FORMATTED_LINK = formattedLink;
	const ImageOptionsString = `tr=w-${imageOptions.w},h-${imageOptions.h},${options?.format}`;
	const CDN_LINK = `${IMAGE_KIT_PREFIX}${FORMATTED_LINK}?${ImageOptionsString}`;
	return CDN_LINK;
}

export default getImageProxyURL;
