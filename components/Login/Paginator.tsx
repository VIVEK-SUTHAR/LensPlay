import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {};

const Paginator = ({ data, scrollX }: Props) => {
  const width = Dimensions.get("screen").width;
  return (
    <View
      style={{
        flexDirection: "row",
        height: 64,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity= scrollX. interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
            });
        return (
          <Animated.View style={[styles.dot, { width: dotWidth,opacity }]} key={i} />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 8,
  },
});
