import React from 'react';
import { View } from 'react-native';

export default function IconWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.41)',
        borderRadius: 5000,
      }}
    >
      {children}
    </View>
  );
}
