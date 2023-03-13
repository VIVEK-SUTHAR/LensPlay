import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (
  accessToken: string,
  refreshToken: string,
  profileId: string | undefined
) => {
  try {
    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      profileId: profileId,
      generatedTime: new Date().getTime(),
    };
    const jsonValue = JSON.stringify(tokens);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    //   updateTokens();
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export default storeData;
