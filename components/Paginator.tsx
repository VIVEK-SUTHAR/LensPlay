import React from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

type PaginatorProps = {
  data: string[];
  scrollX: Animated.Value;
};

export default function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", height: 64, alignItems: "center" }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
      {/* <Text>Paginator</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 8,
  },
});
