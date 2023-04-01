import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, SafeAreaView, View } from "react-native";
import Icon from "../../../../components/Icon";
import Heading from "../../../../components/UI/Heading";
import { STATIC_ASSET } from "../../../../constants";
import { useToast } from "../../../../store/Store";
import { ToastType } from "../../../../types/Store";
import { RootStackScreenProps } from "../../../../types/navigation/types";
import getImageBlobFromUri from "../../../../utils/getImageBlobFromUri";
import Button from "../../../../components/UI/Button";
import StyledText from "../../../../components/UI/StyledText";

export default function UploadVideo({
  navigation,
}: RootStackScreenProps<"UploadVideo">) {
  const [coverPic, setCoverPic] = useState<string | null>(null);
  const [coverImageBlob, setCoverImageBlob] = useState<Blob>();
  const toast = useToast();

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

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
        style={{
          height: windowHeight / 4,
          width: "100%",
        }}
      >
        <Image
          source={{
            uri: STATIC_ASSET,
          }}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
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
        {[...Array(5)].map(() => (
          <View
            style={{
              height: windowWidth / 4,
              width: windowHeight / 4.5,
              marginTop: 16,
            }}
          >
            <Image
              source={{
                uri: STATIC_ASSET,
              }}
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
        ))}
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
                  title={"select cover"}
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
          bg={"white"}
        />
      </View>
    </SafeAreaView>
  );
}
