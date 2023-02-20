import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Profile } from "../types/Lens";
import Input from "../components/UI/Input";
import getIPFSLink from "../utils/getIPFSLink";
import { Feather } from "@expo/vector-icons";
import TextArea from "../components/UI/TextArea";
import { STATIC_ASSET } from "../constants";

const EditProfile = ({
  navigation,
  route,
}: RootStackScreenProps<"EditProfile">) => {
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
  const [image, setImage] = useState<null | string>(null);
  const [coverPic, setCoverPic] = useState<string | null>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [coverImageBlob, setCoverImageBlob] = useState<Blob>();
  const [imageBlob, setImageBlob] = useState<Blob>();

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
  async function selectCoverImage() {
    let coverresult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (coverresult.cancelled) {
      toast.show("No image selected", ToastType.ERROR, true);
    }
    if (!coverresult.cancelled) {
      setCoverPic(coverresult.uri);
      const imgblob = await getImageBlobFromUri(coverresult.uri);
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
    let coverURI = route.params.profile?.coverPicture?.original.url;

    if (coverImageBlob) {
      coverURI = await uploadImageToIPFS(coverImageBlob);
    }

    const bodyContent = JSON.stringify({
      oldProfileData: route.params.profile,
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
    updateData(route.params.profile?.id, `https://arweave.net/${metadata.id}`);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      if (!imageBlob && !userData.bio && !userData.name && !socialLinks) {
        toast.show("Please select data", ToastType.ERROR, true);
      } else {
        if (imageBlob) {
          await uploadToIPFS();
        }
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
    getSocialLinks(route.params.profile);
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
            height: 140,
            width: "100%",
            marginBottom: 34,
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
            <Feather name="edit" size={28} color={"white"} />
          </View>
          <Image
            source={{
              uri:
                coverPic ||
                getIPFSLink(route.params.profile?.coverPicture?.original.url),
            }}
            style={{
              opacity: 0.5,
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
          />
        </Pressable>
        <Pressable
          onPress={selectImage}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginLeft: 8,
            marginTop: "-20%",
            zIndex: 12,
          }}
        >
          <View
            style={{
              position: "absolute",
              height: 90,
              width: 90,
              borderRadius: 50,
              backgroundColor: "rgba(255,255,255,0.09)",
              zIndex: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="edit" size={28} color={"white"} />
          </View>
          <Avatar
            src={
              image ||
              route.params.profile?.picture?.original?.url ||
              STATIC_ASSET
            }
            height={90}
            opacity={0.5}
            width={90}
            borderRadius={50}
          />
        </Pressable>
        <View style={{ padding: 16 }}>
          <Input
            label="Name"
            value={userData.name}
            placeHolder={
              route.params.profile?.name ||
              formatHandle(route.params.profile?.handle)
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
            placeHolder={route.params.profile?.bio || "What describes you..."}
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
            placeHolder={socialLinks.instagram || "Instagram @username"}
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
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
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
