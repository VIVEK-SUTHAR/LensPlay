import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import StyledText from '../UI/StyledText'
import Animated, { FadeIn } from 'react-native-reanimated';


function connectWallet() {
  const width = Dimensions.get("window").width;

  return (
    <Animated.View
    entering={
        FadeIn.duration(1000)
    }
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          width: width,
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require('../../assets/images/3d-1.png')}
          style={{ resizeMode: "contain", width: "70%", height: "70%" }}
        />
      </View>
      <View
        style={{
          width: width,
          paddingHorizontal: 16,
          justifyContent: "flex-end",
        }}
      >
        <StyledText
          title={'Tere naina'}
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "600",
          }}
        />
        <StyledText
          title={''}
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "600",
          }}
        />
      </View>
    </Animated.View>
  )
}

export default connectWallet