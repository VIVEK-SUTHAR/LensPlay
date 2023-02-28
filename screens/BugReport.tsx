import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/UI/StyledText";
import TextArea from "../components/UI/TextArea";
import * as ImagePicker from "expo-image-picker";
import uploadImageToIPFS from "../utils/uploadImageToIPFS";
import getImageBlobFromUri from "../utils/getImageBlobFromUri";
import Button from "../components/UI/Button";
import { dark_primary, dark_secondary } from "../constants/Colors";
import Dropdown from "../components/UI/Dropdown";
import { ToastType } from "../types/Store";
import { useThemeStore } from "../store/Store";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CloseIcon from "../components/svg/CloseIcon";

export type BugCategory = {
  reason: string;
};

const BugReport = ({ navigation }: RootStackScreenProps<"BugReport">) => {
  // const [BugInfo, setBugInfo] = useState("");
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
  const [selectData, setselectData] = useState<BugCategory>({reason:"UI"});
  
  useEffect(() => {
    setBugData({
      ...BugData,
      bugType:selectData?.reason
    })
    // console.log();
    // console.log(selectData);
    
  }, [selectData])
  
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
    if (!selectData?.reason) {
      toast.show("Please select type and reason", ToastType.ERROR, true);
      return;
    }
    console.log(BugData);
    setIsUpdating(true);
    if (image) {
      const blob = await getImageBlobFromUri(image);
      const hash = await uploadImageToIPFS(blob);
      setBugData({
        ...BugData,
        imgLink: `https://ipfs.io/ipfs/${hash}`,
      });
    }
    let bodyContent = JSON.stringify(BugData);
    console.log(BugData);
    
    let response = await fetch(
      "https://bundlr-upload-server.vercel.app/api/report",
      {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    let data = await response.text();
    setIsUpdating(false);
    console.log(data);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView >
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
        />
        <View>
          {image && (
            <View>
              {/* {" "} */}
              <MaterialIcons
                onPress={()=>{setimage(null)}}
                name="close"
                size={26}
                style={{ color: "white",marginTop:4,position:"absolute",zIndex:2,right:24 }}
              />
              {/* <CloseIcon width={24} height={24} /> */}
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}
          {!image && (
            <Pressable
              style={[
                styles.image,
                { backgroundColor: dark_primary, justifyContent: "center" },
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
    width: "90%",
    borderRadius: 8,
    height: 280,
    alignSelf: "center",
  },
});
