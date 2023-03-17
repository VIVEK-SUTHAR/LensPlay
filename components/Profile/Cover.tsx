import React from "react";
import { Image, Pressable, View } from "react-native";
import getIPFSLink from "../../utils/getIPFSLink";
type CoverProps = {
  url: string;
  navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("FullImage", {
          url: url,
        });
      }}
    >
      <View
        style={{
          height: 180,
          marginBottom: 34,
        }}
      >
        <Image
          source={{
            uri: getIPFSLink(url),
          }}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
    </Pressable>
  );
};

export default Cover;
