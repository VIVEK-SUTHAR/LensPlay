import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  View,
} from "react-native";
import StyledText from "../UI/StyledText";
import Heading from "../UI/Heading";
import Icon from "../Icon";
import { useUploadStore } from "../../store/UploadStore";
import { STATIC_ASSET } from "../../constants";

export default function UploadCard() {
  const { title, coverURL, uploadProgress, uploadingStatus } = useUploadStore();

  return (
    <Pressable
      android_ripple={{
        color: "gray",
      }}
      style={{
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        padding: 16,
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: coverURL || STATIC_ASSET,
          }}
          style={{
            width: 140,
            height: 80,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.4)",
            width: `${uploadProgress}%`,
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {uploadingStatus === "PROCCESSING" && <ActivityIndicator />}
        </View>
      </View>
      <View
        style={{
          height: "100%",
          width: "58%",
          marginLeft: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Heading
            title={title}
            style={{ color: "white", fontSize: 14, fontWeight: "400" }}
            numberOfLines={3}
          />
          <View
            style={{
              marginTop: 2,
            }}
          >
            <StyledText
              title={
                uploadingStatus === "UPLOADING"
                  ? `${
                      uploadingStatus.toLocaleLowerCase() + " " + uploadProgress+"%"
                    }`
                  : uploadingStatus?.toLocaleLowerCase()
              }
              style={{ color: "gray", fontSize: 12 }}
            />
          </View>
        </View>
        <Pressable>
          <Icon name="arrowDown" size={16} />
        </Pressable>
      </View>
    </Pressable>
  );
}
