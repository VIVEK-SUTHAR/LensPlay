import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Constants from "expo-constants";
import { MotiView } from "moti";

function ConnectWallet({ navigation }: RootStackScreenProps<"ConnectWallet">) {
  const connector = useWalletConnect();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const connectWallet = React.useCallback(async () => {
    await connector.connect();
  }, [connector]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#93E9C8" style="dark" />
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          source={require("../assets/images/Vector257.png")}
          style={{
            width: windowWidth,
            height: windowWidth + 100,
            marginTop: -Constants.statusBarHeight / 2,
          }}
          resizeMode={"contain"}
        />
        <Image
          source={require("../assets/images/login2.png")}
          style={{
            width: windowWidth * 0.9,
            height: windowHeight / 2 + 100,
            position: "absolute",
            bottom: 30,
            right: 0,
          }}
          resizeMode={"contain"}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          marginTop: 48,
        }}
      >
        <MotiView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            type: "timing",
            duration: 1500,
            delay: 100,
          }}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingHorizontal: 34,
            marginTop: 0,
          }}
        >
          <StyledText
            title={"Fully"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Composable,"}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "600",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </MotiView>
        <MotiView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            type: "timing",
            duration: 1500,
            delay: 200,
          }}
          style={{ flexDirection: "row", paddingHorizontal: 36 }}
        >
          <StyledText
            title={"User"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Owned,"}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "600",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </MotiView>
        <MotiView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            type: "timing",
            duration: 1500,
            delay: 300,
          }}
          style={{ flexDirection: "row", paddingHorizontal: 36 }}
        >
          <StyledText
            title={"Social"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Graph."}
            style={{
              fontSize: 28,
              color: "#93E9C8",
              fontWeight: "600",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </MotiView>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          position: "absolute",
          bottom: 16,
          width: "100%",
        }}
      >
        <Button
          onPress={async () => {
            await connectWallet();
            navigation.push("LoginWithLens");
          }}
          title="Connect Wallet"
          bg="#93E9C8"
          borderRadius={50}
          textStyle={{ fontWeight: "600", fontSize: 20 }}
          py={12}
        />
      </View>
    </SafeAreaView>
  );
}
export default ConnectWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
