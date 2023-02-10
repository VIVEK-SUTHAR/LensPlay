import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { dark_primary } from "../constants/Colors";
import StyledText from "../components/UI/StyledText";
import { useAuthStore, useThemeStore, useToast } from "../store/Store";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import { useUpdateChannel } from "../hooks/useFeed";
import { useQuery } from "@apollo/client";
import updateChannel from "../apollo/mutations/updateChannel";
import { client } from "../apollo/client";

const EditProfile = ({
  navigation,
  route,
}: RootStackScreenProps<"EditProfile">) => {
  const theme = useThemeStore();
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
  });
  const toast = useToast();
  const { accessToken } = useAuthStore();

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
    if (userData.name.length > 0 || userData.bio.length > 0) {
      setUserData({
        name: "",
        bio: "",
      });

      const bodyContent = JSON.stringify({
        oldProfileData: route.params.profile,
        newProfileData: userData,
      });

      const response = await fetch(
        "https://bundlr-upload-server.vercel.app/api/upload/profileMetadata",
        {
          method: "POST",
          body: bodyContent,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const metadata = await response.json();
      updateData(
        route.params.profile?.id,
        `https://arweave.net/${metadata.id}`
      );
    } else {
      toast.show("Please enter data", ToastType.ERROR, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View
        style={[styles.inputContainer, { position: "absolute", bottom: 16 }]}
      >
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
          onPress={() => uploadMetadata()}
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
