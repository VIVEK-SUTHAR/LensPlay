import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SafeAreaView,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import Icon from "../../../../components/Icon";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import Constants from "expo-constants";
import ProgressBar from "../../../../components/UI/ProgressBar";
export default function UploadShots({
  navigation,
}: RootStackScreenProps<"UploadShots">) {
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const [start, setstart] = useState(false);
  const camera = useRef<Camera>(null);
  const isPressingButton = useSharedValue(false);
  const [isRecording, setIsRecording] = useState(false);
  const [value, setValue] = useState(0.0);
  if (device == null) {
    return <ActivityIndicator size={20} color={"red"} />;
  }

  const record = async () => {
    if (!isRecording) {
      camera?.current?.startRecording({
        flash: "on",
        onRecordingFinished: (video) => {
          setIsRecording(false);
        },
        onRecordingError: (error) => console.error(error),
      });
    }
    camera?.current?.stopRecording();
  };
  const statubarHeight = Constants.statusBarHeight;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          borderRadius: 50,
          backgroundColor: "red",
          zIndex: 78,
          top: statubarHeight,
          alignSelf: "center",
        }}
      >
        <ProgressBar progress={value} />
      </View>
      <Pressable
        style={{
          position: "absolute",
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: "white",
          zIndex: 78,
          bottom: Dimensions.get("screen").height * 0.05,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={record}
      >
        <Icon name={isRecording ? "pause" : "record"} color="black" size={48} />
      </Pressable>
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
