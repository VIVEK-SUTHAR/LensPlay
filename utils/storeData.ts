import AsyncStorage from "@react-native-async-storage/async-storage";


const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      const tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
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