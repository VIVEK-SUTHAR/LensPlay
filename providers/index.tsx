import { ApolloProvider } from "@apollo/client";
import { client } from "apollo/client";
import NetworkStatus from "components/NetworkStatus";
import Toast from "components/Toast";
import { FontAwesome } from "@expo/vector-icons";
import "expo-dev-client";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import {
  Web3Modal,
  createWeb3Modal,
  defaultWagmiConfig,
} from "@web3modal/wagmi-react-native";
import { APP_NAME, DESCRIPTION, LENSPLAY_SITE } from "constants/index";
import { polygon } from "viem/chains";

const projectId = "6097f40a8f4f91e37e66cf3a5ca1fba2";

const metadata = {
  name: APP_NAME,
  description: DESCRIPTION,
  url: LENSPLAY_SITE,
  icons: [
    "https://pbs.twimg.com/profile_images/1633425966709211136/oZTahygd_400x400.jpg",
  ],
  redirect: {
    native: "lensplay://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};
const chains = [polygon, polygon];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});
const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_Regular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    PlusJakartaSans_Medium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    PlusJakartaSans_SemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    PlusJakartaSans_Bold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    OpenSans_Regular: require("../assets/fonts/OpenSans-Regular.ttf"),
    OpenSans_Medium: require("../assets/fonts/OpenSans-Medium.ttf"),
    OpenSans_SemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSans_Bold: require("../assets/fonts/OpenSans-Bold.ttf"),
    ...FontAwesome.font,
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <></>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <WagmiConfig config={wagmiConfig}>
        <Web3Modal />
        <SafeAreaProvider>
          <Toast />
          <NetworkStatus />
          <ApolloProvider client={client}>
            <StatusBar style="dark" />
            {children}
          </ApolloProvider>
        </SafeAreaProvider>
      </WagmiConfig>
    </GestureHandlerRootView>
  );
};

export default Provider;
