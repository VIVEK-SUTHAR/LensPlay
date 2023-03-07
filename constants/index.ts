//Lens Protocol
const LENS_API_ENDPOINT = "https://api-mumbai.lens.dev/";
const IS_MAINNET = false;
//Application
const APP_ID = "lensplay";

const APP_NAME = "LensPlay";

const DESCRIPTION =
	"LensPlay is a decentralized mobile-first video-sharing application built on top of Lens Protocol ";

const APP_LOGO = "FINAL HONE KE BAD YAHA DAL DENA KOI";

//Storage
const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const ARWEAVE_GATEWAY = "https://arweave.net";

//UPLOAD_APIS
const IPFS_UPLOAD_API = "https://api.web3.storage/upload";
const BUNDLR_UPLOAD_API = "https://bundlr-upload-server.vercel.app/api/upload";

//Static Media
const STATIC_ASSET =
	"https://lens.infura-ipfs.io/ipfs/bafybeibv2kpqpjtvuj5uprvq6knnr2reb7ylq3o4bnypqjioqgxmjw2akq/5460475.webp";

//Regular Expressions
const URL_REGEX =
	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ADDRESS_REGEX = /^(0x)?[\da-f]{40}$/i;

const MENTION_REGEX = /(@[^\s]+)/g;

// SOCIALS
export const OFFICIAL_EMAIL = "lensplay.ac@gmail.com";
export const LENSPLAY_TWITTER = "https://twitter.com/lensplayxyz";
export const LENSPLAY_DISCORD = "https://discord.gg/tgrzS4Actz";
export const LENSPLAY_SITE = "https://lensplay.xyz/";
export const LENSPLAY_PRIVACY =
	"https://island-hat-05d.notion.site/LensPlay-Privacy-Policy-bc6f36fa5434481bb3b57bf79f1e552d";
export const LENSPLAY_TERMS =
	"https://lensplay.notion.site/LensPlay-T-C-9bfb64c235d9421fa397230c3594afe0";

//MISC
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export {
	LENS_API_ENDPOINT,
	IPFS_GATEWAY,
	APP_ID,
	STATIC_ASSET,
	URL_REGEX,
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
