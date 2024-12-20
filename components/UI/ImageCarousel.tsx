import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

interface ImageCarouselTypes {
	data: carousalData[];
	autoPlay: boolean;
}

interface carousalData {
	link: string;
	handle: string;
}

const ImageCarousel = ({ data, autoPlay }: ImageCarouselTypes) => {
	const ScrollViewRef = useAnimatedRef<any>();
	const [newData] = useState([{ key: "spacer-left" }, ...data, { key: "spacer-right" }]);
	const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
	const windowWidth = Dimensions.get("window").width;
	const newSize = windowWidth * 0.3;
	const spacer = (windowWidth - newSize) / 2;
	const x = useSharedValue(0);
	const interval = useRef(0);
	const offset = useSharedValue(0);
	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});

	useEffect(() => {
		if (isAutoPlay == true) {
			let _offset = offset.value;
			interval.current = window.setInterval(() => {
				if (_offset >= Math.floor(newSize * (data.length - 1) - 10)) {
					_offset = 0;
				} else {
					_offset = Math.floor(_offset + newSize);
				}
				ScrollViewRef?.current?.scrollTo({ x: _offset, y: 0 });
			}, 2000);
		} else {
			clearInterval(interval?.current);
		}
	}, [newSize, data.length, isAutoPlay, offset.value, ScrollViewRef]);
	return (
		<View style={{ height: newSize + 30 }}>
			<Animated.ScrollView
				ref={ScrollViewRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				scrollEventThrottle={16}
				snapToInterval={newSize}
				decelerationRate="fast"
				onScroll={onScroll}
				onScrollBeginDrag={() => {
					setIsAutoPlay(false);
				}}
				onMomentumScrollEnd={(e) => {
					offset.value = e.nativeEvent.contentOffset.x;
					setIsAutoPlay(true);
				}}
			>
				{newData.map((item, index) => {
					const style = useAnimatedStyle(() => {
						const scale = interpolate(
							x.value,
							[(index - 2) * newSize, (index - 1) * newSize, index * newSize],
							[0.6, 1, 0.6]
						);
						return {
							transform: [{ scale }],
						};
					});
					const marginStyle = useAnimatedStyle(() => {
						const margin = interpolate(
							x.value,
							[(index - 2) * newSize, (index - 1) * newSize, index * newSize],
							[-12, 8, -12]
						);

						const opacity = interpolate(
							x.value,
							[(index - 2) * newSize, (index - 1) * newSize, index * newSize],
							[0.5, 1, 0.5]
						);
						const scale = interpolate(
							x.value,
							[(index - 2) * newSize, (index - 1) * newSize, index * newSize],
							[0.8, 1, 0.8]
						);

						return {
							marginTop: margin,
							opacity: opacity,
							transform: [{ scale }],
						};
					});
					if (!item.link) {
						return <View style={{ width: spacer }} key={index} />;
					}

					return (
						<View style={{ width: newSize }} key={index}>
							<Animated.View style={[styles.imageContainer, style]}>
								<Image source={{ uri: item.link }} style={styles.image} />
							</Animated.View>
							<Animated.Text
								style={[
									{
										color: "white",
										textAlign: "center",
										fontSize: 12,
									},
									marginStyle,
								]}
							>
								{item.handle}
							</Animated.Text>
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
		backgroundColor: "#202124",
		// height: '100%'
	},
	image: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
});
