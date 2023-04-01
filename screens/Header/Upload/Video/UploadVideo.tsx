import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Icon from "../../../../components/Icon";
import Heading from "../../../../components/UI/Heading";
import { STATIC_ASSET } from "../../../../constants";
import { useToast } from "../../../../store/Store";
import { ToastType } from "../../../../types/Store";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import getImageBlobFromUri from "../../../../utils/getImageBlobFromUri";

export default function UploadVideo({
  navigation,
}: RootStackScreenProps<"UploadVideo">) {
  const [coverPic, setCoverPic] = useState<string | null>(null);
  const [coverImageBlob, setCoverImageBlob] = useState<Blob>();
  const toast = useToast();

  const windowHeight = Dimensions.get("window").height;

  async function selectCoverImage() {
    let coverresult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [2, 1],
      base64: true,
    });
    if (coverresult.canceled) {
      toast.show("No image selected", ToastType.ERROR, true);
    }
    if (!coverresult.canceled) {
      setCoverPic(coverresult.assets[0].uri);
      const imgblob = await getImageBlobFromUri(coverresult.assets[0].uri);
      setCoverImageBlob(imgblob);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Pressable
        onPress={selectCoverImage}
        style={{
          height: windowHeight / 4,
          width: "100%",
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.02)",
            zIndex: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="edit" />
        </View>
        <Image
          source={{
            uri: coverPic || STATIC_ASSET,
          }}
          style={{
            opacity: 0.5,
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </Pressable>
      <View
        style={{
          padding: 8,
          marginVertical: 16,
        }}
      >
        <Heading
          title={"Title"}
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
        <TextInput
          placeholder="Add title for your video"
          placeholderTextColor={"gray"}
          numberOfLines={2}
          textAlignVertical="top"
          style={{
            color: "white",
            fontSize: 20,
            paddingVertical: 8,
            marginVertical: 4,
          }}
        />
      </View>
      <Pressable
        android_ripple={{
          color: "gray",
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderTopColor: "gray",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <Heading
          title="Add description"
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        />
        <Icon name="arrowForward" size={16} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
