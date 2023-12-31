import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export default function useBackward() {
  const backwardViewOpacity = useSharedValue(0);

  const setControlTimeout = () => {
    'worklet';
    backwardViewOpacity.value = withDelay(1000, withTiming(0));
  };

  const backwardViewStyles = useAnimatedStyle(() => {
    return {
      opacity: backwardViewOpacity.value,
    };
  });

  const showBackwardAnimation = () => {
    'worklet';
    backwardViewOpacity.value = withTiming(1, { duration: 200 }, () => {
      setControlTimeout();
    });
  };

  const hideBackwardAnimation = () => {
    'worklet';
    backwardViewOpacity.value = withTiming(0, { duration: 200 });
  };

  return {
    backwardViewOpacity,
    backwardViewStyles,
    showBackwardAnimation,
    hideBackwardAnimation,
  };
}
