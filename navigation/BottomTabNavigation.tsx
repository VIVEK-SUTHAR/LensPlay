import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Upload from "assets/Icons/Upload";
import Icon from "components/Icon";
import UploadSelect from "components/Sheets/UploadSelect";
import UploadType from "components/Sheets/UploadType";
import Avatar from "components/UI/Avatar";
import LensPlayBadge from "components/UI/LensPlayBadge";
import { black } from "constants/Colors";
import dimensions from "constants/Layout";
import { useRefreshMutation } from "customTypes/generated";
import type { RootStackScreenProps, RootTabParamList } from "customTypes/navigation";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import Trending from "screens/BottomTabs/Explore/Trending";
import Feed from "screens/BottomTabs/Home/Feed";
import Notifications from "screens/BottomTabs/Notification/Notification";
import ProfileScreen from "screens/BottomTabs/Profile/Profile";
import Shots from "screens/BottomTabs/Shots/Shots";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import storeTokens from "utils/storeTokens";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator({ navigation }: RootStackScreenProps<"Root">) {
	const theme = useThemeStore();
	const { currentProfile: { metadata: { picture } = {} } = {} } = useProfile();
	const { setAccessToken, setRefreshToken } = useAuthStore();

	const [getAccessFromRefresh] = useRefreshMutation();

	React.useEffect(() => {
		updateTokens();
		const tokenInterval = setInterval(() => {
			updateTokens();
		}, 60000);
		return clearInterval(tokenInterval);
	}, []);

	const updateTokens = async () => {
		const userTokens = await AsyncStorage.getItem("@user_tokens");
		if (userTokens) {
			const tokens = JSON.parse(userTokens);
			const generatedTime = tokens.generatedTime;
			const currentTime = new Date().getTime();
			const minute = Math.floor(((currentTime - generatedTime) % (1000 * 60 * 60)) / (1000 * 60));
			if (minute < 25) {
				return;
			} else {
				const data = await getAccessFromRefresh({
					variables: {
						request: {
							refreshToken: tokens.refreshToken,
						},
					},
				});

				const accessToken = data?.data?.refresh?.accessToken;
				const refreshToken = data?.data?.refresh?.refreshToken;

				setAccessToken(accessToken);
				setRefreshToken(refreshToken);
				if (tokens.viaDesktop) {
					await storeTokens(accessToken, refreshToken, true);
					return;
				}
				if (!tokens.viaDesktop) {
					storeTokens(accessToken, refreshToken);
					return;
				}
			}
		}
	};

	const uploadRef = useRef<BottomSheetMethods>(null);
	const uploadTypeRef = useRef<BottomSheetMethods>(null);

	return (
		<>
			<BottomTab.Navigator
				initialRouteName="Home"
				screenOptions={{
					tabBarHideOnKeyboard: true,
					headerStyle: { backgroundColor: "black", elevation: 2 },
					headerTitle: "",
					headerRight: () => (
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Pressable
								onPress={() => uploadTypeRef.current?.snapToIndex(0)}
								style={{
									paddingHorizontal: 8,
									height: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Upload height={24} width={24} />
							</Pressable>
							<Pressable
								onPress={() => {
									navigation.push("Search");
								}}
								style={{
									paddingHorizontal: 8,
									height: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Icon name="search" size={24} />
							</Pressable>
							<Pressable
								onPress={() => {
									requestAnimationFrame(() => {
										navigation.navigate("Settings");
									});
								}}
								style={{
									paddingHorizontal: 8,
									height: "100%",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Icon name="setting" size={24} />
							</Pressable>
						</View>
					),
					headerLeft: () => <LensPlayBadge/>,
					tabBarStyle: {
						backgroundColor: black[800],
						alignItems: "center",
						justifyContent: "space-between",
						borderTopColor: "transparent",
						minHeight: dimensions.window.height / 14,
						paddingHorizontal: 5,
						paddingVertical: 10,
					},
					headerShadowVisible: false,
				
				}}
			>
				<BottomTab.Screen
					name="Home"
					component={Feed}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										// padding: 5,
										width: 45,
										alignContent: "center",
										justifyContent: "center",
										flexDirection: "row",
										height: "100%",
									}}
								>
									<Icon name={focused ? "home_filled" : "home_outline"} color={"white"} size={25} />
								</View>
							);
						},
					}}
				/>
				<BottomTab.Screen
					name="Trending"
					component={Trending}
					options={{
						tabBarLabel: "",
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										// padding: 5,
										width: 45,
										alignContent: "center",
										justifyContent: "center",
										flexDirection: "row",
										height: "100%",
									}}
								>
									<Icon
										name={focused ? "compass_filled" : "compass_outline"}
										color={"white"}
										size={24}
									/>
								</View>
							);
						},
					}}
				/>
				<BottomTab.Screen
					name="Shots"
					component={Shots}
					options={{
						freezeOnBlur: true,
						tabBarLabel: "",
						headerShown: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										// padding: 5,
										width: 45,
										alignContent: "center",
										justifyContent: "center",
										flexDirection: "row",
										height: "100%",
									}}
								>
									<Icon
										name={focused ? "shots_filled" : "shots_outline"}
										color={"white"}
										size={24}
									/>
								</View>
							);
						},
					}}
				/>
				<BottomTab.Screen
					name="Notifications"
					component={Notifications}
					options={{
						tabBarLabel: "",
						tabBarAccessibilityLabel: "Notifications",
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										// padding: 5,
										width: 45,
										alignContent: "center",
										justifyContent: "center",
										flexDirection: "row",
										height: "100%",
									}}
								>
									<Icon
										name={focused ? "notification_filled" : "notification_outline"}
										color={"white"}
									/>
								</View>
							);
						},
					}}
				/>
				<BottomTab.Screen
					name="Account"
					component={ProfileScreen}
					options={{
						tabBarLabel: "",
						headerShown: true,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										width: 30,
										alignContent: "center",
										justifyContent: "center",
										flexDirection: "row",
										height: 30,
										borderRadius: 45,
										borderColor: focused ? "white" : "transparent",
										borderWidth: focused ? 1 : 0,
									}}
								>
									<Avatar src={getIPFSLink(getRawurl(picture))} height={28} width={28} />
								</View>
							);
						},
					}}
				/>
			</BottomTab.Navigator>
			<UploadType uploadTypeSheetRef={uploadTypeRef} />
			<UploadSelect uploadRef={uploadRef} uploadTypeRef={uploadTypeRef} />
		</>
	);
}
