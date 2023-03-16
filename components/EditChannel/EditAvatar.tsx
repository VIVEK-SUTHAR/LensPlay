import React, { useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import getImageBlobFromUri from "../../utils/getImageBlobFromUri";
import Avatar from "../UI/Avatar";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { ToastType } from "../../types/Store";
import uploadImageToIPFS from "../../utils/uploadImageToIPFS";
import { client } from "../../apollo/client";
import updateProfilePictureQuery from "../../apollo/mutations/updateProfilePictureQuery";
import { STATIC_ASSET } from "../../constants";
import Button from "../UI/Button";

export default function EditAvatar() {
  const [imageBlob, setImageBlob] = useState<Blob>();
  const [image, setImage] = useState<null | string>(null);
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const windowHeight = Dimensions.get("window").height;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const uploadToIPFS = async () => {
    setIsUpdating(true);
    if (imageBlob) {
      try {
        const imageCID = await uploadImageToIPFS(imageBlob);
        const updateOnLens = await client.mutate({
          mutation: updateProfilePictureQuery,
          variables: {
            profileId: currentProfile?.id,
            url: `ipfs://${imageCID}`,
          },
          context: {
            headers: {
              "x-access-token": `Bearer ${accessToken}`,
            },
          },
        });
        if (updateOnLens.data) {
          toast.show("Channel image updated", ToastType.SUCCESS, true);
        } else {
          toast.show("Something went wrong", ToastType.ERROR, true);
        }
      } catch (error) {
      } finally {
        setIsUpdating(false);
      }
    }
  };

  async function selectImage() {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (result.canceled) {
      toast.show("No image selected", ToastType.ERROR, true);
    }
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const imgblob = await getImageBlobFromUri(result.assets[0].uri);
      setImageBlob(imgblob);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Avatar
        src={image || 
          currentProfile?.picture?.__typename === "MediaSet" ? currentProfile?.picture?.original?.url :
          currentProfile?.picture?.uri
         || STATIC_ASSET}
        height={windowHeight / 3}
        width={windowHeight / 3}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Edit avatar"
          width={"50%"}
          type="outline"
          ripple_radius={4}
          borderColor="white"
          px={12}
          py={8}
          my={16}
          borderRadius={8}
          textStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          }}
          onPress={selectImage}
        />
        <Button
          title="Update Avatar"
          width={"50%"}
          disabled={!image ? true : false}
          ripple_radius={4}
          borderColor="white"
          px={12}
          py={8}
          my={16}
          borderRadius={8}
          textStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "black",
          }}
          animated={true}
          scale={0.8}
          isLoading={isUpdating}
          onPress={uploadToIPFS}
        />
      </View>
    </SafeAreaView>
  );
}
