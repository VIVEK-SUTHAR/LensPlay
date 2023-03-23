import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Sheet from "../components/Bottom";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { dark_primary, primary } from "../constants/Colors";
import { AUTH, GUEST_MODE } from "../constants/tracking";
import { useGuestStore } from "../store/GuestStore";
import { useProfile, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import handleWaitlist from "../utils/handleWaitlist";
import getDefaultProfile from "../utils/lens/getDefaultProfile";
import TrackAction from "../utils/Track";

// https://eth-mainnet.alchemyapi.io/v2/5Kt3LOs7L13vV5L68P94MERVJM0baCSv

function ConnectWallet({ navigation }: RootStackScreenProps<"ConnectWallet">) {
  const connector = useWalletConnect();
  const loginRef = useRef<BottomSheetMethods>();
  const { handleGuest } = useGuestStore();
  const toast = useToast();
  const { setCurrentProfile, setHasHandle } = useProfile();
  const [isloading, setIsloading] = useState<boolean>(false);

  const onPress = useCallback(() => {
    loginRef?.current?.snapToIndex(0);
  }, []);

  async function HandleDefaultProfile(adress: string) {
    const userDefaultProfile = await getDefaultProfile(adress);

    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  const connectWallet = useCallback(async () => {
    const walletData = await connector.connect();

    setIsloading(true);
    try {
      if (walletData) {
        TrackAction(AUTH.WALLET_LOGIN);
        const userData = await handleWaitlist(walletData.accounts[0]);
        if (!userData.fields.hasAccess) {
          navigation.replace("LeaderBoard", {
            referralsCount: userData?.referralsCount,
            rankingPoints: userData?.rankingPoints,
            rankingPosition: userData?.rankingPosition,
            refferalLink: `https://form.waitlistpanda.com/go/${userData?.listId}?ref=${userData?.id}`,
          });
        }

        if (userData.statusCode === 404) {
          navigation.replace("JoinWaitlist");
        }

        if (userData.fields.hasAccess) {
          await HandleDefaultProfile(walletData.accounts[0]);
          navigation.push("LoginWithLens");
        }
      } else {
        toast.show("Something went wrong", ToastType.ERROR, true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("[Error]:Error in connect wallet");
        console.log(error);
      }
    } finally {
      setIsloading(false);
    }
  }, [connector]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="light" />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 160,
        }}
      >
        <MotiView
          from={{
            transform: [{ scale: 0 }],
          }}
          animate={{
            transform: [{ scale: 1 }],
          }}
          transition={{
            delay: 100,
          }}
          style={styles.shape1}
        >
          <MotiView
            style={styles.smallShape1}
            from={{ opacity: 0 }}
            transition={{ delay: 1000 }}
            animate={{ opacity: 1 }}
          />
        </MotiView>
        <MotiView
          style={styles.shape2}
          from={{
            transform: [{ scale: 0 }],
          }}
          animate={{
            transform: [{ scale: 1 }],
          }}
          transition={{
            delay: 200,
          }}
        >
          <MotiView
            style={styles.smallShape2}
            from={{ opacity: 0 }}
            transition={{ delay: 1100 }}
            animate={{ opacity: 1 }}
          />
        </MotiView>
        <MotiView
          style={styles.shape3}
          from={{
            transform: [{ scale: 0 }],
          }}
          animate={{
            transform: [{ scale: 1 }],
          }}
          transition={{
            delay: 300,
          }}
        >
          <MotiView
            style={styles.smallShape3}
            from={{ opacity: 0 }}
            transition={{ delay: 800 }}
            animate={{ opacity: 1 }}
          />
        </MotiView>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginTop: 120,
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
            paddingHorizontal: 28,
            marginTop: 0,
          }}
        >
          <StyledText
            title={"Connect"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"&"}
            style={{
              fontSize: 28,
              color: "#56CBF9",
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
          style={{ flexDirection: "row", paddingHorizontal: 28 }}
        >
          <StyledText
            title={"Explore"}
            style={{
              fontSize: 28,
              color: "white",
              fontWeight: "600",
              textAlign: "right",
            }}
          />
          <StyledText
            title={"Lensplay"}
            style={{
              fontSize: 28,
              color: "white",
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
          width: "100%",
          marginTop: 10,
        }}
      >
        <Button
          onPress={async () => {
            onPress();
          }}
          title="Connect Wallet"
          bg={primary}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
          py={12}
          icon={<Icon name="wallet" color="black" size={24} />}
          iconPosition="left"
          animated={true}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 64,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "gray",
            borderRadius: 20,
          }}
        />
        <View>
          <StyledText
            title={"OR"}
            style={{
              width: 45,
              textAlign: "center",
              color: "gray",
              fontSize: 16,
              fontWeight: "600",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "gray",
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Button
          onPress={async () => {
            handleGuest(true);
            navigation.navigate("Root");
            TrackAction(GUEST_MODE);
          }}
          title="Continue as Guest"
          bg={dark_primary}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "white" }}
          py={12}
          icon={<Icon name="referal" color="white" size={24} />}
          iconPosition="left"
          animated={true}
        />
      </View>
      <Sheet
        ref={loginRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["45%"]}
        children={
          <View
            style={{
              paddingHorizontal: 16,
              width: "100%",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <View>
              <Heading
                title="Connect Wallet"
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "600",
                }}
              />
              <StyledText
                title="Connect with your lens handle linked wallet"
                style={{
                  color: "gray",
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              />
            </View>
            <View>
              <Button
                onPress={async () => {
                  handleGuest(false);
                  await connectWallet();
                  loginRef?.current?.close();
                }}
                title="Connect Mobile Wallet"
                bg={primary}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "black",
                }}
                py={12}
                icon={<Icon name="wallet" color="black" />}
                iconPosition="left"
                isLoading={isloading}
                animated={true}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 16,
                  paddingHorizontal: 64,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                />
                <View>
                  <StyledText
                    title={"OR"}
                    style={{
                      width: 45,
                      textAlign: "center",
                      color: "gray",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                />
              </View>

              <Button
                onPress={async () => {
                  handleGuest(false);
                  loginRef?.current?.close();
                  navigation.push("QRLogin");
                }}
                title="Connect Desktop Wallet"
                bg={"white"}
                my={16}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "black",
                }}
                py={12}
                icon={<Icon name="desktop" color="black" size={24} />}
                iconPosition="left"
                animated={true}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
export default ConnectWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  shape1: {
    width: 150,
    height: 50,
    backgroundColor: "#56CBF9",
    borderRadius: 50,
    position: "relative",
    zIndex: -1,
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 10,
  },
  shape2: {
    width: 290,
    height: 50,
    backgroundColor: "#EBDD4E",
    borderRadius: 50,
    position: "relative",
    zIndex: -1,
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 10,
    marginVertical: 20,
  },
  shape3: {
    width: 210,
    height: 50,
    backgroundColor: "#9EF01A",
    borderRadius: 50,
    position: "relative",
    zIndex: -1,
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 10,
  },
  smallShape1: {
    width: 30,
    height: 30,
    backgroundColor: "#4C9CF0",
    borderRadius: 50,
    position: "relative",
    zIndex: 1,
  },
  smallShape2: {
    width: 30,
    height: 30,
    backgroundColor: "#E5B63D",
    borderRadius: 50,
    position: "relative",
    zIndex: 1,
  },
  smallShape3: {
    width: 30,
    height: 30,
    backgroundColor: "#4FB10D",
    borderRadius: 50,
    position: "relative",
    zIndex: 1,
  },
});
