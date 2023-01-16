import {
  View,
  StyleProp,
  ViewProps,
  TextStyle,
  ActivityIndicator,
  ColorValue,
  Pressable,
} from "react-native";
import React from "react";
import SubHeading from "./SubHeading";
import { useThemeStore } from "../../store/Store";
interface ButtonProps {
  title: string;
  type?: "outline" | "filled";
  isLoading?: boolean;
  width?: number | string;
  mx?: number;
  my?: number;
  px?: number;
  py?: number;
  bg?: ColorValue;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
  borderColor?: ColorValue;
  borderRadius?: number;
  onPress?: () => void;
  icon?: any;
}

const Button = (props: ButtonProps): JSX.Element => {
  const theme = useThemeStore();
  const {
    title,
    type = "filled",
    width = "100%",
    isLoading = false,
    style,
    mx = 0,
    my = 0,
    px = 4,
    py = 8,
    textStyle,
    borderRadius = 50,
    bg = theme.PRIMARY.toString(),
    onPress,
    borderColor = "white",
    icon,
    ...rest
  } = props;
  return (
    <Pressable
      android_ripple={{
        color: type === "outline" ? theme.PRIMARY : "rgba(255,255,255,0.08)",
        radius: borderRadius * 0.5,
      }}
      style={[
        style,
        {
          width: width,
        },
      ]}
      {...rest}
      onPress={
        onPress
          ? onPress
          : () => {
              console.log("[Error]:onPress handler is missing");
            }
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: borderRadius,
          justifyContent: textStyle ? "center" : "space-between",
          backgroundColor: type === "filled" ? bg : "transparent",
          borderColor: type === "outline" ? borderColor : "transparent",
          borderWidth: type === "outline" ? 1 : 0,
          paddingVertical: py,
          paddingHorizontal: px,
          marginHorizontal: mx,
          marginVertical: my,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"black"} />
        ) : (
          <>
            {icon}
            <SubHeading
              title={title}
              style={[
                textStyle,
                {
                  textAlign: "center",
                  marginHorizontal: 4,
                  // color: bg === "white" ? "black" : "white",
                },
              ]}
            />
          </>
        )}
      </View>
    </Pressable>
  );
};

export default Button;
