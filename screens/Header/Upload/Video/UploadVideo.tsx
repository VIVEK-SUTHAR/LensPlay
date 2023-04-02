import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import VideoPlayer from "expo-video-player";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, View } from "react-native";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/UI/Button";
import Heading from "../../../../components/UI/Heading";
import StyledText from "../../../../components/UI/StyledText";
import { useToast } from "../../../../store/Store";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import { ToastType } from "../../../../types/Store";
import generateThumbnail from "../../../../utils/generateThumbnails";

export default function UploadVideo({
  navigation,
  route,
}: RootStackScreenProps<"UploadVideo">) {
  const [coverPic, setCoverPic] = useState<string | null>(null);
  const toast = useToast();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [thumbnails, setThumbnails] = useState<string[] | undefined>([]);
  const videoRef = useRef<Video>();

  useEffect(() => {
    generateThumbnail(route.params.localUrl, route.params.duration).then(
      (res) => {
        setThumbnails(res);
      }
    );
  }, []);

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
        style={{
          height: windowHeight / 4,
          width: "100%",
        }}
      >
        <VideoPlayer
          videoProps={{
            source: {
              uri: route?.params?.localUrl,
            },
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            volume: 0.5,
            ref: videoRef,
          }}
          style={{
            height: windowHeight / 4,
          }}
          slider={{
            visible: false,
          }}
          timeVisible={false}
          fullscreen={{
            visible: false,
          }}
        />
      </Pressable>
      <View
        style={{
          padding: 8,
          marginTop: 16,
        }}
      >
        <Heading
          title={"Select cover image"}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          flexWrap: "wrap",
        }}
      >
        {thumbnails &&
          thumbnails.map((item) => {
            return (
              <View
                style={{
                  height: windowWidth / 4,
                  width: windowHeight / 4.5,
                  marginTop: 16,
                }}
              >
                <ThumbnailCard url={item} />
              </View>
            );
          })}
        <View
          style={{
            height: windowWidth / 4,
            width: windowHeight / 4.5,
            marginTop: 16,
          }}
        >
          <Pressable
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={selectCoverImage}
          >
            {coverPic ? (
              <Image
                source={{
                  uri: coverPic,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                  borderRadius: 8,
                }}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="edit" />
                <StyledText
                  title={"Select cover"}
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                />
              </View>
            )}
          </Pressable>
        </View>
      </View>
      <View
        style={{
          padding: 8,
          marginVertical: 24,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title={"Next"}
          py={8}
          width={"30%"}
          textStyle={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
          onPress={() => {
            videoRef.current?.pauseAsync();
            navigation.navigate("AddDetails");
          }}
          bg={"white"}
        />
      </View>
    </SafeAreaView>
  );
}

const ThumbnailCard = React.memo(({ url }: { url: string }) => {
  return (
    <Image
      source={{
        uri: url,
      }}
      style={{
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        borderRadius: 4,
      }}
    />
  );
});

const ThumnailSkleton = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
      }}
    ></View>
  );
};
