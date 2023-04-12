import React, { useEffect, useMemo } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const HEIGHT = 5;

type DeterminateProgressBarProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  progress: number;
};
const ProgressBar = ({
  color = "#0000FF",
  style,
  progress,
}: DeterminateProgressBarProps) => {
  const { backgroundColor, foregroundColor } = useMemo(() => {
    return {
      backgroundColor: "gray",
      foregroundColor: color,
    };
  }, [color]);

  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (progress > 1 || progress < 0) {
      throw new Error("crash");
    }
    progressWidth.value = withSpring(progress * width);
  }, [progress, progressWidth]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
      height: HEIGHT,
    };
  });

  return (
    <View style={[style, styles.container, { backgroundColor }]}>
      <Animated.View
        style={[progressStyle, { backgroundColor: foregroundColor }]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width,
    height: HEIGHT,
  },
});
