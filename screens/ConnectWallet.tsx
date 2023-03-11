import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { dark_primary, primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types/navigation/types";
import { useGuestStore } from "../store/GuestStore";
import searchUser from "../api/zooTools/searchUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "../components/UI/BottomSheet";

function ConnectWallet({ navigation }: RootStackScreenProps<"ConnectWallet">) {
  const connector = useWalletConnect();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const ref = useRef();
  const { handleGuest, isGuest } = useGuestStore();

  const connectWallet = React.useCallback(async () => {
    const data = await connector.connect();
    const access = await searchUser(data.accounts[0]);
    if (!(access.statusCode === 404)) {
      const handleUser = {
        email: access.email,
        hasAccess: access.fields.hasAccess,
      };
      await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
      if (access.fields.hasAccess) {
        navigation.push("LoginWithLens");
      }
      if (!access.fields.hasAccess) {
        navigation.push("LeaderBoard", {
          referralsCount: access.referralsCount,
          rankingPoints: access.rankingPoints,
          rankingPosition: access.rankingPosition,
          refferalLink: `https://form.waitlistpanda.com/go/${access.listId}?ref=${access.id}`,
        });
      }
    }
    else {
      navigation.navigate("JoinWaitlist");
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

      <RBSheet ref={ref} height={Dimensions.get("window").height / 2.1}>
        <View
          style={{
            maxWidth: "100%",
            height: 280,
            marginTop: 32,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              width: "100%",
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <StyledText
              title="Connect with your lens handle linked wallet"
              style={{
                color: primary,
                marginTop: 4,
                textAlign: "left",
                fontSize: 26,
                fontWeight: '600'
              }}
            />
            <View style={{marginTop: 16}}>
            <Button
              onPress={async () => {
                handleGuest(false);
                await connectWallet();
                ref?.current?.close();
                navigation.push("LoginWithLens");
              }}
              title="Connect Mobile Wallet"
              bg={primary}
              borderRadius={8}
              textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
              py={8}
              iconPosition="right"
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // paddingHorizontal: 10,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              />
              <View>
                <StyledText
                  title={"OR"}
                  style={{
                    width: 45,
                    textAlign: "center",
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              />
            </View>

            <Button
              onPress={async () => {
                handleGuest(false);
                ref?.current?.close();
                navigation.push("QRLogin");
              }}
              title="Connect Desktop Wallet"
              bg={"white"}
              my={20}
              borderRadius={8}
              textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
              py={8}
              iconPosition="right"
            />
            </View>
          </View>
        </View>
      </RBSheet>
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
        {/* <MotiView
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
          style={{ flexDirection: "row", paddingHorizontal: 28 }}
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
              color: "#9EF01A",
              fontWeight: "600",
              textAlign: "right",
              marginLeft: 8,
            }}
          />
        </MotiView> */}
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
            ref?.current?.open();
          }}
          title="Connect Wallet"
          bg={primary}
          borderRadius={8}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
          py={8}
          iconPosition="right"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        />
        <View>
          <StyledText
            title={"OR"}
            style={{
              width: 45,
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "white",
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
          }}
          title="Continue as Guest"
          bg={dark_primary}
          borderRadius={8}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "white" }}
          py={8}
          iconPosition="right"
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
