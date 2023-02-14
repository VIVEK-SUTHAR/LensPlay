import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { dark_primary } from "../constants/Colors";
import StyledText from "../components/UI/StyledText";
import {
  useAuthStore,
  useProfile,
  useThemeStore,
  useToast,
} from "../store/Store";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import updateChannel from "../apollo/mutations/updateChannel";
import { client } from "../apollo/client";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/UI/Avatar";
import formatHandle from "../utils/formatHandle";
import updateProfilePictureQuery from "../apollo/mutations/updateProfilePictureQuery";
import getImageBlobFromUri from "../utils/getImageBlobFromUri";
import uploadImageToIPFS from "../utils/uploadImageToIPFS";

const EditProfile = ({
  navigation,
  route,
}: RootStackScreenProps<"EditProfile">) => {
  const theme = useThemeStore();

  const [image, setImage] = useState<null | string>(null);

  const [imageBlob, setImageBlob] = useState<Blob>();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [userData, setUserData] = useState({
    name: "",
    bio: "",
  });
  const toast = useToast();
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
  const uploadToIPFS = async () => {
    if (imageBlob) {
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
        if (!userData.bio.length && !userData.name.length) {
          toast.show("Channel image updated", ToastType.SUCCESS, true);
        }
        if (
          userData.bio.length > 0 ||
          (userData.name.length > 0 && imageBlob)
        ) {
          return;
        }
      }
    }
  };

  async function selectImage() {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
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

  const updateData = async (
    profileId: string | undefined,
    metadataUrl: string
  ) => {
    const result = await client.mutate({
      mutation: updateChannel,
      variables: {
        profileId: profileId,
        metadata: metadataUrl,
      },
      context: {
        headers: {
          "x-access-token": `Bearer ${accessToken}`,
        },
      },
    });
    if (result.data) {
      toast.show("Channel updated successfully", ToastType.SUCCESS, true);
    } else {
      toast.show("Some error occured please try again", ToastType.ERROR, true);
    }
  };

  const uploadMetadata = async () => {
    setUserData({
      name: "",
      bio: "",
    });
    const bodyContent = JSON.stringify({
      oldProfileData: route.params.profile,
      newProfileData: userData,
    });
    const headersList = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://bundlr-upload-server.vercel.app/api/upload/profileMetadata",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    const metadata = await response.json();
    updateData(route.params.profile?.id, `https://arweave.net/${metadata.id}`);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      if (!imageBlob && !userData.bio && !userData.name) {
        toast.show("Please select data", ToastType.ERROR, true);
      } else {
        if (imageBlob) {
          await uploadToIPFS();
        }
        if (userData.name.length > 0 || userData.bio.length > 0) {
          await uploadMetadata();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show("Something went wronng", ToastType.ERROR, true);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={styles.inputContainer}>
          <StyledText title="Profile Picture" style={styles.textStyle} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Avatar
              src={image ? image : route.params.profile?.picture?.original?.url}
              height={96}
              width={96}
            />
            <Button
              title="Select from Gallery"
              width={"auto"}
              borderRadius={8}
              px={16}
              textStyle={{
                color: "white",
              }}
              borderColor={theme.PRIMARY}
              type="outline"
              onPress={selectImage}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <StyledText title="Name" style={styles.textStyle} />
          <TextInput
            onChange={(e) => {
              setUserData({
                name: e.nativeEvent.text,
                bio: userData.bio,
              });
            }}
            style={styles.input}
            placeholder={
              route.params.profile?.name ||
              formatHandle(route.params.profile?.handle)
            }
            placeholderTextColor="gray"
            selectionColor={theme.PRIMARY}
            value={userData.name}
          />
        </View>
        <View style={styles.inputContainer}>
          <StyledText title="Bio" style={styles.textStyle} />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[
              styles.input,
              {
                textAlignVertical: "top",
              },
            ]}
            placeholder={route.params.profile?.bio}
            placeholderTextColor="gray"
            selectionColor={theme.PRIMARY}
            value={userData.bio}
            onChange={(e) => {
              setUserData({
                name: userData.name,
                bio: e.nativeEvent.text,
              });
            }}
          />
        </View>
      </ScrollView>
      <View style={[styles.inputContainer]}>
        <Button
          title="Update"
          width={"100%"}
          px={12}
          py={8}
          borderRadius={8}
          textStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
          isLoading={isUpdating}
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    padding: 16,
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 8,
  },
  input: {
    backgroundColor: dark_primary,
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
