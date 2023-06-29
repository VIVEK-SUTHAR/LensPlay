import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useWeb3Modal } from "@web3modal/react-native";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { AUTH, GUEST_MODE } from "constants/tracking";
import { Scalars } from "customTypes/generated";
import React from "react";
import { Pressable, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useProfile } from "store/Store";
import TrackAction from "utils/Track";
import handleUser from "utils/invites/handleUser";
import getProfiles from "utils/lens/getProfiles";
import Logger from "utils/logger";

type ConnectWalletSheetProps = {
	loginRef: React.RefObject<BottomSheetMethods>;
	setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConnectWalletSheet({ loginRef, setIsloading }: ConnectWalletSheetProps) {
	const navigation = useNavigation();
	const { handleGuest } = useGuestStore();
	const { setCurrentProfile, setHasHandle } = useProfile();

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

	const { open, isConnected, address, isOpen, close } = useWeb3Modal();

	const handleConnectWallet = async () => {
		if (isConnected && address) {
			if (isOpen) {
				close();
			}

			setIsloading(true);
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
			setIsloading(false);
			navigation.reset({ index: 0, routes: [{ name: "LoginWithLens" }] });
		}
	};

	React.useEffect(() => {
		handleConnectWallet();
	}, [isConnected]);

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
	);
}
