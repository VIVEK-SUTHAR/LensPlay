import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
// import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { AUTH, GUEST_MODE } from "constants/tracking";
import { Scalars } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useProfile, useToast } from "store/Store";
import handleUser from "utils/invites/handleUser";
import getProfiles from "utils/lens/getProfiles";
import Logger from "utils/logger";
import TrackAction from "utils/Track";
import { Web3Button, Web3Modal, useWeb3Modal } from "@web3modal/react-native";

const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const providerMetadata = {
	name: "LesnPlay",
	description: "LensPlay:The Native mobile first video sharing app",
	url: "https://lensplay.xyz/",
	icons: ["https://lensplay.xyz/logo.png"],
	redirect: {
		native: "YOUR_APP_SCHEME://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};

type ConnectWalletSheetProps = {
	loginRef: React.RefObject<BottomSheetMethods>;
	setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConnectWalletSheet({ loginRef, setIsloading }: ConnectWalletSheetProps) {
	// const connector = useWalletConnect();
	const toast = useToast();
	const navigation = useNavigation();
	const { handleGuest } = useGuestStore();
	const { setCurrentProfile, setHasHandle, currentProfile } = useProfile();

	async function HandleDefaultProfile(adress: Scalars["EthereumAddress"]) {
		const userData = await AsyncStorage.getItem("@user_data");

		const userDefaultProfile = await getProfiles({
			ownedBy: adress,
		});

		if (userDefaultProfile) {
			setHasHandle(true);
			setCurrentProfile(userDefaultProfile);

			if (!userData) {
				const isUser = await handleUser(userDefaultProfile?.id);
				if (!isUser) {
					navigation.navigate("InviteCode");
					return;
				}
			}
		} else {
			setHasHandle(false);
			setCurrentProfile(undefined);
			navigation.navigate("LoginWithLens");
		}
	}
	const { open, isConnected, address, provider, isOpen } = useWeb3Modal();

	const handleConnectWallet = async () => {
		if (isConnected && address) {
			Logger.Log("Address", address);
			loginRef?.current?.close();
			void TrackAction(AUTH.WALLET_LOGIN);
			handleGuest(false);

			await HandleDefaultProfile(address);
			const userData = await AsyncStorage.getItem("@user_data");
			if (!userData) {
				return;
			}
			const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
			if (isDeskTopLogin) {
				await AsyncStorage.removeItem("@viaDeskTop");
			}
			navigation.reset({ index: 0, routes: [{ name: "LoginWithLens" }] });
		}
	};

	React.useEffect(() => {
		handleConnectWallet();
	}, [isConnected]);

	// const handleConnectWallet = React.useCallback(async () => {

	// 	const walletData = await connector.connect({
	// 		chainId: 80001,
	// 	});

	// 	try {
	// 		if (walletData) {
	// 			setIsloading(true);
	// 			loginRef?.current?.close();
	// 			void TrackAction(AUTH.WALLET_LOGIN);
	// 			handleGuest(false);
	// 			await HandleDefaultProfile(walletData.accounts[0]);
	// 			const userData = await AsyncStorage.getItem("@user_data");
	// 			if (!userData){
	// 				return
	// 			}
	// 			const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
	// 			if (isDeskTopLogin) {
	// 				await AsyncStorage.removeItem("@viaDeskTop");
	// 			}
	// 			navigation.reset({ index: 0, routes: [{ name: "LoginWithLens" }] });
	// 		} else {
	// 			toast.error("Something went wrong");
	// 		}
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			toast.error("Something went wrong");
	// 			// console.log("[Error]:Error in connect wallet");
	// 		}
	// 	} finally {
	// 		setIsloading(false);
	// 	}
	// }, [connector]);

	const handleDesktopLogin = React.useCallback(async () => {
		loginRef?.current?.close();
		handleGuest(false);
		navigation.navigate("QRLogin");
	}, []);

	const handleGuestLogin = React.useCallback(async () => {
		loginRef?.current?.close();
		handleGuest(true);
		navigation.navigate("Root");
		TrackAction(GUEST_MODE);
	}, []);

	return (
		<>
			<View
				style={{
					paddingHorizontal: 16,
					paddingTop: 8,
					paddingBottom: 16,
					width: "100%",
					height: "100%",
					justifyContent: "flex-start",
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: 32,
					}}
				>
					<Button
						onPress={open}
						title="Connect wallet"
						bg={white[600]}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							color: black[700],
						}}
						py={16}
						icon={<Icon name="wallet" color={black[700]} size={20} />}
					/>
					{/* <Web3Button /> */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginVertical: 16,
							paddingHorizontal: 64,
						}}
					>
						<View
							style={{
								flex: 1,
								height: 2,
								backgroundColor: "gray",
								borderRadius: 20,
							}}
						/>
						<View>
							<StyledText
								title={"OR"}
								style={{
									width: 45,
									textAlign: "center",
									color: "gray",
									fontSize: 16,
									fontWeight: "600",
								}}
							/>
						</View>
						<View
							style={{
								flex: 1,
								height: 2,
								backgroundColor: "gray",
								borderRadius: 20,
							}}
						/>
					</View>
					<Button
						onPress={handleDesktopLogin}
						title="Connect desktop wallet"
						bg={black[300]}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							marginLeft: 8,
							color: white[600],
						}}
						py={16}
						icon={<Icon name="desktop" color={white[600]} size={20} />}
					/>
					<Pressable
						style={{
							marginTop: 32,
						}}
						onPress={handleGuestLogin}
					>
						<StyledText
							title="Continue as guest"
							style={{
								color: white[200],
								fontSize: 16,
								textDecorationLine: "underline",
							}}
						/>
					</Pressable>
				</View>
			</View>
			<Web3Modal
				projectId={projectId}
				providerMetadata={providerMetadata}
				themeMode="dark"
				sessionParams={{
					namespaces: {
						eip155: {
							methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
							chains: ["eip155:137"],
							events: ["chainChanged", "accountsChanged"],
							rpcMap: {},
						},
					},
				}}
			/>
		</>
	);
}
