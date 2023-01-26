import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { client } from "./apollo/client";
import Toast from "./components/Toast";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Toast/>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="auto" />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
