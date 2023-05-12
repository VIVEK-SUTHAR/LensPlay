import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import StyledText from "../UI/StyledText";
type Props = {
  image: ImageSourcePropType;
  title: string;
  desc: string;
};

const OnboardingItem = ({ image, title, desc }: Props) => {
  const width = Dimensions.get("window").width;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          width: width,
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image}
          style={{ resizeMode: "contain", width: "70%", height: "70%" }}
        />
      </View>
      <View
        style={{
          width: width,
          paddingHorizontal: 16,
          justifyContent: "flex-end",
        }}
      >
        <StyledText
          title={title}
          style={{
            color: "white",
            fontSize: Dimensions.get("window").width / 12,
            fontWeight: "600",
          }}
        />
        <StyledText
          title={desc}
          style={{
            color: "white",
            fontSize: Dimensions.get("window").width / 12,
            fontWeight: "600",
          }}
        />
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({});
