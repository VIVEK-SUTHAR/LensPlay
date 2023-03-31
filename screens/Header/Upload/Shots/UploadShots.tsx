import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function UploadShots({
  navigation,
}: RootStackScreenProps<"UploadShots">) {
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;

  if (device == null) {
    return <ActivityIndicator size={20} color={"red"} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessorFps={"auto"}
      />
    </SafeAreaView>
  );
}
