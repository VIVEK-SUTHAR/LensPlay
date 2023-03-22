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

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Toast />
          <ApolloProvider client={client}>
            <Navigation />
            <StatusBar style="auto" />
          </ApolloProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
