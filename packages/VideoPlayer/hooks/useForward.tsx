import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export default function useForward() {
  const forwardViewOpacity = useSharedValue(0);

  const setControlTimeout = () => {
    'worklet';
    forwardViewOpacity.value = withDelay(1000, withTiming(0));
  };

  const forwardViewStyles = useAnimatedStyle(() => {
    return {
      opacity: forwardViewOpacity.value,
    };
  });

  const showForwardAnimation = () => {
    'worklet';
    forwardViewOpacity.value = withTiming(1, { duration: 200 }, () => {
      setControlTimeout();
    });
  };

  const hideForwardAnimation = () => {
    'worklet';
    forwardViewOpacity.value = withTiming(0, { duration: 200 });
  };

  return {
    forwardViewOpacity,
    forwardViewStyles,
    showForwardAnimation,
    hideForwardAnimation,
  };
}
