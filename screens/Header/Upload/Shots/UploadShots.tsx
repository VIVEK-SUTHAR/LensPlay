import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import {
  Camera,
  PhotoFile,
  VideoFile,
  useCameraDevices,
} from "react-native-vision-camera";
import Switch from "../../../../components/UI/Switch";
import Heading from "../../../../components/UI/Heading";
import { useSharedValue } from "react-native-reanimated";

export default function UploadShots({
  navigation,
}: RootStackScreenProps<"UploadShots">) {
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const [start, setstart] = useState(false);
  const camera = useRef<Camera>(null);
  const isPressingButton = useSharedValue(false);

  if (device == null) {
    return <ActivityIndicator size={20} color={"red"} />;
  }

  const record = async () => {
    camera?.current?.startRecording({
      flash: "on",
      onRecordingFinished: (video) => console.log(video),
      onRecordingError: (error) => console.error(error),
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessorFps={"auto"}
        video={true}
        photo={false}
      ></Camera>
    </SafeAreaView>
  );
}
