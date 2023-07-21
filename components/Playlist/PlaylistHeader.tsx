import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;

export default function PlaylistHeader({
  scrollY,
}: {
  scrollY: SharedValue<number>;
}) {
  const inset = useSafeAreaInsets();
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [
          ((posterSize - (headerTop + inset.top)) / 4) * 3,
          posterSize - (headerTop + inset.top) + 1,
        ],
        [0, 1]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [0.98, 1],
            Extrapolation.CLAMP
          ),
        },
        {
          translateY: interpolate(
            scrollY.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [-10, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      paddingTop: inset.top === 0 ? 8 : inset.top,
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: "100%",
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: black[700],
          zIndex: 1
        },
        opacityAnim,
      ]}
    >
      <Heading
        style={{
          color: white[700],
          fontSize: 24,
          fontWeight: "500",
        }}
        title={'PlayList Name'}
      />
    </Animated.View>
  );
}