import { ApolloProvider } from "@apollo/client";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { WalletConnectModal } from "@walletconnect/modal-react-native";
import { client } from "apollo/client";
import NetworkStatus from "components/NetworkStatus";
import Toast from "components/Toast";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "hooks/useCachedResources";
import React from "react";
import { Alert, Platform, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { APP_NAME, DESCRIPTION, LENSPLAY_SITE } from "./constants";
import "./expo-crypto-shim.ts";
import Navigation from "./navigation";

const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const providerMetadata = {
	name: APP_NAME,
	description: DESCRIPTION,
	url: LENSPLAY_SITE,
	icons: ["https://pbs.twimg.com/profile_images/1633425966709211136/oZTahygd_400x400.jpg"],
	redirect: {
		native: "YOUR_APP_SCHEME://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};
if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}
export default function App() {
	const isLoadingComplete = useCachedResources();

	React.useEffect(() => {
		// Assume a message-notification contains a "type" property in the data payload of the screen to open

		notifee.onForegroundEvent(({ type, detail }) => {
			switch (type) {
				case EventType.DISMISSED:
					console.log("User dismissed notification", detail.notification);
					break;
				case EventType.PRESS:
					console.log("User pressed notification", detail.notification);
					break;
			}
		});

		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			const notification = remoteMessage?.notification;
			notifee.displayNotification({
				title: notification?.title,
				body: notification?.body,
			});
		});

		return unsubscribe;
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<Toast />
					<NetworkStatus />
					<ApolloProvider client={client}>
						<StatusBar style="dark" />
						<Navigation />
					</ApolloProvider>
				</SafeAreaProvider>
				<WalletConnectModal
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
			</GestureHandlerRootView>
		);
	}
}
