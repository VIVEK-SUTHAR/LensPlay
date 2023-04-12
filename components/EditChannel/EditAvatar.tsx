import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { SETTINGS } from "../../constants/tracking";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { useCreateSetProfileImageUriViaDispatcherMutation } from "../../types/generated";
import { ToastType } from "../../types/Store";
import getImageBlobFromUri from "../../utils/getImageBlobFromUri";
import getRawurl from "../../utils/getRawUrl";
import TrackAction from "../../utils/Track";
import uploadImageToIPFS from "../../utils/uploadImageToIPFS";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";

export default function EditAvatar() {
  const [imageBlob, setImageBlob] = useState<Blob>();
  const [image, setImage] = useState<null | string>(null);
  const toast = useToast();
  const { currentProfile } = useProfile();
  const { accessToken } = useAuthStore();
  const windowHeight = Dimensions.get("window").height;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [
    createSetProfileImageUriViaDispatcherMutation,
  ] = useCreateSetProfileImageUriViaDispatcherMutation({
    onCompleted: () => {
      setIsUpdating(false);
      toast.show("Channel image updated", ToastType.SUCCESS, true);
    },
    onError: () => {
      setIsUpdating(false);
      toast.show("Something went wrong", ToastType.ERROR, true);
    },
  });

  const uploadToIPFS = async () => {
    setIsUpdating(true);
    if (imageBlob) {
      try {
        const imageCID = await uploadImageToIPFS(imageBlob);
        createSetProfileImageUriViaDispatcherMutation({
          variables: {
            request: {
              profileId: currentProfile?.id,
              url: `ipfs://${imageCID}`,
            },
          },
          context: {
            headers: {
              "x-access-token": `Bearer ${accessToken}`,
            },
          },
        });
        TrackAction(SETTINGS.PROFILE.UPDATE_AVATAR);
      } catch (error) {}
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
    if (result.cancelled) {
      toast.show("No image selected", ToastType.ERROR, true);
    }
    if (!result.cancelled) {
      setImage(result.uri);
      const imgblob = await getImageBlobFromUri(result.uri);
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
        height: windowHeight,
      }}
    >
      <Avatar
        src={image || getRawurl(currentProfile?.picture)}
        height={windowHeight / 3}
        width={windowHeight / 3}
      />
      <View
        style={{
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "20%",
        }}
      >
        <Button
          title="Edit avatar"
          width={"50%"}
          type="outline"
          borderColor="white"
          px={12}
          py={8}
          my={24}
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
          borderColor="white"
          px={12}
          py={8}
          my={78}
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
