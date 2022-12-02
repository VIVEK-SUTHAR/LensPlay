import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import * as React from 'react';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { primary, secondary } from "../constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { client } from "../apollo/client";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/Queries/getAccessTokens";

const Login = ({ navigation }: { navigation: any }) => {
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(() => {
    return connector.connect().then(() => {
      setIsconnected(true);
    });
  }, [connector]);

  const logInWithLens = async () => {
    // const data = await client.query({
    //   query: getProfile,
    //   variables: {
    //     ethAddress: connector.accounts[0],
    //   },
    // });
    // if (data.data.defaultProfile) {
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
      console.log(data);
      const tokens = await client.mutate({
        mutation: getAccessTokens,
        variables: {
          address: address,
          signature: data
        },
      });
      console.log(tokens);
      if (tokens.data.authenticate.accessToken) {
        navigation.navigate("Root");
      } else {
        alert("something went wrong")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const killSession = React.useCallback(() => {
    console.log("lgging out");
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
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
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
        <View style={{ width: '100%', alignItems: "center", aspectRatio: 1.4 / 1 }}>
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
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                paddingTop: 16,
                margin: 16,
                width: '90%',
              }}>
              <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
                justifyContent: 'center',
              }}>
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
                    alignItems: "center",
                    borderRadius: 50,
                    marginLeft: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    @iamharsh.lens
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "gray", width: '100%', fontWeight: '500' }}
                  >
                    {connector.accounts[0].substring(0, 5) +
                      "..." +
                      connector.accounts[0].substring(
                        connector.accounts[0].length - 3,
                        connector.accounts[0].length
                      )}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '100%'
                }}
                onPress={async () => {
                  Vibration.vibrate(200, false);
                  await logInWithLens();
                }}
              >
                <View
                  style={{
                    backgroundColor: '#abfe2c',
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingVertical: 16,
                    marginTop: 10,
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
                    Login with Lens
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ width: '90%' }}
              onPress={killSession}
            >
              <View
                style={{
                  backgroundColor: '#FF1818',
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
            style={{ width: '100%', paddingHorizontal: 10 }}
            onPress={() => {
              Vibration.vibrate(200, false);
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
                  // width:'80%'
                }}
              >
                Connect Wallet
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView >
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
