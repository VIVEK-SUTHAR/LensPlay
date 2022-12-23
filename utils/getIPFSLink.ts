function getIPFSLink(url: string): string {
  if (!url) return url;
  const LINK = url?.includes("https://arweave.net")
    ? url
    : url?.includes("ipfs://")
    ? `https://ipfs.io/ipfs/${url?.split("//")[1]}`
    : url;
  return LINK;
}
export default getIPFSLink;
