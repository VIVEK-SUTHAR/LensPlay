import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { AUTH } from "../../constants/tracking";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import { useAuthenticateMutation } from "../../types/generated";
import { RootStackScreenProps } from "../../types/navigation/types";
import TrackAction from "../../utils/Track";
import decryptData from "../../utils/decryptData";
import getDefaultProfile from "../../utils/lens/getDefaultProfile";
import storeTokens from "../../utils/storeTokens";
export default function Scanner({
  navigation,
}: RootStackScreenProps<"Scanner">) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasData, setHasData] = useState<boolean>(false);
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const { setCurrentProfile, setHasHandle, hasHandle } = useProfile();
  const toast = useToast();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const scale = useSharedValue(0);

  const [
    getTokens,
    { data: tokens, error: tokensError, loading: tokenLoading },
  ] = useAuthenticateMutation();

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [1, 0], [1.15, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, {
        duration: 1000,
      }),
      -1,
      true
    );
  }, []);

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

  async function HandleDefaultProfile(adress: string): Promise<boolean> {
    const userDefaultProfile = await getDefaultProfile(adress);

    if (userDefaultProfile) {
      setCurrentProfile(userDefaultProfile);

      return true;
    } else {
      setHasHandle(false);

      return false;
    }
  }

  function isValidQR(data: any) {
    try {
      const parsedData = JSON.parse(data);

      if (parsedData?.signature && parsedData?.address) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  const handleBarcodeScanned = async (data: any) => {
    if (hasData) return;
    const isValidData = isValidQR(data?.data);

    if (!isValidData) {
      toast.show("Invalid QR", ToastType.ERROR, true);
      return;
    }

    if (isValidData) {
      const signature = JSON.parse(data.data).signature;
      const address = JSON.parse(data.data).address;
      try {
        setHasData(true);
        const decryptedSignature = await decryptData(signature);

        const result = await HandleDefaultProfile(address);
        await AsyncStorage.setItem("@viaDeskTop", "true");

        if (!result) {
          navigation.replace("LoginWithLens");
          return;
        }

        if (result) {
          setHasHandle(true);
          const tokens = await getTokens({
            variables: {
              request: {
                address: address,
                signature: decryptedSignature,
              },
            },
          });
          if (!tokens) {
            setHasData(false);
            toast.show("Please regenerate QR", ToastType.ERROR, true);
            return;
          }
          setAccessToken(tokens?.data?.authenticate?.accessToken);
          setRefreshToken(tokens?.data?.authenticate?.refreshToken);
          await storeTokens(
            tokens?.data?.authenticate?.accessToken,
            tokens?.data?.authenticate?.refreshToken,
            true
          );
          await AsyncStorage.setItem("@viaDeskTop", "true");
          navigation.replace("Root");
          TrackAction(AUTH.QR_LOGIN);
        }
      } catch (error) {
        if (error instanceof Error) {
          // console.log("[Error]:Error in Scanner", error);
          // throw new Error("[Error]:Error in Scanner", {
          //   cause: error,
          // });
        }
      } finally {
        setHasData(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {hasData && (
        <View
          style={{
            position: "absolute",
            height: Dimensions.get("screen").height,
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ActivityIndicator color={"#2A9D5C"} size="large" />
          <StyledText
            title="Getting you in..."
            style={{
              marginHorizontal: 12,
              color: "white",
              fontSize: 18,
              fontWeight: "700",
            }}
          />
        </View>
      )}
      <StatusBar backgroundColor="transparent" />
      <View
        style={{
          position: "absolute",
          top: Constants.statusBarHeight + 10,
          zIndex: 50,
          backgroundColor: "rgba(0,0,0,0.4)",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
        }}
      >
        <Heading
          title="Scan Desktop QR"
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
      </View>
      <Animated.View style={[styles.scanner, scaleStyle]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderLeftColor: "white",
              borderLeftWidth: 6,
              borderTopColor: "white",
              borderTopWidth: 6,
              borderRadius: 8,
            }}
          ></View>
          <View
            style={{
              height: 50,
              width: 50,
              borderRightColor: "white",
              borderRightWidth: 6,
              borderTopColor: "white",
              borderTopWidth: 6,
              borderRadius: 8,
            }}
          ></View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderLeftColor: "white",
              borderLeftWidth: 6,
              borderBottomColor: "white",
              borderBottomWidth: 6,
              borderRadius: 8,
            }}
          ></View>
          <View
            style={{
              height: 50,
              width: 50,
              borderBottomColor: "white",
              borderBottomWidth: 6,
              borderRightColor: "white",
              borderRightWidth: 6,
              borderRadius: 8,
            }}
          ></View>
        </View>
      </Animated.View>
      <Camera
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
        ratio={"16:9"}
        autoFocus={true}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleBarcodeScanned}
      ></Camera>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  scanner: {
    position: "absolute",
    width: 220,
    height: 220,
    zIndex: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});