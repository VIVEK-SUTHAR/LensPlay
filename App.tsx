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

export default function App() {
	const isLoadingComplete = useCachedResources();

	const { setIsOffline } = useNetworkStore();

	React.useEffect(() => {
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
			</GestureHandlerRootView>
		);
	}
}
