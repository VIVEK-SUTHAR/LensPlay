import AsyncStorage from "@react-native-async-storage/async-storage";
import searchUser from "../api/zooTools/searchUser";
import getDefaultProfile from "./lens/getDefaultProfile";

export default async function handleWaitlist(navigation, address: string) {
  try {
    const access = await searchUser(address);
    if (!(access.statusCode === 404)) {
      const handleUser = {
        address: access.cryptoaddress,
        hasAccess: access.fields.hasAccess,
      };
      await AsyncStorage.setItem("@waitlist", JSON.stringify(handleUser));
      if (access.fields.hasAccess) {
        return true;
      }
      if (!access.fields.hasAccess) {
        navigation.push("LeaderBoard", {
          referralsCount: access.referralsCount,
          rankingPoints: access.rankingPoints,
          rankingPosition: access.rankingPosition,
          refferalLink: `https://form.waitlistpanda.com/go/${access.listId}?ref=${access.id}`,
        });
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log("[Error]:Error in checking waitlist");
    throw new Error("[Error]:Error in checking waitlist", {
      cause: error,
    });
  }
}
