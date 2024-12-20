import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi-react-native";
import Login from "assets/Icons/Login";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import StorageKeys from "constants/Storage";
import { LENSPLAY_SITE, LENS_CLAIM_SITE } from "constants/index";
import { AUTH } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import {
	HandleInfo,
	useAuthenticateMutation,
	useChallengeLazyQuery,
} from "customTypes/generated";
import type { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Linking,
	SafeAreaView,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
import { useAuthStore, useProfile, useToast } from "store/Store";
import TrackAction from "utils/Track";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import storeTokens from "utils/storeTokens";
import { useAccount, useSignMessage } from "wagmi";

const windowWidth = Dimensions.get("window").width;

function LoginWithLens({ navigation }: RootStackScreenProps<"LoginWithLens">) {
	const [isloading, setIsloading] = useState<boolean>(false);
	const [isDesktop, setIsDesktop] = useState<boolean>(false);
	const { width } = useWindowDimensions();

	const toast = useToast();

	const { hasHandle, currentProfile } = useProfile();
	const { open } = useWeb3Modal();

	const { setAccessToken, setRefreshToken } = useAuthStore();

	const [getChallenge] = useChallengeLazyQuery();
	const [getTokens] = useAuthenticateMutation();

	const scaleAnimation = useRef(new Animated.Value(0)).current;
	const fadeInAnimation = useRef(new Animated.Value(0)).current;
	const { address, isConnected } = useAccount();
	const { signMessageAsync, error } = useSignMessage();

	const handleLoginWithLens = async () => {
		if (!hasHandle) {
			void Linking.openURL(LENS_CLAIM_SITE);
			return;
		}
		try {
			setIsloading(true);
			Logger.Log("Yeh hai handle", currentProfile?.id);
			const data = await getChallenge({
				variables: {
					request: {
						signedBy: address,
						for: currentProfile?.id,
					},
				},
				context: {
					headers: {
						origin: LENSPLAY_SITE,
					},
				},
				fetchPolicy: "network-only",
			});

			Logger.Log("this is sign params", address, data?.data?.challenge);
			if (data?.data?.challenge?.text) {
				const sign = await signMessageAsync({
					message: data?.data?.challenge?.text,
				});
				if (error) return;
				if (sign) {
					const response = await getTokens({
						variables: {
							request: {
								id: data?.data?.challenge?.id,
								signature: sign,
							},
						},
					});
					Logger.Success("this is the token response", response);

					setAccessToken(response?.data?.authenticate?.accessToken);
					setRefreshToken(response?.data?.authenticate?.refreshToken);
					await storeTokens(
						response?.data?.authenticate?.accessToken,
						response?.data?.authenticate?.refreshToken,
						false
					);
					if (hasHandle) {
						if (address) {
							AsyncStorage.setItem(StorageKeys.UserAddress, address);
						}
						navigation.reset({ index: 0, routes: [{ name: "Root" }] });
					}
					void TrackAction(AUTH.SIWL);
				} else {
					toast.show("Something went wrong", ToastType.ERROR, true);
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error("Error in Login with lens", error);
				if (error.message.includes("Rejected")) {
					toast.error("User rejected signature");
				}
			}
		} finally {
			setIsloading(false);
		}
	};

	const handleDisconnect = async () => {
		try {
			if (address) {
				await open();
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error("Error in disconnect", error);
			}
		}
	};

	const handleDesktop = async () => {
		const isDesktop = await AsyncStorage.getItem("@viaDeskTop");
		if (isDesktop === "true") {
			setIsDesktop(true);
		} else {
			setIsDesktop(false);
		}
	};

	useEffect(() => {
		Animated.spring(scaleAnimation, {
			toValue: 1,
			damping: 12,
			velocity: 2,
			delay: 500,
			useNativeDriver: true,
		}).start();
		Animated.timing(fadeInAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
		handleDesktop();
	}, []);

	useEffect(() => {
		if (!isConnected) {
			navigation.replace("LetsGetIn");
		}
	}, [isConnected]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<View
				style={{
					justifyContent: "flex-end",
					alignItems: "center",
					marginBottom: 32,
					flex: 1,
				}}
			>
				<View
					style={{
						width: windowWidth,
						height: "50%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Login />
				</View>
				<View
					style={{
						width: width,
						paddingHorizontal: 16,
						justifyContent: "center",
						marginTop: 32,
					}}
				>
					<StyledText
						title={
							hasHandle
								? "Hurry up, Your Lens frens are waiting!"
								: "Oops! You don't have a lens profile"
						}
						style={{
							color: "white",
							fontSize: 32,
							fontWeight: "600",
						}}
					/>
				</View>
			</View>
			<View
				style={{
					paddingHorizontal: 16,
					paddingBottom: 16,
					justifyContent: "space-between",
				}}
			>
				<View>
					{!isDesktop ? (
						<Animated.View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								opacity: fadeInAnimation,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Avatar
									src={getRawurl(currentProfile?.metadata?.picture)}
									height={40}
									width={40}
								/>
								<View
									style={{
										marginLeft: 8,
									}}
								>
									<Heading
										title={currentProfile?.metadata?.displayName}
										style={{
											color: "white",
											fontSize: 16,
											fontWeight: "500",
										}}
									/>
									{hasHandle ? (
										<StyledText
											title={formatHandle(currentProfile?.handle as HandleInfo)}
											style={{
												color: white[200],
												fontSize: 12,
											}}
										/>
									) : null}
								</View>
							</View>
							<Button
								title={"Disconnect"}
								width={"auto"}
								bg={"rgba(255,255,255,0.1)"}
								px={24}
								py={12}
								textStyle={{
									fontSize: 12,
									fontWeight: "600",
									color: "white",
								}}
								onPress={handleDisconnect}
							/>
						</Animated.View>
					) : (
						<></>
					)}
					<Animated.View
						style={{
							marginTop: 24,
							transform: [
								{
									scale: scaleAnimation,
								},
							],
						}}
					>
						<Button
							title={hasHandle ? "Login with Lens" : "Claim your .lens handle"}
							isLoading={isloading}
							textStyle={{ fontSize: 20, fontWeight: "600", color: black[800] }}
							bg={white[700]}
							py={16}
							icon={<Icon name="arrowForward" color={black[700]} size={16} />}
							iconPosition="right"
							onPress={async () => {
								if (isDesktop) {
									Logger.Log("LENS CLIAM VIA DESKTOP");
									void Linking.openURL(LENS_CLAIM_SITE);
								} else {
									await handleLoginWithLens();
								}
							}}
						/>
					</Animated.View>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default LoginWithLens;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#161616",
		justifyContent: "space-between",
	},
	bottomCircles: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 230,
	},
});
