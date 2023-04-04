import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withDelay,
  withTiming,
  Extrapolation,
} from "react-native-reanimated";
import Icon from "../../../components/Icon";
import Heading from "../../../components/UI/Heading";
import { RootStackScreenProps } from "../../../types/navigation/types";

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

  const scale = useSharedValue(0);

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
  const handleBarcodeScanned = async (data: any) => {
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
      {/* <View
        style={{
          position: "absolute",
          bottom: 100,
          right:45,
          height: 50,
          width: 50,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 5,
          borderRadius: 50,
          justifyContent: "center",
          alignItems:"center"
        }}
      >
        <Icon name="close"/>
      </View> */}
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
          title="Scan profile QR"
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
    width: 220,
    height: 220,
    zIndex: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
