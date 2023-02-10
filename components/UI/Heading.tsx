import React, { FC, useCallback } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

interface HeadingProps {
  title: string | React.ReactNode;
  style: StyleProp<TextStyle>;
  numberOfLines?: number;
}

SplashScreen.preventAutoHideAsync();

const Heading: FC<HeadingProps> = ({ title, style, ...rest }) => {
  const [fontsLoaded] = useFonts({
    Raleway_Regular: require("../../assets/fonts/Raleway-Regular.ttf"),
    Raleway_Medium: require("../../assets/fonts/Raleway-Medium.ttf"),
    Raleway_SemiBold: require("../../assets/fonts/Raleway-SemiBold.ttf"),
    Raleway_Bold: require("../../assets/fonts/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const getFontFamily = (fontWeight: number) => {
    switch (fontWeight) {
      case 700:
        return "Raleway_Bold";
      case 600:
        return "Raleway_SemiBold";
      case 500:
        return "Raleway_Medium";
      default:
        return "Raleway_Regular";
    }
  };

  var newStyle = Object.assign({}, style, {
    fontFamily: getFontFamily(parseInt(style?.fontWeight)),
  });

  return (
    <Text style={newStyle} {...rest} onLayout={onLayoutRootView}>
      {title}
    </Text>
  );
};

export default Heading;
