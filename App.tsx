import { ApolloProvider } from "@apollo/client";
import notifee, { AndroidStyle, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { WalletConnectModal } from "@walletconnect/modal-react-native";
import { client } from "apollo/client";
import NetworkStatus from "components/NetworkStatus";
import Toast from "components/Toast";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "hooks/useCachedResources";
import React from "react";
import { Platform, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Logger from "utils/logger";
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
		native: "lensplay://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};

const sessionParams = {
	namespaces: {
		eip155: {
			methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
			chains: ["eip155:137"],
			events: ["chainChanged", "accountsChanged"],
			rpcMap: {},
		},
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
		notifee.onForegroundEvent(({ type, detail }) => {
			Logger.Success("ss", detail);
			switch (type) {
				case EventType.DISMISSED:
					Logger.Warn("User Dismissed notification", detail.notification);
					break;
				case EventType.PRESS:
					break;
			}
		});

		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Logger.Count("New Noti received from LP Server", remoteMessage);
			let channelId;
			let imageUrl;
			if (Platform.OS === "android") {
				channelId = await notifee.createChannel({
					id: "default",
					name: "Default Channel",
				});
			}
			const notification = remoteMessage?.notification;
			imageUrl = remoteMessage.data?.fcm_options?.image;
			if (Platform.OS === "android") {
				imageUrl = remoteMessage?.notification?.android?.imageUrl;
			}
			if (imageUrl) {
				notifee.displayNotification({
					title: notification?.title,
					body: notification?.body,
					ios: {
						attachments: [
							{
								url: imageUrl,
							},
						],
					},
					android: {
						channelId,
						style: {
							type: AndroidStyle.BIGPICTURE,
							picture: imageUrl,
						},
					},
				});
			} else {
				notifee.displayNotification({
					title: notification?.title,
					body: notification?.body,
					android: {
						channelId,
					},
				});
			}
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
					sessionParams={sessionParams}
				/>
			</GestureHandlerRootView>
		);
	}
}
