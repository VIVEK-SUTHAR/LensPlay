import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useRef } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { black, white } from "../../constants/Colors";
import Icon from "../Icon";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import { data } from "./data";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
const Onboarding = ({
  loginRef,
  isloading,
}: {
  loginRef: React.RefObject<BottomSheetMethods>;
  isloading: boolean;
}) => {
  const flatListRef = useRef(null);
  const x = useSharedValue(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const scaleValue = useSharedValue(0);
  
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      display: x.value >=SCREEN_WIDTH*3 ? "none" : "flex",
      transform: [
        {
          scale:
            x.value >= SCREEN_WIDTH*3
              ? withSpring((scaleValue.value = 0))
              : withSpring((scaleValue.value = 1)),
        },
      ],
    };
  });

  const ButtonAnimationStyle = useAnimatedStyle(() => {
    return {
      display: x.value >= SCREEN_WIDTH*3? "flex" : "none",
      transform: [
        {
          scale:
            x.value >= SCREEN_WIDTH*3
              ? withSpring((scaleValue.value = 1), { mass: 0.7, stiffness: 90 })
              : withSpring((scaleValue.value = 0)),
        },
      ],
    };
  });

  const ButtonContainerStyle = useAnimatedStyle(() => {
    return {
      width: x.value >= SCREEN_WIDTH*3? "100%" : "auto",
      height: 54,
    };
  });

  const PaginatorStyle = useAnimatedStyle(() => {
    return {
      display: x.value >= SCREEN_WIDTH*3 ? "none" : "flex",
      opacity:
        x.value >= SCREEN_WIDTH*3
          ? withTiming(0, {
              duration: 1000,
            })
          : withTiming(1, {
              duration: 1000,
            }),
    };
  });

  const openSheet = useCallback(() => {
    loginRef?.current?.snapToIndex(0);
  }, []);

  const scrollTo = () => {
    //THIS CODE CAN BREAK,PLEASE USE IT ON YOUR OWN RISK
    if (x?.value <= 0) {
      flatListRef?.current?.scrollToIndex({ index: 1 });
    } else if (x?.value <= SCREEN_WIDTH) {
      flatListRef?.current?.scrollToIndex({ index: 2 });
    } else if (x?.value <= SCREEN_WIDTH*2) {
      flatListRef?.current?.scrollToIndex({ index: 3 });
    }
    // else if (x.value <= SCREEN_WIDTH*3) {
    //   flatListRef?.current?.scrollToIndex({ index: 4 });
    // }
  };

  const onScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      x.value = e.nativeEvent.contentOffset.x;         
    },
    []
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        initialNumToRender={1}
        renderItem={({ item }) => {
          return (
            <OnboardingItem
              title={item.title}
              image={item.imgUrl}
              key={item.id}
              desc={item.desc}
            />
          );
        }}
        scrollEventThrottle={1}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            right: 0,
            padding: 16,
          },
          PaginatorStyle,
        ]}
      >
        <Pressable
          onPress={() => {
            flatListRef?.current.scrollToIndex({
              index: data.length - 1,
            });
          }}
        >
          <Heading title="Skip" style={{ color: white[800] }} />
        </Pressable>
      </Animated.View>
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
