import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { black, white } from "../../constants/Colors";
import Icon from "../Icon";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { data } from "./data";
import Button from "../UI/Button";
type Props = {};

const Onboarding = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState<boolean>(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  let slideAnimation = useRef(new Animated.Value(0)).current;
  const rotateanimation = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const w = Dimensions.get("window").width * 0.79;

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      slidesRef?.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last item.");
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(slideAnimation, {
        toValue: -w,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(rotateanimation, {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setDone(true);
      }, 2000);
    }
  };

  const spin = rotateanimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={{ flex: 3 }}>
      <FlatList
        data={data}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={32}
        ref={slidesRef}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
          >
            <OnboardingItem
              title={item.title}
              image={item.imgUrl}
              key={item.id}
              desc={item.desc}
            />
          </Animated.View>
        )}
      />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            display: done ? "none" : "flex",
          }}
        >
          <Paginator data={data} scrollX={scrollX} />
        </Animated.View>
        {done ? (
          <Pressable
            style={{
              backgroundColor: white[700],
              padding: 16,
              borderRadius: 50,
            }}
            onPress={scrollTo}
          >
            <Icon name="arrowLeft" size={20} color={black[800]} />
          </Pressable>
        ) : (
          <Animated.View
            style={{
              transform: [
                {
                  translateX: slideAnimation,
                },
                {
                  rotate: spin,
                },
              ],
            }}
          >
            <Pressable
              style={{
                backgroundColor: white[700],
                padding: 16,
                borderRadius: 50,
              }}
              onPress={scrollTo}
            >
              <Icon name="arrowForward" size={20} color={black[800]} />
            </Pressable>
          </Animated.View>
        )}
        <Animated.View
          style={{
            display: done ? "flex" : "none",
          }}
        >
          <Button
            title={"Connect wallet"}
            width={"auto"}
            bg={white[600]}
            py={12}
            px={32}
            textStyle={{
              fontSize: 20,
              fontWeight: "500",
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
