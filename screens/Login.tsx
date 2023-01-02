import {
  Alert,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { client } from "../apollo/client";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import getProfile from "../apollo/Queries/getProfile";
import useStore, { useAuthStore } from "../store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import verifyToken from "../apollo/Queries/verifyToken";
import refreshCurrentToken from "../apollo/mutations/refreshCurrentToken";
import { StatusBar } from "expo-status-bar";
import Paginator from "../components/Paginator";
import SubHeading from "../components/UI/SubHeading";
import { RootStackScreenProps } from "../types";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const store = useStore();
  const authStore = useAuthStore();
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(async () => {
    await connector.connect();
    setIsconnected(true);
  }, [connector]);

  const data = [
    "https://ipfs.io/ipfs/QmfY1JJanP2cZyrcf2WBka6dzoHFjT9sH2gYcEaJJiDwfK",
    "https://ipfs.io/ipfs/QmQgwri9TtoCYWdxB9kkpC5NKwaSWHJw3MHon6Rt3oVQP7",
    "https://ipfs.io/ipfs/Qmawvbo2VvS6aF6bL1bchAXtLEwkZurbbEtMu7PxfHFoQ1",
  ];
  const { width, height } = Dimensions.get("screen");
  const imageW = width * 0.8;
  const imageH = imageW * 1.54;
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
        storeData(
          tokens.data.authenticate.accessToken,
          tokens.data.authenticate.refreshToken
        );
        navigation.navigate("Root");
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue) {
        const tokens = JSON.parse(jsonValue);
        const isvaild = await client.query({
          query: verifyToken,
          variables: {
            token: tokens.accessToken,
          },
        });
        if (isvaild.data.verify) {
          console.log("Tokens are valid,getting you in");
          store.setAccessToken(tokens.accessToken);
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
          console.log(store.accessToken);

          navigation.navigate("Root");
        }
        if (isvaild.data.verify === false) {
          const refreshToken = await client.mutate({
            mutation: refreshCurrentToken,
            variables: {
              rtoken: tokens.refreshToken,
            },
          });
          console.log("Tokens are invalid,generating new tokens...");
          store.setAccessToken(refreshToken.data.refresh.accessToken);
          storeData(
            refreshToken.data.refresh.accessToken,
            refreshToken.data.refresh.refreshToken
          );
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
          navigation.navigate("Root");
        }
      } else {
        console.log("not found");
      }
    } catch (e) {
      if (e instanceof Error) {
        //yaha sb krna
      }
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  const storeData = async (accessToken: string, refreshToken: string) => {
    try {
      const tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      const jsonValue = JSON.stringify(tokens);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          height: "100%",
        }}
      >
        {/* <View
          style={{ width: "100%", alignItems: "center", aspectRatio: 1.4 / 1 }}
        > */}
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{ uri: image }}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity,
                  },
                ]}
                blurRadius={40}
              />
            );
          })}
        </View>
        <Animated.FlatList
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 10,
                    height: 10,
                  },
                  shadowRadius: 100,
                }}
              >
                <Image
                  source={{ uri: item }}
                  style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: "cover",
                    borderRadius: 16,
                  }}
                />
              </View>
            );
          }}
        />
        {/* <Image
            source={require("../assets/images/lensplay.png")}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "center",
            }}
          /> */}
        {/* </View> */}

        {!!connector.connected ? (
          <>
            <TouchableOpacity
              style={{
                width: "80%",
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
                <SubHeading
                  title="Login with Lens"
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: "80%" }} onPress={killSession}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  paddingVertical: 16,
                  marginVertical: 10,
                }}
              >
                <SubHeading
                  title="Disconnect Wallet"
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
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
                backgroundColor: "white",
                borderRadius: 50,
                paddingVertical: 16,
                marginVertical: 30,
              }}
            >
              <SubHeading
                title="Connect Wallet"
                style={{
                  color: "black",
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        <Paginator data={data} scrollX={scrollX} />
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
