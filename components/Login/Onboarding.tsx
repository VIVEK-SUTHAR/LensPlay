import React, { useCallback, useRef, useState } from "react";
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
import Button from "../UI/Button";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import ConnectWallet from "./connectWallet";
import { data } from "./data";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const Onboarding = ({
  loginRef,
}: {
  loginRef: React.RefObject<BottomSheetMethods>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationfinished, setAnimationFinished] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  let slideAnimation = useRef(new Animated.Value(0)).current;
  const rotateanimation = useRef(new Animated.Value(0)).current;
  const scaleanimation = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const openSheet = useCallback(() => {
    loginRef?.current?.snapToIndex(0);
  }, []);

  const w = Dimensions.get("window").width * 0.79;

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      slidesRef?.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      Animated.spring(fadeAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.spring(slideAnimation, {
        toValue: -w,
        damping: 16,
        velocity: 2,
        useNativeDriver: true,
      }).start();
      Animated.spring(rotateanimation, {
        toValue: 1,
        damping: 16,
        velocity: 2,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setAnimationFinished(true);
        setIsAnimated(true);
        Animated.spring(scaleanimation, {
          toValue: 1,
          damping: 12,
          velocity: 2,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  };

  const reverseAnim = () => {
    setAnimationFinished(false);
    Animated.spring(rotateanimation, {
      toValue: 0,
      damping: 15,
      velocity: 1,
      useNativeDriver: true,
    }).start();
    Animated.spring(slideAnimation, {
      toValue: 0,
      damping: 15,
      velocity: 1,
      useNativeDriver: true,
    }).start();
    scrollX.setValue(0);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);
    Animated.spring(fadeAnim, {
      toValue: 1,
      velocity: 1,
      damping: 15,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotateanimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  return (
    <View style={{ flex: 3 }}>
      {!animationfinished ? (
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
      ) : (
        <ConnectWallet />
      )}
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
            display: animationfinished && isAnimated ? "none" : "flex",
          }}
        >
          <Paginator data={data} scrollX={scrollX} />
        </Animated.View>
        {animationfinished ? (
          <Pressable
            style={{
              backgroundColor: white[700],
              padding: 16,
              borderRadius: 50,
            }}
            onPress={reverseAnim}
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
            display: animationfinished ? "flex" : "none",
            transform: [
              {
                scale: scaleanimation,
              },
            ],
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
            onPress={openSheet}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
