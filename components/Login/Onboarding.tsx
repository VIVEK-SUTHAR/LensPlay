import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { black, white } from "../../constants/Colors";
import Icon from "../Icon";
import Button from "../UI/Button";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { data } from "./data";

const Onboarding = ({
  loginRef,
  isloading,
}: {
  loginRef: React.RefObject<BottomSheetMethods>;
  isloading: boolean;
}) => {
  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const scaleValue = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any;
  }) => {
    flatListIndex.value = viewableItems[0].index;
  };

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      display: flatListIndex.value === data.length - 1 ? "none" : "flex",
      transform: [
        {
          scale:
            flatListIndex.value === data.length - 1
              ? withSpring((scaleValue.value = 0))
              : withSpring((scaleValue.value = 1)),
        },
      ],
    };
  });

  const ButtonAnimationStyle = useAnimatedStyle(() => {
    return {
      display: flatListIndex.value === data.length - 1 ? "flex" : "none",
      transform: [
        {
          scale:
            flatListIndex.value === data.length - 1
              ? withSpring((scaleValue.value = 1))
              : withSpring((scaleValue.value = 0)),
        },
      ],
    };
  });

  const ButtonContainerStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === data.length - 1 ? "100%" : "auto",
      height: 54,
    };
  });

  const PaginatorStyle = useAnimatedStyle(() => {
    return {
      display: flatListIndex.value === data.length - 1 ? "none" : "flex",
      opacity:
        flatListIndex.value === data.length - 1
          ? withTiming(0, {
              duration: 1000,
            })
          : withTiming(1, {
              duration: 1000,
            }),
    };
  });

  const viewabilityConfig = {
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const openSheet = useCallback(() => {
    loginRef?.current?.snapToIndex(0);
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const scrollTo = () => {
    if (flatListIndex.value < data.length - 1) {
      flatListRef?.current.scrollToIndex({ index: flatListIndex.value + 1 });
    }
  };

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <OnboardingItem
              title={item.title}
              image={item.imgUrl}
              key={item.id}
              desc={item.desc}
            />
          );
        }}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <Animated.View style={PaginatorStyle}>
          <Paginator data={data} x={x} screenWidth={SCREEN_WIDTH} />
        </Animated.View>
        <Animated.View style={ButtonContainerStyle}>
          <Animated.View style={[{ width: "100%" }, ButtonAnimationStyle]}>
            <Button
              title={"Connect wallet"}
              width={"100%"}
              isLoading={isloading}
              bg={white[600]}
              py={12}
              px={32}
              textStyle={{
                fontSize: 16,
                fontWeight: "500",
              }}
              onPress={openSheet}
            />
          </Animated.View>
          <Animated.View style={arrowAnimationStyle}>
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
        </Animated.View>
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
