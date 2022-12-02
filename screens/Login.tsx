import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { primary, secondary } from "../constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { stringifyForDisplay } from "@apollo/client/utilities";
import { MaterialIcons } from "@expo/vector-icons";

const Login = ({ navigation }: { navigation: any }) => {
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(() => {
    return connector.connect().then(() => {
      setIsconnected(true);
    });
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Text
          style={{
            fontSize: 44,
            fontWeight: "800",
            textAlign: "center",
            // top: "20%",
          }}
        >
          Welcome to{" "}
          <Text
            style={{
              fontSize: 64,
              color: primary,
            }}
          >
            LensPlay
          </Text>
        </Text>
        <View style={{ height: 350, width: 400, alignItems: "center" }}>
          <Image
            source={require("../assets/images/lensplay.png")}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "center",
              // top: "20%",
            }}
          />
        </View>
        {!!connector.connected && (
          <>
            <View
              style={{
                height: 70,
                padding: 1,
                backgroundColor: primary,
                borderRadius: 50,
                display: "flex",
                // flex: 0.9,
                flexDirection: "row",
                width: "80%",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/test.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  alignItems: "center",
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  // borderWidth: 2,
                  borderRadius: 50,
                  padding: 5,
                  height: 40,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{ fontSize: 23, marginHorizontal: 10, color: "black" }}
                >
                  {connector.accounts[0].substring(0, 5) +
                    "..." +
                    connector.accounts[0].substring(
                      connector.accounts[0].length - 3,
                      connector.accounts[0].length
                    )}
                </Text>
                {/* <MaterialIcons
                  name="content-copy"
                  size={24}
                  color="black"
                  style={{ marginHorizontal: 10 }}
                /> */}
              </View>
              <EvilIcons name="chevron-down" size={24} color="black" />
            </View>
          </>
        )}
        {!!connector.connected ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Root");
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                // padding: 15,
                marginVertical: 40,
                // marginTop:30,
                height: 70,
                width: 300,
                // display: "flex",
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Login with Lens
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={connectWallet}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 15,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                  // width:'80%'
                }}
              >
                Connect Wallet
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
