export default async function createInviteCode(profileId: string): Promise<void> {
	try {
		await fetch("https://lensplay-api.vercel.app/api/invites/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				profileId,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
