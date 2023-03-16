import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet, View
} from "react-native";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { primary } from "../constants/Colors";
import { useAuthStore, useProfile, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import decryptData from "../utils/decryptData";
import handleWaitlist from "../utils/handleWaitlist";
import getDefaultProfile from "../utils/lens/getDefaultProfile";
import getTokens from "../utils/lens/getTokens";
import storeTokens from "../utils/storeTokens";

export default function Scanner({
  navigation,
}: RootStackScreenProps<"Scanner">) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasData, setHasData] = useState<boolean>(false);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const { setCurrentProfile, setHasHandle } = useProfile();
  const toast = useToast();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Heading
          title="We need your permission to scan QR"
          style={{
            fontSize: 32,
            fontWeight: "600",
            color: "white",
            marginBottom: 24,
            textAlign: "center",
          }}
        />
        <Button
          onPress={requestPermission}
          title="Grant permission"
          width={"auto"}
          px={24}
          py={8}
          textStyle={{
            fontSize: 20,
            fontWeight: "600",
          }}
        />
      </View>
    );
  }

  async function HandleDefaultProfile(adress: string) {
    const userDefaultProfile = await getDefaultProfile(adress);
    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  const handleBarcodeScanned = async (data) => {
    setHasData(false);
    if (data) {
      setHasData(true);
      try {
        const signature = JSON.parse(data.data).signature;
        const address = JSON.parse(data.data).address;
        if (!signature && !address) {
          toast.show("QR Expired, Please regenerate", ToastType.ERROR, true);
          return;
        }
        const decryptedSignature = await decryptData(signature);
        const userData = await handleWaitlist(address);

        if (!userData.fields.hasAccess) {
          navigation.replace("LeaderBoard", {
            referralsCount: userData.referralsCount,
            rankingPoints: userData.rankingPoints,
            rankingPosition: userData.rankingPosition,
            refferalLink: `https://form.waitlistpanda.com/go/${userData.listId}?ref=${userData.id}`,
          });
        }

        if (userData?.statusCode === 404) {
          navigation.replace("JoinWaitlist");
          return;
        }

        if (userData.fields.hasAccess) {
          const tokens = await getTokens({
            address,
            signature: decryptedSignature,
          });
          setAccessToken(tokens?.accessToken);
          setRefreshToken(tokens?.refreshToken);
          await storeTokens(tokens?.accessToken, tokens?.refreshToken, true);
          await HandleDefaultProfile(address);
          await AsyncStorage.setItem("@viaDeskTop", "true");
          navigation.replace("Root");
        }
      } catch (error) {
        console.log("[Error]:Error in QR Login");
        throw new Error("[Error]:Error in QR Login", {
          cause: error,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {hasData ? (
        <ActivityIndicator size={"large"} color={primary} />
      ) : (
        <View
          style={{
            borderWidth: 4,
            borderColor: "white",
            borderRadius: 8,
          }}
        >
          <Camera
            style={{
              width: windowWidth / 1.5,
              height: windowHeight / 3,
              borderRadius: 8,
            }}
            ratio={"1:1"}
            onBarCodeScanned={handleBarcodeScanned}
          ></Camera>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
/* @end */
