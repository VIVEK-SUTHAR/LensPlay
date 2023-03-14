import AsyncStorage from "@react-native-async-storage/async-storage";

const storeTokens = async (accessToken: string, refreshToken: string) => {
  try {
    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      generatedTime: new Date().getTime(),
    };
    const jsonValue = JSON.stringify(tokens);
    await AsyncStorage.setItem("@user_tokens", jsonValue);
  } catch (error) {
    console.log("[Error]:Error in store Tokens");
    throw new Error("[Error]:Error in store Tokens", {
      cause: error,
    });
  }
};

export default storeTokens;
