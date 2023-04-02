import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolateColors, spring } from "react-native-reanimated";

type CustomSwitchProps = {
  handleOnPress: (value: boolean) => void;
  activeTrackColor: string;
  inActiveTrackColor: string;
  thumbColor: string;
  value: boolean;
};

const Switch = ({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  thumbColor,
  value,
}: CustomSwitchProps) => {
  const [switchTranslate] = useState(new Animated.Value(0));
  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: 21,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [value, switchTranslate]);
  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }),
  };
  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback}>
      <Animated.View
        style={[styles.containerStyle, interpolateBackgroundColor]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            { backgroundColor: thumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 24,
  },
  containerStyle: {
    width: 45,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 24,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

Switch.propTypes = {
  handleOnPress: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  activeTrackColor: PropTypes.string,
  inActiveTrackColor: PropTypes.string,
  thumbColor: PropTypes.string,
};

Switch.defaultProps = {
  activeTrackColor: "#007AFF",
  inActiveTrackColor: "#F2F5F7",
  thumbColor: "#FFF",
};

export default Switch;
