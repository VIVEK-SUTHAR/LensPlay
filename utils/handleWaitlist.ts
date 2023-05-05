import AsyncStorage from "@react-native-async-storage/async-storage";
import searchUser from "../api/zooTools/searchUser";

export default async function handleWaitlist(address: string) {
  try {
    const userData = await searchUser(address);
    const handleUser = {
      address: userData.cryptoAddress,
    };
    await AsyncStorage.setItem("@waitlist", JSON.stringify(handleUser));
    return userData;
  } catch (error) {
    // console.log("[Error]:Error in checking waitlist");
  }
}
