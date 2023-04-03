import React from "react";
import { RootStackScreenProps } from "../../../types/navigation/types";
import { Dimensions, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

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
      <Camera
        style={{
          width: windowWidth / 1.5,
          height: windowHeight / 3,
          borderRadius: 8,
        }}
        ratio={"1:1"}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={handleBarcodeScanned}
      ></Camera>
    </SafeAreaView>
  );
}
