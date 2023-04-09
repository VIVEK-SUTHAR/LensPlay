import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Animated } from "react-native";

type Props = {
  data: any;
};

const ImageCarousel = ({ data }) => {
  const windowWidth = Dimensions.get("window").width;
  const newSize = windowWidth * 0.7;
  const spacer=(windowWidth-newSize)/2;
  const x=useSharedValue(0);
  const onScroll=useAnimatedScrollHandler({
    onScroll:event=>{
        x.value=event.contentOffset.x
    }
  })
  const [newData] = useState([
    {key:'spacer-left'},
    ...data,
    {key:'spacer-right'}
  ])
  return (
    <Animated.ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={newSize}
        decelerationRate={"fast"}
        onScroll={onScroll}
    >
      {newData.map((item, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style=useAnimatedStyle(()=>{
            const scale=interpolate(
                x.value,
                [(index-2)*newSize,(index-1)*newSize,index*newSize],
                [0.8,1,0.8]
            )
            return {
                transform:[{scale}],
            };
        });
        if (!item.image) {
            return <View style={{width:spacer }} key={index} />
        }
        return (
          <View style={{width:newSize}} key={index} >
            <Animated.View style={[styles.imageContainer,style]}>
              <Image source={item.image} style={styles.image} />
            </Animated.View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 34,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
