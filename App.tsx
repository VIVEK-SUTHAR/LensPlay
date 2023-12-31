import "expo-dev-client";
import React from "react";
import { Platform, UIManager } from "react-native";
import Navigation from "./navigation";
import "@walletconnect/react-native-compat";
import Provider from "./providers";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

export default function App() {
	return (
		<Provider>
			<Navigation />
		</Provider>
	);
}
