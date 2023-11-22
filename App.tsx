import { ApolloProvider } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import { client } from "apollo/client";
import NetworkStatus from "components/NetworkStatus";
import Toast from "components/Toast";
import "expo-dev-client";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { APP_NAME, DESCRIPTION, LENSPLAY_SITE } from "./constants";
import "./expo-crypto-shim.ts";
import Navigation from "./navigation";
import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { polygon } from "viem/chains";
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from "@web3modal/wagmi-react-native";
import usePushNotifications from "hooks/usePushNotifications";

SplashScreen.preventAutoHideAsync();

const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const metadata = {
	name: APP_NAME,
	description: DESCRIPTION,
	url: LENSPLAY_SITE,
	icons: ["https://pbs.twimg.com/profile_images/1633425966709211136/oZTahygd_400x400.jpg"],
	redirect: {
		native: "lensplay://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};
const chains = [polygon];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
	projectId,
	chains,
	wagmiConfig,
});

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

console.log("App Running in DEV MODE", __DEV__);
console.log("App BUndle Load Time", __BUNDLE_START_TIME__);
export default function App() {
	usePushNotifications();
	const [fontsLoaded] = useFonts({
		PlusJakartaSans_Regular: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
		PlusJakartaSans_Medium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
		PlusJakartaSans_SemiBold: require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
		PlusJakartaSans_Bold: require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
		OpenSans_Regular: require("./assets/fonts/OpenSans-Regular.ttf"),
		OpenSans_Medium: require("./assets/fonts/OpenSans-Medium.ttf"),
		OpenSans_SemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
		OpenSans_Bold: require("./assets/fonts/OpenSans-Bold.ttf"),
		...FontAwesome.font,
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return <></>;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<WagmiConfig config={wagmiConfig}>
				<Web3Modal />
				<SafeAreaProvider>
					<Toast />
					<NetworkStatus />
					<ApolloProvider client={client}>
						<StatusBar style="dark" />
						<Navigation />
					</ApolloProvider>
				</SafeAreaProvider>
			</WagmiConfig>
		</GestureHandlerRootView>
	);
}
