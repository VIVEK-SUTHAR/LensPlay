import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { primary } from "../../constants/Colors";
// import { Animated } from "react-native";


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
  const interval = useRef();
  const offset = useSharedValue(0);
  const onScroll=useAnimatedScrollHandler({
    onScroll:event=>{
        x.value = event.contentOffset.x;
    },
  });

  useEffect(()=>{
    if(isAutoPlay == true){
      
      let _offset = offset.value;
      interval.current = setInterval(()=>{
        if (_offset >= Math.floor(newSize*(data.length - 1) - 10)){
          _offset=0;
        }
        else{
          _offset = Math.floor(_offset + newSize);
        }
        ScrollViewRef.current.scrollTo({x: _offset, y: 0});
        
      },2000)
    }
    else{
      clearInterval(interval?.current);
    }
  },[newSize, data.length, isAutoPlay, offset.value, ScrollViewRef]);
  return (
    <View style={{height: newSize}}>
      <Animated.ScrollView 
        ref={ScrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        bounces={false}
        scrollEventThrottle={16}
        snapToInterval={newSize}
        decelerationRate="fast"
        onScroll={onScroll}
        onScrollBeginDrag={()=>{
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={(e)=>{
          offset.value = e.nativeEvent.contentOffset.x;
          setIsAutoPlay(true);
        }}
    >
      {newData.map((item, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style=useAnimatedStyle(()=>{
            const scale=interpolate(
                x.value,
                [(index-2)*newSize,(index-1)*newSize,index*newSize],
                [0.6,1,0.6]
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
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: '#202124',
    height: '100%'
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
