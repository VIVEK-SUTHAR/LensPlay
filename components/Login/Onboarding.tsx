import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { data } from "./data";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import Button from "../UI/Button";
import Icon from "../Icon";
import { black, white } from "../../constants/Colors";
type Props = {};

const Onboarding = (props: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      slidesRef?.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last item.");
    }
  };
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
          <OnboardingItem
            title={item.title}
            image={item.imgUrl}
            key={item.id}
            desc={item.desc}
          />
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
        <Paginator data={data} scrollX={scrollX} />
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
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
