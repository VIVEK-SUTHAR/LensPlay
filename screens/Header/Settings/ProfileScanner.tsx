import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";
import { RootStackScreenProps } from "../../../types/navigation/types";

export default function ProfileScanner({
  navigation,
}: RootStackScreenProps<"ProfileScanner">) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    requestPermission();
  }, []);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

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

  const handleBarcodeScanned = React.useCallback((data) => {
    navigation.replace("Channel", {
      profileId: data?.data,
    });
  }, []);
  if (!permission) {
    return (
      <>
        <Heading
          title="We need your permission to scan QR"
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: "white",
            marginBottom: 24,
            marginHorizontal: 16,
            textAlign: "center",
          }}
        />
        <Button
          onPress={requestPermission}
          title="Allow to use camera"
          width={"auto"}
          px={24}
          py={8}
          textStyle={{
            fontSize: 20,
            fontWeight: "600",
          }}
        />
      </>
    );
  }
  if (!permission!.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Image
          style={{
            height: 300,
            width: 300,
          }}
          contentFit="contain"
          source={require("../../../assets/images/notfound.png")}
        />
        <Heading
          title="We need your permission to scan QR"
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: "white",
            marginBottom: 24,
            marginHorizontal: 16,
            textAlign: "center",
          }}
        />
        <Button
          onPress={requestPermission}
          title="Allow to use camera"
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
