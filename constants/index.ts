import { Platform } from 'react-native';
//Lens Protocol
const LENS_API_ENDPOINT = "https://api-mumbai.lens.dev/";
export const LENS_CLAIM_SITE = "https://claim.lens.xyz/";

const IS_MAINNET = true;
//Application
const APP_ID = "LensPlay";

const APP_NAME = "LensPlay";

const DESCRIPTION =
	"LensPlay is a decentralized mobile-first video-sharing application built on top of Lens Protocol ";

const APP_LOGO = "FINAL HONE KE BAD YAHA DAL DENA KOI";

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

//Storage
const IPFS_FREE_UPLOAD_LIMIT = IS_MAINNET ? 5000 : 100;
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const ARWEAVE_GATEWAY = "https://arweave.net";

//LENSPLAY-API's
export const LENSPLAY_API = "https://lensplay-api.vercel.app/api/";

//UPLOAD_APIS
const IPFS_UPLOAD_API = "https://api.web3.storage/upload";
const BUNDLR_UPLOAD_API = "https://bundlr-upload-server.vercel.app/api/upload";
export const LIVEPEER_API_URL = "https://livepeer.studio/api";

//Static Media
const STATIC_ASSET =
	"https://lens.infura-ipfs.io/ipfs/bafybeibv2kpqpjtvuj5uprvq6knnr2reb7ylq3o4bnypqjioqgxmjw2akq/5460475.webp";

//API_TOKENS
// export const LIVEPEER_API_TOKEN = "57f82e71-546c-4bf3-861a-9cdd56d97677";
export const LIVEPEER_API_TOKEN = "8d89f7e5-9b5a-416e-94bc-50c4e87a07f2";

//Regular Expressions
const URL_REGEX =
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;

const MENTION_REGEX = /(@[^\s]+)/g;

// SOCIALS
export const OFFICIAL_EMAIL = "lensplay.ac@gmail.com";
export const LENSPLAY_TWITTER = "https://twitter.com/lensplayxyz";
export const LENSPLAY_DISCORD = "https://discord.gg/tgrzS4Actz";
export const LENSPLAY_SITE = "https://lensplay.xyz";
export const LENSPLAY_PRIVACY =
	"https://lensplay.notion.site/LensPlay-Privacy-Policy-22ec19b6e61344c6bd0254dd9ff2d05e";
export const LENSPLAY_TERMS =
	"https://lensplay.notion.site/LensPlay-T-C-9bfb64c235d9421fa397230c3594afe0";

//MISC
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SOURCES = ["lensplay", "lenstube", "orb", "buttrfly"];

export const DEV = __DEV__;



export {
	LENS_API_ENDPOINT,
	IPFS_GATEWAY,
	APP_ID,
	STATIC_ASSET,
	URL_REGEX,
	IPFS_FREE_UPLOAD_LIMIT,
	ADDRESS_REGEX,
	APP_LOGO,
	IS_MAINNET,
	BUNDLR_UPLOAD_API,
	IPFS_UPLOAD_API,
	APP_NAME,
	DESCRIPTION,
	ARWEAVE_GATEWAY,
	MENTION_REGEX,
};
