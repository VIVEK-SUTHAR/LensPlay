import AsyncStorage from "@react-native-async-storage/async-storage";

const storeTokens = async (
  accessToken: string,
  refreshToken: string,
  viaDesktop?: boolean
) => {
  try {
    const tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      generatedTime: new Date().getTime(),
      viaDesktop: viaDesktop,
    };
    const jsonValue = JSON.stringify(tokens);
    await AsyncStorage.setItem("@user_tokens", jsonValue);
  } catch (error) {
    if (error instanceof Error) {
      // console.log("[Error]:Error in store Tokens");
      // throw new Error("[Error]:Error in store Tokens", {
      //   cause: error,
      // });
    }
  }
};

export default storeTokens;
