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
import StyledText from "./StyledText";
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
  ripple_radius?: number;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
  borderColor?: ColorValue;
  borderRadius?: number;
  onPress?: () => void;
  icon?: any;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  bytes?: boolean;
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
    ripple_radius = 0.5,
    bg = theme.PRIMARY.toString(),
    onPress,
    borderColor = "white",
    icon,
    iconPosition = "left",
    disabled,
    bytes = false,
    ...rest
  } = props;

  var newStyle = Object.assign({}, textStyle, {
    textAlign: "center",
  });

  return (
    <Pressable
      android_ripple={{
        color: type === "outline" ? theme.PRIMARY : "rgba(255,255,255,0.08)",
        radius: borderRadius * ripple_radius,
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
          flexDirection: bytes ? "column" : "row",
          alignItems: "center",
          borderRadius: borderRadius,
          justifyContent: textStyle ? "center" : "space-between",
          backgroundColor: disabled
            ? "#cccccc"
            : type === "filled"
            ? bg
            : "transparent",
          borderColor: type === "outline" ? borderColor : "transparent",
          borderWidth: type === "outline" ? 1 : 0,
          paddingVertical: py,
          paddingHorizontal: px,
          marginHorizontal: mx,
          marginVertical: my,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} animating={true} color={"black"} />
        ) : (
          <>
            {icon && iconPosition === "left" ? (
              <View
                style={{
                  marginRight: bytes || title.length === 0 ? 0 : 8,
                }}
              >
                {icon}
              </View>
            ) : (
              <></>
            )}
            <StyledText title={title} style={newStyle} />
            {icon && iconPosition === "right" ? (
              <View
                style={{
                  marginLeft: 8,
                }}
              >
                {icon}
              </View>
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

export default React.memo(Button);
