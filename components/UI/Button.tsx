import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewProps,
  TextStyle,
  ActivityIndicator,
  ColorValue,
} from "react-native";
import React from "react";
import SubHeading from "./SubHeading";
import { primary } from "../../constants/Colors";
import { IconType } from "react-icons";
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
  onPress?: () => void;
  icon?: any;
}

const Button = (props: ButtonProps): JSX.Element => {
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
    bg = primary,
    onPress,
    borderColor="white",
    icon,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      style={[style,{width:width}]}
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
          justifyContent: textStyle? "center":"space-between",
          backgroundColor: type === "filled" ? bg : "transparent",
          borderRadius: 50,
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
    </TouchableOpacity>
  );
};

export default Button;
