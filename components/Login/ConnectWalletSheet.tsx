import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React from "react";
import { Pressable, View } from "react-native";
import { black, white } from "../../constants/Colors";
import { AUTH, GUEST_MODE } from "../../constants/tracking";
import { useGuestStore } from "../../store/GuestStore";
import { useProfile, useToast } from "../../store/Store";
import { type Scalars } from "../../types/generated";
import TrackAction from "../../utils/Track";
import getProfiles from "../../utils/lens/getProfiles";
import Icon from "../Icon";
import Button from "../UI/Button";
import StyledText from "../UI/StyledText";
import handleUser from "../../utils/invites/handleUser";

interface ConnectWalletSheetProps {
	loginRef: React.RefObject<BottomSheetMethods>;
	setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectWalletSheet: React.FC<ConnectWalletSheetProps> = ({ loginRef, setIsloading }) => {
	const connector = useWalletConnect();
	const toast = useToast();
	const navigation = useNavigation();
	const { handleGuest } = useGuestStore();
	const { setCurrentProfile, setHasHandle, currentProfile } = useProfile();

	async function HandleDefaultProfile(adress: Scalars["EthereumAddress"]): Promise<void> {
		const userDefaultProfile = await getProfiles({
			ownedBy: adress,
		});

		if (userDefaultProfile != null) {
			setHasHandle(true);
			setCurrentProfile(userDefaultProfile);
		} else {
			setHasHandle(false);
			setCurrentProfile(undefined);
		}
	}

	const handleConnectWallet = React.useCallback(async () => {
		const userData = await AsyncStorage.getItem("@user_data");

		const walletData = await connector.connect({
			chainId: 80001,
		});

		try {
			if (typeof walletData !== "undefined") {
				setIsloading(true);
				loginRef?.current?.close();
				void TrackAction(AUTH.WALLET_LOGIN);
				handleGuest(false);
				await HandleDefaultProfile(walletData.accounts[0]);
				if (userData == null) {
					const isUser = await handleUser(currentProfile?.id);
					if (isUser === false) {
						navigation.navigate("InviteCode");
						return;
					}
				}
				const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
				if (isDeskTopLogin != null) {
					await AsyncStorage.removeItem("@viaDeskTop");
				}
				navigation.reset({ index: 0, routes: [{ name: "LoginWithLens" }] });
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Something went wrong");
				// console.log("[Error]:Error in connect wallet");
			}
		} finally {
			setIsloading(false);
		}
	}, [connector]);

	const handleDesktopLogin = React.useCallback(async () => {
		loginRef?.current?.close();
		handleGuest(false);
		navigation.navigate("QRLogin");
	}, []);

	const handleGuestLogin = React.useCallback(async () => {
		loginRef?.current?.close();
		handleGuest(true);
		navigation.navigate("Root");
		void TrackAction(GUEST_MODE);
	}, []);

	return (
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
					onPress={handleConnectWallet}
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
					onPress={() => {
						void handleGuestLogin();
					}}
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
	);
};

export default ConnectWalletSheet;
