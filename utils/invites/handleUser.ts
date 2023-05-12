import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function handleUser(profileId: string) {
  try {
    //isAlready user or not

    const isUserRes = await fetch(
      "https://lensplay-api.vercel.app/api/user/checkUser",
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
    const isUser = await isUserRes.json();

    //hasInvitecodes or not

    const hasInviteRes = await fetch(
      "https://lensplay-api.vercel.app/api/invites/checkInvite",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: profileId,
        }),
      }
    );
    const hasInvite = await hasInviteRes.json();

    if (isUserRes.status === 200 && hasInviteRes.status === 200) {
      await AsyncStorage.setItem(
        "@user_data",
        JSON.stringify({
          createdAt: isUser?.message?.created_at,
          hasInviteCodes: hasInvite.found,
        })
      );
      return true;
    }
    if (!isUser?.message?.id) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
