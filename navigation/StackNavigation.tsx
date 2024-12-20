import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "customTypes/navigation";
import React from "react";
import ConnectWallet from "screens/Auth/ConnectWallet";
import LetsGetIn from "screens/Auth/LetsGetIn";
import LoginWithLens from "screens/Auth/LoginWithLens";
import QRLogin from "screens/Auth/QRLogin";
import Scanner from "screens/Auth/Scanner";
import EditProfile from "screens/BottomTabs/Profile/EditProfile";
// import FollowAnalytics from "screens/BottomTabs/Profile/FollowerAnalytics";
import UserStats from "screens/BottomTabs/Profile/UserStats";
import WatchLater from "screens/BottomTabs/Profile/WatchLater";
import ShotsComment from "screens/BottomTabs/Shots/ShotsComment";
import AddDescription from "screens/common/AddDescription";
import Channel from "screens/common/Channel";
import FullImage from "screens/common/FullImage";
import LinkingVideo from "screens/common/LinkingVideo";
import Loader from "screens/common/Loader";
import ReportPublication from "screens/common/ReportPublication";
import VideoPage from "screens/common/VideoPage";
import VideoTypes from "screens/common/VideoTypes";
import Search from "screens/Header/Search/Search";
import BugReport from "screens/Header/Settings/BugReport";
import ProfileScanner from "screens/Header/Settings/ProfileScanner";
import Settings from "screens/Header/Settings/Settings";
import UploadShots from "screens/Header/Upload/Shots/UploadShots";
import UploadIndicator from "screens/Header/Upload/UploadIndicator";
import AddDetails from "screens/Header/Upload/Video/AddDetails";
import SelectCollectModule from "screens/Header/Upload/Video/SelectCollectModule";
import UploadVideo from "screens/Header/Upload/Video/UploadVideo";
import { useThemeStore } from "store/Store";
import BottomTabNavigator from "./BottomTabNavigation";
import Profiles from "screens/Auth/Profiles";
import MyQR from "screens/Header/Settings/MyQR";
import ProfileManager from "screens/Header/Settings/ProfileManager";
import { DEV } from "constants/index";
import DebugScreen from "screens/Debug";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
	const theme = useThemeStore();
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "black",
				},
			}}
			initialRouteName={"Loader"}
		>
			<Stack.Group key={"Auth Screens"}>
				<Stack.Screen
					name="LetsGetIn"
					component={LetsGetIn}
					options={{
						animation: "default",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="ConnectWallet"
					component={ConnectWallet}
					options={{
						animation: "default",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="LoginWithLens"
					component={LoginWithLens}
					options={{
						animation: "default",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Profiles"
					component={Profiles}
					options={{
						animation: "default",
						headerShown: false,
					}}
				/>
				<Stack.Group key={"DeskTop Login Screens"}>
					<Stack.Screen
						name="QRLogin"
						component={QRLogin}
						options={{
							animation: "fade_from_bottom",
							headerShown: false,
							headerTintColor: theme.PRIMARY,
							headerTitle: "Desktop Login",
							headerTitleStyle: {
								fontSize: 16,
								fontWeight: "600",
							},
						}}
					/>
					<Stack.Screen
						name="Scanner"
						component={Scanner}
						options={{
							animation: "none",
							headerShown: false,
							headerTintColor: theme.PRIMARY,
							headerTitleStyle: {
								fontSize: 16,
								fontWeight: "600",
							},
						}}
					/>
				</Stack.Group>
			</Stack.Group>

			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{
					headerShown: false,
					animation: "default",
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name="VideoPage"
				component={VideoPage}
				options={{
					headerShown: false,
					presentation: "card",
					animation: "default",
				}}
			/>
			<Stack.Screen
				name="Search"
				component={Search}
				options={{
					headerShown: true,
					headerShadowVisible: false,
					presentation: "card",
					animation: "default",
				}}
			/>
			<Stack.Screen
				name="Channel"
				component={Channel}
				options={{
					animation: "default",
					headerShown: true,
					headerShadowVisible: false,
					headerTintColor: theme.PRIMARY.toString(),
				}}
			/>
			<Stack.Screen
				name="LinkingVideo"
				component={LinkingVideo}
				options={{
					animation: "none",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="UserStats"
				component={UserStats}
				options={{
					animation: "default",
					headerShown: true,
					headerShadowVisible: false,
					headerTintColor: theme.PRIMARY,
				}}
			/>
			<Stack.Screen
				name="EditProfile"
				component={EditProfile}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitle: "Edit Your Channel",
					headerTintColor: theme.PRIMARY,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
				}}
			/>
			<Stack.Screen
				name="ReportPublication"
				component={ReportPublication}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTintColor: theme.PRIMARY,
					headerTitle: "Report Video",
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
				}}
			/>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{
					animation: "default",
					headerShown: true,
					headerShadowVisible: false,
					headerTintColor: theme.PRIMARY,
					headerTitle: "Settings",
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					freezeOnBlur: true,
				}}
			/>
			<Stack.Screen
				name="BugReport"
				component={BugReport}
				options={{
					animation: "fade_from_bottom",
					headerShown: true,
					headerShadowVisible: false,
					headerTitle: "Report a Bug",
					headerTintColor: theme.PRIMARY,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
				}}
			/>
			<Stack.Screen
				name="FullImage"
				component={FullImage}
				options={{
					animation: "default",
					headerShown: false,
					presentation: "transparentModal",
					headerStyle: { backgroundColor: "transparent" },
					headerTintColor: theme.PRIMARY,
					headerTitle: "",
				}}
			/>
			<Stack.Screen
				name="ShotsComment"
				component={ShotsComment}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: theme.PRIMARY,
					headerTitle: "Comments",
				}}
			/>
			<Stack.Screen
				name="Loader"
				component={Loader}
				options={{
					animation: "none",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="UploadVideo"
				component={UploadVideo}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "Select Cover",
				}}
			/>
			<Stack.Screen
				name="UploadShots"
				component={UploadShots}
				options={{
					animation: "slide_from_right",
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="AddDetails"
				component={AddDetails}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "Add Details",
				}}
			/>
			<Stack.Screen
				name="AddDescription"
				component={AddDescription}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "Add Description",
				}}
			/>
			<Stack.Screen
				name="SelectCollectModule"
				component={SelectCollectModule}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: true,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "Collect Settings",
				}}
			/>
			<Stack.Screen
				name="VideoTypes"
				component={VideoTypes}
				options={{
					animation: "slide_from_right",
					headerShown: true,
					headerShadowVisible: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "Select video types",
				}}
			/>
			<Stack.Screen
				name="ProfileScanner"
				component={ProfileScanner}
				options={{
					animation: "slide_from_right",
					headerShown: false,
					headerTitleStyle: {
						fontSize: 16,
						fontWeight: "600",
					},
					headerTintColor: "white",
					headerTitle: "",
				}}
			/>
			<Stack.Screen
				name="WatchLater"
				component={WatchLater}
				options={{
					animation: "default",
					headerShown: false,
					headerTintColor: "white",
					headerTitle: "",
					headerShadowVisible: false,
				}}
			/>
			<Stack.Screen
				name="UploadIndicator"
				component={UploadIndicator}
				options={{
					headerBackVisible: false,
					animation: "default",
					headerShown: false,
					headerTintColor: theme.PRIMARY,
				}}
			/>
			{/* <Stack.Screen
				name="FollowAnalytics"
				component={FollowAnalytics}
				options={{
					animation: "none",
					headerTintColor: theme.PRIMARY,
				}}
			/> */}
			<Stack.Screen
				name="MyQR"
				component={MyQR}
				options={{
					animation: "default",
					headerTintColor: theme.PRIMARY,
				}}
			/>
			<Stack.Screen
				name="ProfileManager"
				component={ProfileManager}
				options={{
					animation: "slide_from_right",
					headerTintColor: theme.PRIMARY,
				}}
			/>
			{DEV ? (
				<Stack.Screen
					name="DebugScreen"
					component={DebugScreen}
					options={{
						animation: "default",
						headerTintColor: theme.PRIMARY,
					}}
				/>
			) : null}
		</Stack.Navigator>
	);
}
