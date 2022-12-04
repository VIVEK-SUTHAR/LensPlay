import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { primary, secondary } from "../constants/Colors";
import useStore from "../store/Store";

type videoPageProp = {
  navigation: any;
  title: string;
  banner: string;
  avatar: string
  uploadedBy: string
  id: number
};

const VideoCard = ({ id, navigation, banner, title, avatar, uploadedBy }: videoPageProp) => {
  const store = useStore();
  const setCurrentIndex = store.setCurrentIndex;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("VideoPage");
        setCurrentIndex(id)
      }}
    >
      <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
        <View style={{ height: 150 }}>
          {banner ? (<Image
            source={{
              uri: `https://ipfs.io/ipfs/${banner?.split("//")[1]}`
            }}
            style={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              resizeMode: "contain",
            }}
          />) : (
            <Image
              source={require("../assets/images/lensplay.png")}
              style={{
                height: "100%",
                width: "100%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                resizeMode: "contain",
              }}
            />
          )}
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View style={{ flex: 0.95 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold" }}
              numberOfLines={1}
            >
              {title}{" "}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              By {uploadedBy} on 23 June
            </Text>
          </View>
          <View style={{ height: 40, width: 40 }}>
            <Image
              source={avatar ? {
                uri: `https://ipfs.io/ipfs/${avatar?.split("//")[1]}`,
              } : { uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80' }}
              style={{ height: "100%", width: "100%", borderRadius: 500 }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback >
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
