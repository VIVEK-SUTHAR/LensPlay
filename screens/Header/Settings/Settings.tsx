import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Icon from "components/Icon";
import ApperenceSheet from "components/settings/ApperenceSheet";
import ProfileQR from "components/settings/profileQR";
import Socials from "components/settings/Socials";
import LogOutSheet from "components/Sheets/LogOutSheet";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { dark_primary } from "constants/Colors";
import { DEV, LENSPLAY_PRIVACY, LENSPLAY_TERMS } from "constants/index";
import type { RootStackScreenProps } from "customTypes/navigation";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { FC, useRef } from "react";
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useGuestStore } from "store/GuestStore";

const RIPPLE_COLOR = "rgba(255,255,255,0.1)";

type SettingsItemProps = {
	label: string;
	icon: JSX.Element;
	onPress: () => void;
};

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
const Settings = ({ navigation }: RootStackScreenProps<"Settings">) => {
	const { isGuest } = useGuestStore();
	const logoutref = useRef<BottomSheetMethods>(null);
	const apperenceSheetRef = useRef<BottomSheetMethods>(null);
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

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="black" style="auto" />
			<ScrollView style={styles.container}>
				{!isGuest ? <ProfileQR /> : null}
				<View
					style={{
						marginTop: 24,
					}}
				>
					<Heading
						title={"General"}
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
						{/* <SettingsItem
							icon={<Icon name="edit" size={24} />}
							label={"Manage Your Profile"}
							onPress={() => navigation.push("ProfileManager")}
						/> */}
						<SettingsItem
							icon={<Icon name="star" size={24} />}
							label={"Appearance"}
							onPress={() => apperenceSheetRef.current?.snapToIndex(0)}
						/>
					</View>
				</View>
				<View style={{marginTop:24}}>
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
				{DEV ? (
					<View
						style={{
							marginTop: 24,
						}}
					>
						<Heading
							title={"Developer Only"}
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
								icon={<Icon name="setting" size={24} />}
								label={"Debug Details"}
								onPress={() => navigation.push("DebugScreen")}
							/>
						</View>
					</View>
				) : null}

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
								? navigation.reset({ index: 0, routes: [{ name: "LetsGetIn" }] })
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
			<LogOutSheet logoutref={logoutref} />
			<ApperenceSheet apperenceSheetRef={apperenceSheetRef} />
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
