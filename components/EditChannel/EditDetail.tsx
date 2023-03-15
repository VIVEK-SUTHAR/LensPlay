import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { client } from "../../apollo/client";
import updateChannel from "../../apollo/mutations/updateChannel";
import { dark_primary } from "../../constants/Colors";
import { useAuthStore, useProfile, useToast } from "../../store/Store";
import { Profile } from "../../types/generated";
import { ToastType } from "../../types/Store";
import formatHandle from "../../utils/formatHandle";
import getImageBlobFromUri from "../../utils/getImageBlobFromUri";
import getIPFSLink from "../../utils/getIPFSLink";
import uploadImageToIPFS from "../../utils/uploadImageToIPFS";
import Icon from "../Icon";
import Button from "../UI/Button";
import Input from "../UI/Input";
import StyledText from "../UI/StyledText";
import TextArea from "../UI/TextArea";

export default function EditDetail() {
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    youtube: "",
    website: "",
  });
  const [coverPic, setCoverPic] = useState<string | null>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [coverImageBlob, setCoverImageBlob] = useState<Blob>();
  const toast = useToast();
  const { accessToken } = useAuthStore();
  const { currentProfile } = useProfile();
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
      setCoverPic(coverresult.uri);
      const imgblob = await getImageBlobFromUri(coverresult.assets[0].uri);
      setCoverImageBlob(imgblob);
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
      setUserData({
        name: "",
        bio: "",
      });
      toast.show("Channel updated successfully", ToastType.SUCCESS, true);
    } else {
      toast.show("Some error occured please try again", ToastType.ERROR, true);
    }
  };

  const uploadMetadata = async () => {
    let coverURI = currentProfile?.coverPicture?.original.url;

    if (coverImageBlob) {
      coverURI = await uploadImageToIPFS(coverImageBlob);
    }

    const bodyContent = JSON.stringify({
      oldProfileData: currentProfile,
      newProfileData: userData,
      socialLinks: socialLinks,
      coverImage: `ipfs://${coverURI}`,
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
    updateData(currentProfile?.id, `https://arweave.net/${metadata.id}`);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      if (!userData.bio && !userData.name && !socialLinks) {
        toast.show("Please select data", ToastType.ERROR, true);
      } else {
        if (canUpload()) {
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

  const canUpload = (): boolean => {
    return (
      userData.name.length > 0 ||
      userData.bio.length > 0 ||
      socialLinks.instagram.length > 0 ||
      socialLinks.twitter.length > 0 ||
      socialLinks.website.length > 0 ||
      socialLinks.youtube.length > 0
    );
  };

  useEffect(() => {
    if (currentProfile) {
      getSocialLinks(currentProfile);
    }
  }, []);

  function getSocialLinks(profile: Profile | null) {
    const attributes = profile?.attributes ?? [];
    const website = attributes.find((item) => item.key === "website")?.value;
    const twitter = attributes.find((item) => item.key === "twitter")?.value;
    const instagram = attributes.find((item) => item.key === "instagram")
      ?.value;
    const youtube = attributes.find((item) => item.key === "youtube")?.value;
    setSocialLinks({
      instagram: instagram || "",
      website: website || "",
      youtube: youtube || "",
      twitter: twitter || "",
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
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
              uri:
                coverPic ||
                getIPFSLink(currentProfile?.coverPicture?.original.url),
            }}
            style={{
              opacity: 0.5,
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
          />
        </Pressable>
        <View style={{ padding: 16 }}>
          <Input
            label="Name"
            value={userData.name}
            placeHolder={
              currentProfile?.name || formatHandle(currentProfile?.handle)
            }
            onChange={(e) => {
              setUserData({
                name: e.nativeEvent.text,
                bio: userData.bio,
              });
            }}
          />
          <TextArea
            label="Bio"
            placeHolder={currentProfile?.bio || "What describes you..."}
            value={userData.bio}
            onChange={(e) => {
              setUserData({
                name: userData.name,
                bio: e.nativeEvent.text,
              });
            }}
          />
          <StyledText title="Social Links" style={styles.textStyle} />
          <Input
            label="Twitter"
            value={socialLinks.twitter}
            placeHolder={socialLinks.twitter}
            onChange={(e) => {
              setSocialLinks({
                ...socialLinks,
                twitter: e.nativeEvent.text,
              });
            }}
          />
          <Input
            label="Instagram"
            placeHolder={socialLinks.instagram || "@username"}
            value={socialLinks.instagram}
            onChange={(e) => {
              setSocialLinks({
                ...socialLinks,
                instagram: e.nativeEvent.text,
              });
            }}
          />
          <Input
            label="Youtube"
            placeHolder={socialLinks.youtube || "Youtube link"}
            value={socialLinks.youtube}
            onChange={(e) => {
              setSocialLinks({
                ...socialLinks,
                youtube: e.nativeEvent.text,
              });
            }}
          />
          <Input
            label="Website"
            value={socialLinks.website}
            placeHolder={socialLinks.website || "https://your-site.com"}
            onChange={(e) => {
              setSocialLinks({
                ...socialLinks,
                website: e.nativeEvent.text,
              });
            }}
          />
        </View>
        <View style={[styles.inputContainer]}>
          <Button
            title="Update details"
            width={"100%"}
            px={12}
            py={8}
            my={16}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: dark_primary,
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});