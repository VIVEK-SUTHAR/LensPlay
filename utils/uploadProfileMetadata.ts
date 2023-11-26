/**
 *
 * @param oldProfileData Old Profile Metadata of User
 * @param newProfileData Updated Profile Metadata of User
 * @param socialLinks Updated Social Links
 * @param coverUri Uri of cover uploaded to ipfs/arweave
 * @returns id Arweave txn id
 */

export type UserData = {
	name: string;
	bio: string;
};

export type SocialLinks = {
	twitter: string;
	instagram: string;
	youtube: string;
	website: string;
};

import { ProfileMetadata } from "@lens-protocol/metadata/*";
import { Profile } from "../types/generated";
import Logger from "./logger";

async function uploadProfileMetadata(metadata: ProfileMetadata) {
	try {
		const headersList = {
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = JSON.stringify({
			metadata,
		});

		const response = await fetch("https://lensplay-api.vercel.app/api/upload/metadatav2", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});

		if (response.ok) {
			const jsondata = await response.json();
			Logger.Log("this is metadat uri", jsondata);
			return jsondata;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wromg");
		}
	}
}
export default uploadProfileMetadata;
