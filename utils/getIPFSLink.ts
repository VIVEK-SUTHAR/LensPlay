/**
 *
 * @param url unformatted url containing ipfs hash
 * @returns https accessable URL
 * @supports Filecoin,IPFS,Arweave CID
 */

import { ARWEAVE_GATEWAY, IPFS_GATEWAY } from "../constants";

function getIPFSLink(url: string): string {
  if (!url) return url;
  const LINK = url?.includes(ARWEAVE_GATEWAY)
    ? url
    : url?.includes("ipfs://")
    ? `${IPFS_GATEWAY}${url?.split("//")[1]}`
    : url;
  return LINK;
}
export default getIPFSLink;
