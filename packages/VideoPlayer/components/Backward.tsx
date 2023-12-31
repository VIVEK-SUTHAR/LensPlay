import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

export default function Backward({ videoHeight }: { videoHeight: number }) {
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get('screen').width / 2.8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderTopEndRadius: 1000,
        borderBottomEndRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        height: videoHeight + 30,
      }}
    >
      <LottieView
        source={{
          uri: 'https://lottie.host/c5caaf75-6201-45f3-93e8-1c840baaa836/cRHYPlVxE2.json',
        }}
        loop={true}
        autoPlay={true}
        style={{
          width: Dimensions.get('screen').width / 4,
          height: '100%',
        }}
      />
    </TouchableOpacity>
  );
}
