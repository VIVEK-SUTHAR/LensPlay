import React, { useEffect, useRef } from "react";
import { RootStackScreenProps } from "../../../types/navigation/types";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Heading from "../../../components/UI/Heading";
import { useThemeStore } from "../../../store/Store";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function ProfileScanner({
  navigation,
}: RootStackScreenProps<"ProfileScanner">) {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  function isValidQR(data: any) {
    try {
    } catch (e) {
      return false;
    }
  }

  const scaleValue = useSharedValue(0);

  const scalestyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scaleValue.value, [0, 1], [1, 0]) }],
    };
  });
  const handleBarcodeScanned = async (data: any) => {
    console.log(data.data);
    navigation.replace("Channel", {
      profileId: data?.data,
    });
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
      <StatusBar backgroundColor="transparent" />

      <View
        style={{
          position: "absolute",
          top: Constants.statusBarHeight + 10,
          zIndex: 50,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Heading
          title="Scan LensPlay QR Code"
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          }}
        />
      </View>
      <Animated.View style={[styles.scanner, scalestyle]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderLeftColor: "white",
              borderLeftWidth: 6,
              borderTopColor: "white",
              borderTopWidth: 6,
              borderTopStartRadius: 8,
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
              borderTopEndRadius:8
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
              borderBottomStartRadius: 8,
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
              borderBottomEndRadius: 8,
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
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleBarcodeScanned}
      ></Camera>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scanner: {
    position: "absolute",
    height: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width * 0.7,
    top: Dimensions.get("window").height / 2.5,
    backgroundColor: "transparent",
    zIndex: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    // borderColor: "white",
  },
});
