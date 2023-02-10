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
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { client } from "../apollo/client";
import getChallenge from "../apollo/Queries/getChallenge";
import getAccessTokens from "../apollo/mutations/getAccessTokens";
import getProfile from "../apollo/Queries/getProfile";
import useStore, { useAuthStore, useProfile } from "../store/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import verifyToken from "../apollo/Queries/verifyToken";
import refreshCurrentToken from "../apollo/mutations/refreshCurrentToken";
import { StatusBar } from "expo-status-bar";
import Paginator from "../components/Paginator";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import Button from "../components/UI/Button";
import formatTime from "../utils/formatTime";
import storeData from "../utils/storeData";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const store = useStore();
  const authStore = useAuthStore();
  const userStore = useProfile();
  const [isloading, setIsloading] = useState<boolean>(false);
  const connector = useWalletConnect();
  const [isconnected, setIsconnected] = useState<boolean>(false);
  const connectWallet = React.useCallback(async () => {
    await connector.connect();
    setIsconnected(true);
  }, [connector]);

  useEffect(() => {
    // navigation.addListener("focus", getData);
  }, []);

  const data = [
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534829/landing-1_lrrjd1.webp",
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534829/landing-2_byfsnm.webp",
    "https://res.cloudinary.com/djkwixcg8/image/upload/v1674534828/landing-3_gatvjy.webp",
  ];

  const { width } = Dimensions.get("screen");
  const imageW = width * 0.8;
  const imageH = imageW * 1.54;

  const logInWithLens = async () => {
    setIsloading(true);
    const data = await client.query({
      query: getProfile,
      variables: {
        ethAddress: connector.accounts[0],
      },
    });
    if (!data.data.defaultProfile) {
      return;
    }
    userStore.setCurrentProfile(data.data.defaultProfile);
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
        authStore.setAccessToken(tokens.data.authenticate.accessToken);
        authStore.setRefreshToken(tokens.data.authenticate.refreshToken);
        storeData(
          tokens.data.authenticate.accessToken,
          tokens.data.authenticate.refreshToken
        );
        setIsloading(false);
        navigation.navigate("Root");
      } else {
        setIsloading(false);
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setIsloading(false);
      }
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
        }}
      >
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
        {!!connector.connected ? (
          <>
            <Button
              title="Login With Lens"
              bg={"#abfe2c"}
              my={10}
              py={16}
              textStyle={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              width={"80%"}
              onPress={async () => {
                await logInWithLens();
              }}
              isLoading={isloading}
            />
            <TouchableOpacity style={{ width: "80%" }} onPress={killSession}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  paddingVertical: 16,
                  marginVertical: 10,
                }}
              >
                <StyledText
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
              <StyledText
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
    backgroundColor: "black",
  },
});
