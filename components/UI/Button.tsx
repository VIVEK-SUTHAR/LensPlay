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
  onPress?: () => void;
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
    ...rest
  } = props;
  return (
    <TouchableOpacity
      style={{ width: width }}
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
          backgroundColor: type === "filled" ? bg : "rgba(255,255,255,0.08)",
          borderRadius: 50,
          borderColor: type === "outline" ? "white" : undefined,
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
          <SubHeading
            title={title}
            style={[
              textStyle,
              {
                textAlign: "center",
                color: bg === "white" ? "black" : "white",
              },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
