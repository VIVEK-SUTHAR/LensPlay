import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/UI/StyledText";
import TextArea from "../components/UI/TextArea";
import * as ImagePicker from "expo-image-picker";
import uploadImageToIPFS from "../utils/uploadImageToIPFS";
import getImageBlobFromUri from "../utils/getImageBlobFromUri";
import Button from "../components/UI/Button";

export type BugCategory = {
  bugType: string;
};

const BugReport = ({ navigation }: RootStackScreenProps<"BugReport">) => {
  const [BugInfo, setBugInfo] = useState("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [BugData, setBugData] = useState({
    bugType: "",
    description: "",
    email: "",
    imgLink: "",
    username: "",
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

  const reportData: BugCategory[] = [
    {
      bugType: "SENSITIVE",
      // subReason: [{ reason: "NSFW" }, { reason: "OFFENSIVE" }],
    },
    {
      bugType: "ILLEGAL",
      // subReason: [{ reason: "ANIMAL_ABUSE" }, { reason: "HUMAN_ABUSE" }],
    },
    {
      bugType: "FRAUD",
      // subReason: [{ reason: "SCAM" }, { reason: "IMPERSONATION" }],
    },
  ];
  async function sendReportData() {
    console.log(BugData);
    setIsUpdating(true)
    // let imgLink = "";
    if (image) {
      const blob = await getImageBlobFromUri(image);
      const hash = await uploadImageToIPFS(blob);
      // imgLink = `https://ipfs.io/ipfs/${hash}`;
      setBugData({
        ...BugData,
      imgLink :`https://ipfs.io/ipfs/${hash}`,
      });
    }
    let bodyContent = JSON.stringify(BugData);
    let response = await fetch(
      "https://bundlr-upload-server.vercel.app/api/report",
      {
        method: "POST",
        body: bodyContent,
        headers:{
          "Content-Type":"application/json"
        }
      }
    );

    let data = await response.text();
    setIsUpdating(false)
    console.log(data);
  }

  const [selectedData, setselectedData] = useState<BugCategory>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView>
        <Pressable
          style={{
            borderWidth: 2,
            position: "absolute",
            width: "100%",
            top: 0,
          }}
        >
          <StyledText
            title="Tell us where you found bug,we'll be happy to fix it"
            style={{ color: "white", fontSize: 16 }}
          />
        </Pressable>
        <View>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {!image && (
            <Pressable
              style={[
                styles.image,
                { backgroundColor: "gray", justifyContent: "center" },
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
              console.log(BugData.description);
            }}
          />
          <TextArea
            label="Your lens handle name"
            placeHolder={"@developer.lens"}
            value={BugData.username}
            onChange={(e) => {
              setBugData({
                ...BugData,
                username: e.nativeEvent.text,
              });
              console.log(BugData.username);
            }}
          />
          <TextArea
            label="Your email"
            placeHolder={"abc@gmail.com"}
            value={BugData.email}
            onChange={(e) => {
              setBugData({
                ...BugData,
                email: e.nativeEvent.text,
              });
              console.log(BugData.description);
            }}
          />
        </View>

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
          onPress={sendReportData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BugReport;

const styles = StyleSheet.create({
  image: {
    width: "90%",
    borderRadius: 8,
    height: 280,
    alignSelf: "center",
  },
});
