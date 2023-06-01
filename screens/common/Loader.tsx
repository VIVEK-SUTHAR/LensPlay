import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Heading from "components/UI/Heading";
import { APP_OPEN } from "constants/tracking";
import { useRefreshTokensMutation, useVerifyTokensLazyQuery } from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useAuthStore, useProfile } from "store/Store";
import getDateDifference from "utils/generateDateDifference";
import createInviteCode from "utils/invites/createInviteCodes";
import handleUser from "utils/invites/handleUser";
import getDefaultProfile from "utils/lens/getDefaultProfile";
import Logger from "utils/logger";
import storeTokens from "utils/storeTokens";
import TrackAction from "utils/Track";

export default function Loader({ navigation }: RootStackScreenProps<"Loader">) {
	const { setCurrentProfile, currentProfile, setHasHandle } = useProfile();
	const { setAccessToken, setRefreshToken } = useAuthStore();
	const whiteBox = useSharedValue(1);
	const blackBox = useSharedValue(1);
	const image = useSharedValue(0);
	const textOpacity = useSharedValue(0);
	const { accounts } = useWalletConnect();

	const [verifyTokens, { data: isvalidTokens, error: verifyError, loading: verifyLoading }] =
		useVerifyTokensLazyQuery();

	const [getAccessFromRefresh, { data: newTokens, error, loading }] = useRefreshTokensMutation();

	async function HandleDefaultProfile(adress: string) {
		Logger.Warn("We are in Handle ");
		Logger.Warn("We are in Handle efault profile");
		Logger.Warn("Calling get default profile");
		const userDefaultProfile = await getDefaultProfile(adress);
		if (userDefaultProfile) {
			setHasHandle(true);
			setCurrentProfile(userDefaultProfile);
			Logger.Warn("Back to handle default profile with data", userDefaultProfile);
		} else {
			setHasHandle(false);
		}
	}

	async function handleInviteCode(created_at: string) {
		const dateDiff = getDateDifference(created_at);
		if (dateDiff > 5) {
			try {
				const apiResponse = await fetch("https://lensplay-api.vercel.app/api/invites/checkInvite", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						profileId: currentProfile?.id,
					}),
				});
				const jsonRes = await apiResponse.json();
				if (jsonRes?.found) {
					await AsyncStorage.setItem(
						"@user_data",
						JSON.stringify({
							createdAt: created_at,
							hasInviteCodes: true,
						})
					);
				} else {
					await createInviteCode(currentProfile?.id);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const getLocalStorage = async () => {
		try {
			TrackAction(APP_OPEN);
			Logger.Log("In App Loader");
			const userTokens = await AsyncStorage.getItem("@user_tokens");
			const userData = await AsyncStorage.getItem("@user_data");
			const address = await AsyncStorage.getItem("@userAddress");

			if (!userTokens && !address) {
				Logger.Error("No Data and no address found,Goin to Login");
				navigation.replace("Login");
				return;
			}

			if (address) {
				Logger.Success("Got address");
				await HandleDefaultProfile(address);
			} else {
				Logger.Success("Got address via wallet");
				await HandleDefaultProfile(accounts[0]);
			}

			if (!userData) {
				Logger.Error("user data nai hai");
				const isUser = await handleUser(currentProfile?.id);
				if (!isUser) {
					Logger.Log("user data hai lekin invited nai hai");
					navigation.replace("InviteCode");
					return;
				}
			}

			if (userTokens && userData) {
				Logger.Warn("UserTokens from Local Storage", JSON.stringify(userTokens));
				Logger.Warn("UserData from Local Stoarage", JSON.stringify(userData));
				Logger.Success("Got Tokens and Data ");
				const accessToken = JSON.parse(userTokens).accessToken;
				const refreshToken = JSON.parse(userTokens).refreshToken;
				const created_at = JSON.parse(userData).createdAt;
				const hasInviteCodes = JSON.parse(userData).hasInviteCodes;
				if (!accessToken || !refreshToken) {
					Logger.Error("No access and refresh,goin to Login");
					navigation.replace("Login");
					return;
				}
				const isValidAccesToken = await verifyTokens({
					variables: {
						request: {
							accessToken: accessToken,
						},
					},
				});

				if (isValidAccesToken?.data?.verify) {
					Logger.Success("Access token is valid,going to feed");
					setAccessToken(accessToken);
					setRefreshToken(refreshToken);
					if (!hasInviteCodes) {
						await handleInviteCode(created_at);
					}
					navigation.replace("Root");
				} else {
					Logger.Error("Invalid Tokens,Gnerating new tokens");
					const newData = await getAccessFromRefresh({
						variables: {
							request: {
								refreshToken: refreshToken,
							},
						},
					});
					if (!hasInviteCodes) {
						await handleInviteCode(created_at);
					}
					Logger.Error("Generated new tokens");
					setAccessToken(newData?.data?.refresh?.accessToken);
					setRefreshToken(newData?.data?.refresh?.refreshToken);
					await storeTokens(
						newData?.data?.refresh?.accessToken,
						newData?.data?.refresh?.refreshToken
					);
					Logger.Error("Goint to Feed");
					navigation.replace("Root");
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				throw new Error("[Error]:Error in accessing local storage");
			}
		}
	};

	useEffect(() => {
		whiteBox.value = withTiming(10, {
			duration: 500,
		});
		blackBox.value = withDelay(100, withTiming(10, { duration: 500 }));
		image.value = withDelay(1000, withSpring(1, { mass: 1 }));
		textOpacity.value = withDelay(1500, withTiming(1, { duration: 1000 }));
		setTimeout(() => {
			getLocalStorage();
		}, 2000);
	}, []);

	const whiteBoxAnimationStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: whiteBox.value,
				},
			],
		};
	});

	const blackBoxAnimationStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: blackBox.value,
				},
			],
		};
	});

	const ImageAnimationStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: image.value,
				},
			],
		};
	});

	const TextAnimationStyle = useAnimatedStyle(() => {
		return {
			opacity: textOpacity.value,
		};
	});

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "black",
			}}
		>
			<StatusBar style="light" backgroundColor="transparent" />
			<Animated.View
				style={[
					{
						height: 100,
						width: 100,
						backgroundColor: "white",
						borderRadius: 50,
						position: "absolute",
						top: Dimensions.get("window").height / 2,
					},
					whiteBoxAnimationStyle,
				]}
			></Animated.View>
			<Animated.View
				style={[
					{
						height: 100,
						width: 100,
						backgroundColor: "black",
						borderRadius: 50,
						position: "absolute",
						top: Dimensions.get("window").height / 2,
					},
					blackBoxAnimationStyle,
				]}
			></Animated.View>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<Animated.View
					style={[
						{
							height: Dimensions.get("window").width,
							width: Dimensions.get("window").width,
						},
						ImageAnimationStyle,
					]}
				>
					<Image
						source={require("../../assets/images/adaptive-icon.png")}
						style={{ height: "100%", width: "100%", resizeMode: "contain" }}
					/>
				</Animated.View>
			</View>
			<Animated.View
				style={[
					{
						alignItems: "center",
						position: "absolute",
						bottom: 20,
					},
					TextAnimationStyle,
				]}
			>
				<Heading title={"LensPlay"} style={{ color: "white", fontSize: 40, fontWeight: "600" }} />
			</Animated.View>
		</View>
	);
}
