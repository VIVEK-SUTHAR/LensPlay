import { StyleSheet, Text } from 'react-native';
import React, { type FC } from 'react';
import { formatTimeToMins } from '../utils/index';

type Props = {
  duration: number;
  currentTime: number;
};

const VideoTime: FC<Props> = ({ duration, currentTime }) => {
  return (
    <Text style={styles.durationTextStyle}>
      {formatTimeToMins(currentTime)} / {formatTimeToMins(duration)}
    </Text>
  );
};

export default VideoTime;

const styles = StyleSheet.create({
  durationTextStyle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
