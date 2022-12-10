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
  avatar: string;
  uploadedBy: string;
  playbackId: string;
  id: number;
};

const VideoCard = ({
  id,
  navigation,
  banner,
  title,
  avatar,
  uploadedBy,
  playbackId,
}: videoPageProp) => {
  const store = useStore();
  const setCurrentIndex = store.setCurrentIndex;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setCurrentIndex(id);
        navigation.navigate("VideoPage");
      }}
    >
      <View
        style={{
          marginTop: 1,
          borderBottomColor: "rgba(255,255,255,0.08)",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ height: 150 }}>
          <Image
            source={{
              uri: "https://ipfs.io/ipfs/QmZGMkXhvxXNXPoPd8zCu5pXq6aV79wM7pbUVXny9B4VTb",
            }}
            style={{
              height: "100%",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: primary,
          }}
        >
          <View style={{ flex: 0.95 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
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
              source={
                !avatar
                  ? {
                      uri: `https://ipfs.io/ipfs/${avatar?.split("//")[1]}`,
                    }
                  : {
                      uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
                    }
              }
              style={{ height: "100%", width: "100%", borderRadius: 500 }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
