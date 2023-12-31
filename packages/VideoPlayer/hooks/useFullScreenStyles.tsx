import { useSharedValue, withTiming } from 'react-native-reanimated';

const animationConfig = {
  duration: 200,
};

const useFullScreenStyles = () => {
  const fullScreenControlViewOpacity = useSharedValue(1);

  const showFullScreenControlAnimation = () => {
    'worklet';
    fullScreenControlViewOpacity.value = withTiming(1, animationConfig);
  };

  const hideFullScreenControlAnimation = () => {
    'worklet';
    fullScreenControlViewOpacity.value = withTiming(0, animationConfig);
  };

  return {
    fullScreenControlViewOpacity,
    showFullScreenControlAnimation,
    hideFullScreenControlAnimation,
  };
};

export default useFullScreenStyles;
