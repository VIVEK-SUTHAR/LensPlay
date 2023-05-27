import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function createUser(
	profileId: string,
	address: string,
	invitedBy: string
): Promise<boolean | undefined> {
	try {
		const apiResponse = await fetch("https://lensplay-api.vercel.app/api/user/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				profileId,
				address,
				invitedBy,
			}),
		});
		const jsonRes = await apiResponse.json();
		if (apiResponse.status === 200) {
			await AsyncStorage.setItem(
				"@user_data",
				JSON.stringify({
					createdAt: jsonRes?.message?.created_at,
					hasInviteCodes: false,
				})
			);
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
}
