import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import StyledText from "../UI/StyledText";
type Props = {
  image: ImageSourcePropType;
  title: string;
};

const OnboardingItem = ({ image, title }: Props) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  
  return (
    <View>
      <View
        style={{
          width: width,
          height: height / 1.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image}
          style={{ resizeMode: "contain", width: "70%", height: "70%" }}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <StyledText
          title={title}
          style={{ color: "white", fontSize: 32, fontWeight: "600" }}
        />
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({});
