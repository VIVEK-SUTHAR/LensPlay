import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function BottomTabButton({
  children,
  style,
}: {
  children: React.ReactNode;
  style: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}) {
  const scaleIcon = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleIcon.value,
        },
      ],
    };
  });

  const tabIconAnimation = React.useCallback(() => {
    scaleIcon.value = withTiming(0.8, { duration: 100 }, () => {
      scaleIcon.value = withTiming(1, { duration: 100 });
    });
  }, []);

  return (
    <Animated.View style={[style, iconStyle]} onTouchStart={tabIconAnimation}>
      {children}
    </Animated.View>
  );
}
