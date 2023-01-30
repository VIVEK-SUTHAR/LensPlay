//Lens Protocol
const LENS_API_ENDPOINT = "https://api-mumbai.lens.dev/";

//Application
const APP_ID = "lensplay";

const APP_NAME = "LensPlay";

const DESCRIPTION =
  "LensPlay is a decentralized mobile-first video-sharing application built on top of Lens Protocol ";

const APP_LOGO = "FINAL HONE KE BAD YAHA DAL DENA KOI";

//Storage
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const ARWEAVE_GATEWAY = "https://arweave.net";

//Static Media
const STATIC_ASSET =
  "https://lens.infura-ipfs.io/ipfs/bafybeibv2kpqpjtvuj5uprvq6knnr2reb7ylq3o4bnypqjioqgxmjw2akq/5460475.webp";

//Regular Expressions
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;

const MENTION_REGEX = /(@[^\s]+)/g;
// Misc
export const OFFICIAL_EMAIL = "contactweb3devs@gmail.com";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export {
  LENS_API_ENDPOINT,
  IPFS_GATEWAY,
  APP_ID,
  STATIC_ASSET,
  URL_REGEX,
  ADDRESS_REGEX,
  APP_LOGO,
  APP_NAME,
  DESCRIPTION,
  ARWEAVE_GATEWAY,
  MENTION_REGEX,
};
