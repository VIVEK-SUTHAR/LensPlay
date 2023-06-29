import { useFonts } from "expo-font";
import React, { FC, useCallback } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import * as SplashScreen from "expo-splash-screen";
interface SubHeadingProps {
  title: string | undefined | React.ReactNode;
  style: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
}

SplashScreen.preventAutoHideAsync();

const StyledText: FC<SubHeadingProps> = ({
  title,
  style,
  onPress,
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
    OpenSans_Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    OpenSans_Medium: require("../../assets/fonts/OpenSans-Medium.ttf"),
    OpenSans_SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    OpenSans_Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
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
        return "OpenSans_Bold";
      case 600:
        return "OpenSans_SemiBold";
      case 500:
        return "OpenSans_Medium";
      default:
        return "OpenSans_Regular";
    }
  };

  var newStyle = Object.assign({}, style, {
    fontFamily: getFontFamily(parseInt(style?.fontWeight)),
  });

  return (
    <Text
      style={newStyle}
      {...rest}
      onLayout={onLayoutRootView}
      onPress={onPress}
    >
      {title}
    </Text>
  );
};

export default StyledText;
