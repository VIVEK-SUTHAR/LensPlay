import {
  View,
  StyleProp,
  ViewProps,
  TextStyle,
  ActivityIndicator,
  ColorValue,
  Pressable,
  Animated,
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
  animated?: boolean;
  scale?: number;
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
    animated = false,
    scale=0.9,
    ...rest
  } = props;

  var newStyle = Object.assign({}, textStyle, {
    textAlign: "center",
  });
  const scaleRef = React.useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      android_ripple={{
        color: "rgba(255,255,255,0.08)",
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
        onPress && !disabled
          ? onPress
          : () => {
              console.log(
                "[Error]:onPress handler is missing or disabled button"
              );
            }
      }
      onPressIn={(e) => {
        e.preventDefault();
        if (!animated) return;
        Animated.timing(scaleRef, {
          toValue: scale,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={(e) => {
        e.preventDefault();
        if (!animated) return;
        Animated.timing(scaleRef, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }}
    >
      <Animated.View
        style={{
          display: "flex",
          flexDirection: bytes ? "column" : "row",
          alignItems: "center",
          borderRadius: borderRadius,
          justifyContent: textStyle ? "center" : "space-between",
          backgroundColor: disabled
            ? "#c0c0c0"
            : type === "filled"
            ? bg
            : "transparent",
          borderColor: type === "outline" ? borderColor : "transparent",
          borderWidth: type === "outline" ? 1 : 0,
          paddingVertical: py,
          paddingHorizontal: px,
          marginHorizontal: mx,
          marginVertical: my,
          transform: [
            {
              scale: scaleRef,
            },
          ],
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} animating={true} color={"black"} />
        ) : (
          <>
            {icon && iconPosition === "left" ? (
              <View
                style={{
                  marginRight: bytes || title?.length === 0 ? 0 : 8,
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
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(Button);
