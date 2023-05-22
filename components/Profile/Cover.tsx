import React from "react";
import { Pressable, View } from "react-native";
import getIPFSLink from "../../utils/getIPFSLink";
import getPlaceHolderImage from "../../utils/getPlaceHolder";
import { Image } from "expo-image";
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
          placeholder={getPlaceHolderImage(true)}
          placeholderContentFit="cover"
          transition={500}
          source={{
            uri: getIPFSLink(url),
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
          contentFit="cover"
        />
      </View>
    </Pressable>
  );
};

export default React.memo(Cover);
