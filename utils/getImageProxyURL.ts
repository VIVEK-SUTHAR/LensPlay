import { DEV } from "./../constants/index";
import Logger from "./logger";
/**
 *
 * @param formattedLink Publicly Avilable Image Link,can be IPFS,Arweave or Your S3 or Blob storage Link
 * @param imageOptions? image option for transformations
 * @returns A CDN link of given image for faster loading(By default .webp format)
 */

type ImageProxyOptions = {
  formattedLink: string;
  options?: { height?: number; width?: number; blurAmount?: number };
};
function getImageProxyURL({ formattedLink, options }: ImageProxyOptions) {
  const IMAGE_KIT_PREFIX = "https://ik.imagekit.io/4uh8nmwsx/";
  const FORMATTED_LINK = formattedLink;
  let imageOptions = {
    w: options?.width,
    h: options?.height,
    bl: options?.blurAmount,
  };
  const ImageOptionsString = `tr=w-${imageOptions.w},h-${imageOptions.h},bl-${imageOptions.bl},f-webp`;
  const CDN_LINK = `${IMAGE_KIT_PREFIX}${FORMATTED_LINK}?${ImageOptionsString}`;
  return DEV ? formattedLink : CDN_LINK;
}

export default getImageProxyURL;
