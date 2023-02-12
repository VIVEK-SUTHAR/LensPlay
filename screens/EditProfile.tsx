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
import { useAuthStore, useThemeStore, useToast } from "../store/Store";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import updateChannel from "../apollo/mutations/updateChannel";
import { client } from "../apollo/client";
import Avatar from "../components/UI/Avatar";

const EditProfile = ({
  navigation,
  route,
}: RootStackScreenProps<"EditProfile">) => {
  const theme = useThemeStore();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
      toast.show("Some error occured please try again", ToastType.ERROR, true);
    }
  };

  const uploadMetadata = async () => {
    if (userData.name.length > 0 || userData.bio.length > 0) {
      setUserData({
        name: "",
        bio: "",
      });
      setIsUpdating(true);
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
              src={route.params.profile?.picture?.original?.url}
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
            onPress={() => uploadMetadata()}
          />
        </View>
      </ScrollView>
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
