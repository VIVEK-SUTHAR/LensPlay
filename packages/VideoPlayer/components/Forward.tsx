import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

export default function Forward({ videoHeight }: { videoHeight: number }) {
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get('screen').width / 2.8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderTopStartRadius: 1000,
        borderBottomStartRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        height: videoHeight + 30,
      }}
    >
      <LottieView
        source={{
          uri: 'https://lottie.host/f71a8d4b-1930-4595-b3f7-5cd69c77e7a7/rrQw5MPPkk.json',
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
