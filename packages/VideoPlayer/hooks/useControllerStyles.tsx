import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const useControllerStyles = () => {
  const controlViewOpacity = useSharedValue(1);

  const setControlTimeout = () => {
    'worklet';
    controlViewOpacity.value = withDelay(3000, withTiming(0));
  };

  const controlViewStyles = useAnimatedStyle(() => {
    return {
      opacity: controlViewOpacity.value,
    };
  });

  const showControlAnimation = (shouldDelay?: boolean) => {
    'worklet';
    if (shouldDelay) {
      controlViewOpacity.value = withDelay(
        600,
        withTiming(1, { duration: 200 }, () => {
          setControlTimeout();
        })
      );
      return;
    }
    controlViewOpacity.value = withTiming(1, { duration: 200 }, () => {
      setControlTimeout();
    });
  };

  const hideControlAnimation = (shouldDelay?: boolean) => {
    'worklet';
    if (shouldDelay) {
      controlViewOpacity.value = withDelay(
        600,
        withTiming(0, { duration: 200 })
      );
      return;
    }
    controlViewOpacity.value = withTiming(0, { duration: 200 });
  };

  return {
    controlViewOpacity,
    showControlAnimation,
    hideControlAnimation,
    controlViewStyles,
    setControlTimeout,
  };
};

export default useControllerStyles;
