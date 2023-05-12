export default async function createInviteCode(profileId: string) {
  try {
    const apiResponse = await fetch(
      "https://lensplay-api.vercel.app/api/invites/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: profileId,
        }),
      }
    );
    const jsonRes = await apiResponse.json();
  } catch (error) {
    console.log(error);
  }
}
