import { ApolloProvider } from "@apollo/client";
import NetInfo from "@react-native-community/netinfo";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { client } from "./apollo/client";
import NetworkStatus from "./components/NetworkStatus";
import Toast from "./components/Toast";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import useNetworkStore from "./store/NetworkStore";
import Logger from "./utils/logger";

export default function App(): JSX.Element | null {
	const isLoadingComplete = useCachedResources();

	const { setIsOffline } = useNetworkStore();

	React.useEffect(() => {
		NetInfo.fetch()
			.then((data) => {
				if (data.isConnected === true) {
					setIsOffline(true);
				} else if (data.isConnected === false) {
					setIsOffline(false);
				}
			})
			.catch(() => {});
		const unsubscribe = NetInfo.addEventListener((data) => {
			Logger.Success("Network State", data);
			if (data.isConnected === true) {
				setIsOffline(true);
			} else if (data.isConnected === false) {
				setIsOffline(false);
			}
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
