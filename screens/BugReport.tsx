import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import Dropdown from "../components/UI/Dropdown";
import Input from "../components/UI/Input";
import StyledText from "../components/UI/StyledText";
import TextArea from "../components/UI/TextArea";
import { dark_primary } from "../constants/Colors";
import { useProfile, useToast } from "../store/Store";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import getImageBlobFromUri from "../utils/getImageBlobFromUri";
import uploadImageToIPFS from "../utils/uploadImageToIPFS";

export type BugCategory = {
  reason: string;
};

const BugReport = ({ navigation }: RootStackScreenProps<"BugReport">) => {
  const toast = useToast();

  const { currentProfile } = useProfile();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [BugData, setBugData] = useState({
    bugType: "",
    description: "",
    email: "",
    imgLink: "",
    username: currentProfile?.handle,
  });
  const [image, setimage] = useState(null);

  async function selectSS() {
    let coverresult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!coverresult.canceled) {
      setimage(coverresult.assets[0].uri);
    }
  }
  const [selectData, setselectData] = useState<BugCategory>({ reason: "" });

  useEffect(() => {
    setBugData({
      ...BugData,
      bugType: selectData?.reason,
    });
  }, [selectData]);

  const reportData: BugCategory[] = [
    {
      reason: "UI",
    },
    {
      reason: "Feature",
    },
    {
      reason: "Other",
    },
  ];

  async function sendReportData() {
    if (!BugData.bugType) {
      toast.show("Please select bug-type", ToastType.ERROR, true);
      return;
    }
    try {
      setIsUpdating(true);
      if (image) {
        const blob = await getImageBlobFromUri(image);
        const hash = await uploadImageToIPFS(blob);
        let bodyContent = JSON.stringify({
          ...BugData,
          imgLink: `https://ipfs.io/ipfs/${hash}`,
        });
        let response = await fetch(
          "https://lensplay-api.vercel.app/api/report",
          {
            method: "POST",
            body: bodyContent,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          let data = await response.text();
          setIsUpdating(false);
          setBugData({
            bugType: "",
            description: "",
            email: "",
            imgLink: "",
            username: currentProfile?.handle,
          });
          setselectData({ reason: "Bug Category" });
          if (image) {
            setimage(null);
          }
          toast.show("Thanks for reporting bug", ToastType.SUCCESS, true);
        }
      }
    } catch (error) {
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="black" style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
          }}
        >
          <StyledText
            title="Tell us where you found bug,we'll be happy to fix it"
            style={{ color: "white" }}
          />
        </View>
        <Dropdown
          label="Bug Category"
          data={reportData}
          onSelect={setselectData}
          width={"100%"}
        />
        <View>
          {image && (
            <View>
              <Pressable
                onPress={() => setimage(null)}
                style={{ position: "absolute", zIndex: 1, right: 16, top: 14 }}
              >
                <Icon
                  name="close"
                  size={24}
                  style={{
                    color: "white",
                  }}
                />
              </Pressable>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}
          {!image && (
            <Pressable
              style={[
                styles.image,
                {
                  backgroundColor: dark_primary,
                  justifyContent: "center",
                  width: "100%",
                  marginTop: 8,
                },
              ]}
              onPress={selectSS}
            >
              <StyledText
                title="Select Screenshot"
                style={{ color: "white", alignSelf: "center" }}
              />
            </Pressable>
          )}
          <TextArea
            label="Bug Description"
            placeHolder={"Describe the bug you found"}
            value={BugData.description}
            onChange={(e) => {
              setBugData({
                ...BugData,
                description: e.nativeEvent.text,
              });
            }}
          />
          <Input
            label="Your email"
            placeHolder={"abc@gmail.com"}
            value={BugData.email}
            onChange={(e) => {
              setBugData({
                ...BugData,
                email: e.nativeEvent.text,
              });
            }}
          />
        </View>

        <Button
          title="Report a bug"
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
          onPress={sendReportData}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BugReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  image: {
    width: "100%",
    borderRadius: 8,
    height: 280,
    marginTop: 8,
    alignSelf: "center",
    zIndex: 0,
  },
});
