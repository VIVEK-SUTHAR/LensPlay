import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import useVideoPlayerStore from '../store';
import IconWrapper from './IconWrapper';

type Props = {
  videoPlayerRef: React.RefObject<Video>;
  onPlay: () => void;
  onPause: () => void;
};

export default function PlayPauseController({
  videoPlayerRef,
  onPause,
  onPlay,
}: Props) {
  const { isPaused, setIsPaused, isLoading } = useVideoPlayerStore();
  const animationRef = useRef<LottieView>(null);

  const play = () => {
    setIsPaused(false);
    animationRef.current?.play(30, 60);
    videoPlayerRef.current?.playAsync();
    onPlay();
  };

  const pause = () => {
    setIsPaused(true);
    animationRef.current?.play(0, 30);
    videoPlayerRef.current?.pauseAsync();
    onPause();
  };

  const togglePlayOnJS = () => {
    isPaused ? play() : pause();
  };

  useEffect(() => {
    animationRef.current?.pause();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Pressable
          onPress={() => {
            runOnJS(togglePlayOnJS)();
          }}
        >
          <IconWrapper>
            <LottieView
              ref={animationRef}
              source={{
                uri: 'https://lottie.host/16313e99-4025-4fe5-b3c8-fe063b0d60fc/P3PX6VUZJZ.json',
              }}
              loop={false}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </IconWrapper>
        </Pressable>
      )}
    </View>
  );
}
