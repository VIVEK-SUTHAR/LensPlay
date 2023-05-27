/**
 *
 * @param oldProfileData Old Profile Metadata of User
 * @param newProfileData Updated Profile Metadata of User
 * @param socialLinks Updated Social Links
 * @param coverUri Uri of cover uploaded to ipfs/arweave
 * @returns id Arweave txn id
 */

import { type Profile } from "../types/generated";

export interface UserData {
	name: string;
	bio: string;
}

export interface SocialLinks {
	twitter: string;
	instagram: string;
	youtube: string;
	website: string;
}

async function uploadProfileMetadata(
	oldProfileData: Profile | undefined,
	newProfileData: UserData,
	socialLinks: SocialLinks,
	coverUri: string
): Promise<void> {
	try {
		const headersList = {
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = JSON.stringify({
			oldProfileData,
			newProfileData,
			socialLinks,
			coverImage: coverUri,
		});

		const response = await fetch("https://lensplay-api.vercel.app/api/upload/profileMetadata", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});

		if (response.ok) {
			const jsondata = await response.json();
			return jsondata;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wromg");
		}
	}
}
export default uploadProfileMetadata;
