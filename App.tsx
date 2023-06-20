import { ApolloProvider } from "@apollo/client";
import { Web3Modal } from "@web3modal/react-native";
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
import { APP_NAME, DESCRIPTION, LENSPLAY_SITE } from "./constants";
import "./expo-crypto-shim.ts";
import Navigation from "./navigation";

const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const providerMetadata = {
	name: APP_NAME,
	description: DESCRIPTION,
	url: LENSPLAY_SITE,
	icons: ["https://lensplay.xyz/logo.png"],
	redirect: {
		native: "YOUR_APP_SCHEME://",
		universal: "YOUR_APP_UNIVERSAL_LINK.com",
	},
};

export default function App() {
	const isLoadingComplete = useCachedResources();

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
					<Web3Modal
						projectId={projectId}
						providerMetadata={providerMetadata}
						themeMode="dark"
						sessionParams={{
							namespaces: {
								eip155: {
									methods: ["eth_sendTransaction", "personal_sign"],
									chains: ["eip155:137"],
									events: ["chainChanged", "accountsChanged"],
									rpcMap: {},
								},
							},
						}}
					/>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		);
	}
}
