import React from "react";
import { Pressable, View } from "react-native";
import getIPFSLink from "../../utils/getIPFSLink";
import getPlaceHolderImage from "../../utils/getPlaceHolder";
import { Image } from "expo-image";
import { getColors } from "react-native-image-colors";
import { useBgColorStore } from "../../store/BgColorStore";
import getImageProxyURL from "../../utils/getImageProxyURL";

type CoverProps = {
  url: string;
  navigation: any;
};

const Cover = ({ url, navigation }: CoverProps) => {
  const { setCoverColors } = useBgColorStore();

  React.useEffect(() => {
    const coverURL = getImageProxyURL({
      formattedLink: getIPFSLink(url),
    });

    getColors(coverURL, {
      fallback: "#000000",
      cache: true,
      key: coverURL,
      quality: "lowest",
      pixelSpacing: 500,
    }).then((colors) => {
      switch (colors.platform) {
        case "android":
          setCoverColors(colors.average);
          break;
        case "ios":
          setCoverColors(colors.primary);
          break;
        default:
          setCoverColors("black");
      }
    });

    return () => {
      setCoverColors(null);
    };
  }, []);

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
            uri: getImageProxyURL({ formattedLink: getIPFSLink(url) }),
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
