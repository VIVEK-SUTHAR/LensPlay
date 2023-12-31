import React from 'react';
import { Pressable, StatusBar } from 'react-native';
import FullScreenIcon from '../assets/Icons/FullScreenIcon';
import { type SharedValue, runOnJS } from 'react-native-reanimated';
import * as ScreenOrientation from 'expo-screen-orientation';
import ExitFullScreenIcon from '../assets/Icons/ExitFullScreenIcon';

type FullscreenControllerProps = {
  isFullScreen: SharedValue<boolean>;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
};

export default function FullscreenController({
  isFullScreen,
  enterFullScreen,
  exitFullScreen,
}: FullscreenControllerProps) {
  const toggleFullScreenOnJS = async () => {
    const orientation = await ScreenOrientation.getOrientationLockAsync();
    if (
      isFullScreen.value ||
      orientation !== ScreenOrientation.OrientationLock.PORTRAIT_UP
    ) {
      exitFullScreen();
      StatusBar.setHidden(false, 'fade');
    } else {
      enterFullScreen();
      StatusBar.setHidden(true, 'fade');
    }
    isFullScreen.value = !isFullScreen.value;
  };

  const handleOnPress = () => {
    runOnJS(toggleFullScreenOnJS)();
  };

  return (
    <Pressable onPress={handleOnPress}>
      {isFullScreen.value ? (
        <ExitFullScreenIcon height={16} width={16} />
      ) : (
        <FullScreenIcon height={16} width={16} />
      )}
    </Pressable>
  );
}
