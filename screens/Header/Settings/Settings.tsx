import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import ProfileQR, { ProfileSheet } from "components/settings/profileQR";
import Socials from "components/settings/Socials";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, white } from "constants/Colors";
import { LENSPLAY_PRIVACY, LENSPLAY_TERMS } from "constants/index";
import { AUTH } from "constants/tracking";
import type { RootStackScreenProps } from "customTypes/navigation";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { FC, useRef } from "react";
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useInviteStore } from "store/InviteStore";
import TrackAction from "utils/Track";

const RIPPLE_COLOR = "rgba(255,255,255,0.1)";

type SettingsItemProps = {
	label: string;
	icon: JSX.Element;
	onPress: () => void;
};

const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState(false);

	React.useEffect(() => {
		const delay = setTimeout(() => {
			setIsReadyToRender(true);
		}, 0);
		return () => clearTimeout(delay);
	}, []);

	const Wallet = useWalletConnect();
	const { isGuest } = useGuestStore();
	const logoutref = useRef<BottomSheetMethods>(null);
	const QRCodeRef = useRef<BottomSheetMethods>(null);
	const { clearInvites } = useInviteStore();

	const SettingItemsList: SettingsItemProps[] = [
		{
			icon: <Icon name="policy" size={24} />,
			label: "Terms and Conditions",
			onPress: () => {
				Linking.openURL(LENSPLAY_TERMS);
			},
		},
		{
			icon: <Icon name="terms" size={24} />,
			label: "Privacy Policy",
			onPress: () => {
				Linking.openURL(LENSPLAY_PRIVACY);
			},
		},
		{
			icon: <Icon name="mail" size={24} />,
			label: "Contact Us",
			onPress: () => {
				Linking.openURL(`mailto:lensplay.ac@gmail.com`);
			},
		},
	];

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Pressable onPress={() => navigation.push("ProfileScanner")}>
						<Icon name="qr" size={20} />
					</Pressable>
				);
			},
		});
	}, []);

	if (!isReadyToRender) return <SafeAreaView style={styles.container} />;
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="black" style="auto" />
			<ScrollView style={styles.container}>
				{!isGuest ? <ProfileQR QRCodeRef={QRCodeRef} /> : <></>}
				<View>
					<Heading
						title={"About"}
						style={{
							color: "white",
							fontSize: 16,
							fontWeight: "600",
						}}
					/>
					<View
						style={{
							backgroundColor: dark_primary,
							marginTop: 16,
							borderRadius: 12,
						}}
					>
						{SettingItemsList.map((item, index) => {
							return (
								<SettingsItem
									key={index}
									icon={item.icon}
									label={item.label}
									onPress={item.onPress}
								/>
							);
						})}
					</View>
				</View>
				<View
					style={{
						marginTop: 24,
					}}
				>
					<Heading
						title={"Bug"}
						style={{
							color: "white",
							fontSize: 16,
							fontWeight: "600",
						}}
					/>
					<View
						style={{
							backgroundColor: dark_primary,
							marginTop: 16,
							borderRadius: 12,
						}}
					>
						<SettingsItem
							icon={<Icon name="bug" size={24} />}
							label={"Report a bug"}
							onPress={() => navigation.push("BugReport")}
						/>
					</View>
				</View>
				<View
					style={{
						marginVertical: 48,
					}}
				>
					<Button
						title={isGuest ? "Login" : "Logout of LensPlay"}
						bg={dark_primary}
						py={16}
						borderRadius={12}
						textStyle={{
							color: "white",
							fontSize: 16,
							fontWeight: "500",
						}}
						onPress={() => {
							isGuest
								? navigation.reset({ index: 0, routes: [{ name: "Login" }] })
								: logoutref.current?.snapToIndex(0);
						}}
					/>
				</View>
				<Socials />
				<View style={styles.appVersionContainer}>
					{/* <StyledText
						title={`OTA Build:${UPADTES.OTA_BUILD}`}
						style={{ color: "gray", fontSize: 10 }}
					/> */}
					<StyledText
						title={`${Constants.expoConfig?.name} v${Constants.expoConfig?.version}`}
						style={{ color: "gray", fontSize: 10 }}
					/>
				</View>
			</ScrollView>
			<Sheet
				ref={logoutref}
				index={-1}
				snapPoints={[230]}
				bottomInset={32}
				enablePanDownToClose
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				detached={true}
				style={{
					marginHorizontal: 16,
				}}
			>
				<View
					style={{
						justifyContent: "space-between",
						paddingHorizontal: 16,
						paddingTop: 8,
						paddingBottom: 16,
						height: "100%",
					}}
				>
					<View>
						<Heading
							title="Are you sure?"
							style={{
								color: "white",
								fontSize: 20,
								marginVertical: 4,
								textAlign: "left",
								fontWeight: "600",
							}}
						/>
						<StyledText
							title="By doing this,next time when you open LensPlay, you need to connect your wallet again."
							style={{
								color: "gray",
								fontSize: 14,
								marginVertical: 4,
								fontWeight: "500",
							}}
						/>
					</View>
					<Button
						onPress={async () => {
							const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
							await AsyncStorage.removeItem("@user_tokens");
							if (isDeskTopLogin) {
								await AsyncStorage.removeItem("@viaDeskTop");
								clearInvites();
								navigation.reset({ index: 0, routes: [{ name: "Login" }] });
								return;
							} else {
								await Wallet.killSession();
								clearInvites();
								navigation.reset({ index: 0, routes: [{ name: "Login" }] });
							}
							TrackAction(AUTH.LOGOUT);
						}}
						my={16}
						title="Confirm"
						bg={white[800]}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							color: "black",
						}}
						py={12}
						borderRadius={8}
					/>
				</View>
			</Sheet>
			<Sheet
				ref={QRCodeRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: "rgba(0,0,0,0.8)",
				}}
				snapPoints={[550]}
			>
				<ProfileSheet />
			</Sheet>
		</SafeAreaView>
	);
};

export default Settings;

const Item: FC<SettingsItemProps> = (item: SettingsItemProps) => {
	return (
		<Pressable
			android_ripple={{
				color: RIPPLE_COLOR,
			}}
			style={styles.itemContainer}
			onPress={item.onPress}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				{item.icon}
				<StyledText title={item.label} style={styles.itemText} />
			</View>
			<Icon name="rightArrow" size={16} />
		</Pressable>
	);
};

const SettingsItem = React.memo(Item);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingVertical: 16,
		paddingHorizontal: 8,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
	},
	logOutContainer: {
		width: "85%",
		height: "auto",
		borderRadius: 8,
		backgroundColor: "#232323",
		paddingVertical: 18,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderColor: "red",
		paddingLeft: 16,
	},
	itemText: {
		color: "white",
		fontSize: 16,
		paddingVertical: 24,
		paddingHorizontal: 12,
	},
	appVersionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 16,
	},
});
