import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { client } from "../apollo/client";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import getProfile from "../apollo/Queries/getProfile";
import useStore from "../store/Store";

const Login = ({ navigation }: { navigation: any }) => {
  const store = useStore();
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(() => {
    return connector.connect().then(() => {
      setIsconnected(true);
    });
  }, [connector]);

  const logInWithLens = async () => {
    const data = await client.query({
      query: getProfile,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    if (!data.data.defaultProfile) {
      return;
    }
    store.setProfileId(data.data.defaultProfile.id);
    const challengeText = await client.query({
      query: getChallenge,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    try {
      const data = await connector.sendCustomRequest({
        method: "personal_sign",
        params: [connector.accounts[0], challengeText.data.challenge.text],
      });
      const address = connector.accounts[0];
      const tokens = await client.mutate({
        mutation: getAccessTokens,
        variables: {
          address: address,
          signature: data,
        },
      });
      if (tokens.data.authenticate.accessToken) {
        store.setAccessToken(tokens.data.authenticate.accessToken);
        console.log(tokens.data.authenticate.accessToken);
        console.log(tokens.data.authenticate.refreshToken);
        navigation.navigate("Root");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View
          style={{ width: "100%", alignItems: "center", aspectRatio: 1.4 / 1 }}
        >
          <Image
            source={require("../assets/images/lensplay.png")}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "center",
            }}
          />
        </View>
        {!!connector.connected ? (
          <>
            <TouchableOpacity
              style={{
                width: "90%",
              }}
              onPress={async () => {
                await logInWithLens();
              }}
            >
              <View
                style={{
                  backgroundColor: "#abfe2c",
                  borderRadius: 50,
                  paddingVertical: 16,
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/images/lens.png")}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: "contain",
                    marginHorizontal: 4,
                  }}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Login with Lens
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "90%" }} onPress={killSession}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  paddingVertical: 16,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Disconnect Wallet
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={{ width: "100%", paddingHorizontal: 10 }}
            onPress={() => {
              connectWallet();
            }}
          >
            <View
              style={{
                backgroundColor: primary,
                borderRadius: 50,
                paddingVertical: 16,
                marginVertical: 10,
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
    backgroundColor: dark_primary,
  },
});
