import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { primary } from "../../constants/Colors";
// import { Animated } from "react-native";

type Props = {
  data: any;
};

const ImageCarousel = ({ data, autoPlay }) => {
  const ScrollViewRef = useAnimatedRef(null);
  const [newData] = useState([
    {key:'spacer-left'},
    ...data,
    {key:'spacer-right'}
  ]);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const windowWidth = Dimensions.get("window").width;
  const newSize = windowWidth * 0.3;
  const spacer=(windowWidth-newSize)/2;
  const x=useSharedValue(0);
  const onScroll=useAnimatedScrollHandler({
    onScroll:event=>{
        x.value = event.contentOffset.x;
    },
  });

  useEffect(()=>{
    if(isAutoPlay == true){
      console.log('yes true');
      
      let offset = 0;
      setInterval(()=>{
        if (offset >= Math.floor(newSize*(data.length - 1) - 10)){
          offset=0;
        }
        else{
          offset = Math.floor(offset + newSize);
        }
        ScrollViewRef.current.scrollTo({x: offset, y: 0});
        console.log(offset);
        
      },2000)
    }
  },[newSize, data.length, isAutoPlay]);
  return (
    <Animated.ScrollView 
        ref={ScrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={newSize}
        decelerationRate="fast"
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
        if (!item.link) {
            return <View style={{width:spacer }} key={index} />
        }
        
        return (
          <View style={{width:newSize}} key={index} >
            <Animated.View style={[styles.imageContainer,style]}>
              <Image source={{uri: item.link}} style={styles.image} />
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
    borderRadius: 120,
    overflow: "hidden",
    backgroundColor: '#202124'
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
