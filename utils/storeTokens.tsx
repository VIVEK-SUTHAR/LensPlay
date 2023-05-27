import AsyncStorage from "@react-native-async-storage/async-storage";

const storeTokens = async (
	accessToken: string,
	refreshToken: string,
	viaDesktop?: boolean
): Promise<void> => {
	try {
		const tokens = {
			accessToken,
			refreshToken,
			generatedTime: new Date().getTime(),
			viaDesktop,
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
