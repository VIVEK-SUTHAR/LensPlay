import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { client } from "./apollo/client";
import Toast from "./components/Toast";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import "expo-dev-client";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react-native";

const LPClient = createReactClient({
  provider: studioProvider({ apiKey: "8d89f7e5-9b5a-416e-94bc-50c4e87a07f2" }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Toast />
          <LivepeerConfig client={LPClient}>
            <ApolloProvider client={client}>
              <StatusBar style="dark" />
              <Navigation />
            </ApolloProvider>
          </LivepeerConfig>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
