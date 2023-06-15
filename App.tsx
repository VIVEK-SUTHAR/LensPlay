import { ApolloProvider } from "@apollo/client";
import NetInfo from "@react-native-community/netinfo";
import { client } from "apollo/client";
import NetworkStatus from "components/NetworkStatus";
import Toast from "components/Toast";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import useCachedResources from "hooks/useCachedResources";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useNetworkStore from "store/NetworkStore";
import Logger from "utils/logger";
import Navigation from "./navigation";
import { AppState } from "react-native";
import "./expo-crypto-shim.ts";
import { Web3Modal } from "@web3modal/react-native";

import messaging from "@react-native-firebase/messaging"
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

export default function App() {
	const isLoadingComplete = useCachedResources();

	const { setIsOffline } = useNetworkStore();

	const getFCMToken =async () => {
		const register = await messaging().registerDeviceForRemoteMessages();
		const token = await messaging().getToken();
		console.log(token)
	}

	React.useEffect(() => {
		getFCMToken()
		NetInfo.fetch().then((data) => {
			if (data.isConnected) {
				setIsOffline(true);
			} else if (!data.isConnected) {
				setIsOffline(false);
			}
		});
		const unsubscribe = NetInfo.addEventListener((data) => {
			Logger.Success("Network State", data);
			if (data.isConnected) {
				setIsOffline(true);
			} else if (!data.isConnected) {
				setIsOffline(false);
			}
		});
		AppState.addEventListener("memoryWarning", (state) => {
			Logger.Error("Memory Warning ", state);
		});

		return () => {
			unsubscribe();
		};
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
			</GestureHandlerRootView>
		);
	}
}
