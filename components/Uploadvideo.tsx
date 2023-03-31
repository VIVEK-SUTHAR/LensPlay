import {
  Dimensions,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "./UI/Button";
import { useThemeStore } from "../store/Store";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

const Uploadvideo = () => {
  const theme = useThemeStore();
  const [image, setImage] = useState<null | string>(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  async function selectImage() {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });
    if (result.cancelled) {
      ToastAndroid.show("No image selected", ToastAndroid.SHORT);
    }
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function recordVideo() {
    setImage(null);

    requestPermission();
    if (status?.granted) {
      let camera = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      if (camera.cancelled) {
        ToastAndroid.show("No Video recorded", ToastAndroid.SHORT);
      }
      if (!camera.cancelled) {
        setImage(camera.uri);
      }
    }
  }

  async function selectVideoFromGallery() {
    setImage(null);
    let camera = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [9, 16],
      quality: 1,
    });
    if (camera.cancelled) {
      ToastAndroid.show("No Video selected", ToastAndroid.SHORT);
    }
    if (!camera.cancelled) {
      setImage(camera.uri);
    }
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
      <Button
        type="outline"
        title="Select Video From Gallery "
        width={"auto"}
        my={4}
        px={24}
        borderColor={theme.PRIMARY}
        borderRadius={10}
        textStyle={{ color: "white", fontWeight: "700", fontSize: 20 }}
        onPress={selectVideoFromGallery}
      />
      <Button
        type="outline"
        title="Select Image from Gallery "
        width={"auto"}
        px={24}
        my={4}
        borderColor={theme.PRIMARY}
        borderRadius={10}
        textStyle={{ color: "white", fontWeight: "700", fontSize: 20 }}
        onPress={selectImage}
      />
      <Button
        type="outline"
        title="Record Video "
        width={"auto"}
        px={24}
        my={4}
        borderColor={theme.PRIMARY}
        borderRadius={10}
        textStyle={{ color: "white", fontWeight: "700", fontSize: 20 }}
        onPress={recordVideo}
      />
      {image && (
        <VideoPlayer
          style={{
            width: Dimensions.get("screen").width,
            height: 280,
            videoBackgroundColor: "transparent",
            controlsBackgroundColor: "transparent",
          }}
          textStyle={{
            fontSize: 14,
            fontWeight: "600",
          }}
          slider={{
            visible: true,
            thumbTintColor: "white",
            maximumTrackTintColor: "white",
            minimumTrackTintColor: "green",
          }}
          icon={{
            size: 48,
            play: <AntDesign name="play" color={"white"} size={36} />,
            pause: <AntDesign name="pause" color={"white"} size={36} />,
            replay: (
              <MaterialCommunityIcons name="replay" size={48} color={"white"} />
            ),
          }}
          header={
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 20,
                  fontSize: 18,
                  fontWeight: "600",
                  paddingVertical: 8,
                }}
              >
                {image?.name}
              </Text>
            </View>
          }
          videoProps={{
            posterStyle: {
              height: "100%",
              width: "100%",
              resizeMode: "contain",
            },
            isMuted: false,
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: image,
            },
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Uploadvideo;
