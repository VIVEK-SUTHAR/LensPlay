import {
	Dimensions,
	FlatList,
	LayoutChangeEvent,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "customTypes/navigation";
import { black } from "constants/Colors";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import VideoCard from "components/VideoCard";
import getAllVideos from "utils/playlist/getAllVideos";
import result, {
	useAllPublicationsLazyQuery,
	usePublicationDetailsLazyQuery,
} from "customTypes/generated";
import MyVideoCard from "components/common/MyVideoCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Heading from "components/UI/Heading";

type Props = {
	videoTitle: string;
	index: number;
	result: any;
};

const PlayListScreen: React.FC<RootStackScreenProps<"PlayListScreen">> = () => {
	const sv = useSharedValue<number>(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			sv.value = event.contentOffset.y;
		},
	});
	const headerTop = 28;
	const layoutY = useSharedValue(0);
	const posterSize = Dimensions.get("screen").height / 2;
	const inset = useSafeAreaInsets();
	const scrollY = useSharedValue<number>(0);
	const [fetchPublications] = useAllPublicationsLazyQuery();
	const [playListVideos, setplayListVideos] = useState();
	const fetchAllVideos = async () => {
		const data = await getAllVideos("music-0x005");
		console.log("im here", data[0].publicationId);
		const publications = await fetchPublications({
			variables: { request: { publicationIds: data[0].publicationId } },
		});
		console.log(publications.data?.publications.items);
		const playListVideos = publications.data?.publications.items;
		setplayListVideos(playListVideos);
	};
	React.useEffect(() => {
		fetchAllVideos();
	}, []);

	const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
	const opacityAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[0, posterSize - (headerTop + inset.top) / 0.9],
				[1, 0],
				Extrapolation.CLAMP
			),
		};
	});
	const PosterImage = ({ sv }) => {
		const inset = useSafeAreaInsets();
		const layoutY = useSharedValue(0);
		const opacityAnim = useAnimatedStyle(() => {
			return {
				opacity: interpolate(
					sv.value,
					[0, posterSize - (headerTop + inset.top) / 0.9],
					[1, 0],
					Extrapolation.CLAMP
				),
			};
		});
	};

	const textAnim = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				sv.value,
				[-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
				[0, 1, 0],
				Extrapolation.CLAMP
			),
			transform: [
				{
					scale: interpolate(
						sv.value,
						[-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
						[1.1, 1, 0.95],
						"clamp"
					),
				},
				{
					translateY: interpolate(
						sv.value,
						[layoutY.value - 1, layoutY.value, layoutY.value + 1],
						[0, 0, -1]
					),
				},
			],
		};
	});

	const scaleAnim = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
						extrapolateLeft: "extend",
						extrapolateRight: "clamp",
					}),
				},
			],
		};
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c1c" }}>
			<Animated.View style={[styles.imageContainer, opacityAnim]}>
				<Animated.Image
					style={[styles.imageStyle, scaleAnim]}
					source={require("../../assets/images/pleaselogin.png")}
				/>
				<Animated.View
					onLayout={(event: LayoutChangeEvent) => {
						"worklet";
						layoutY.value = event.nativeEvent.layout.y;
					}}
					style={{
						position: "absolute",
						bottom: 0,
						top: 0,
						left: 0,
						right: 0,
						justifyContent: "flex-end",
						alignItems: "center",
						paddingHorizontal: 5,
						zIndex: 4,
					}}
				>
					<Animated.Text
						numberOfLines={2}
						style={{ fontWeight: "800", textAlign: "center", color: "white" }}
					>
						John Krasinski
					</Animated.Text>
				</Animated.View>
				<AnimatedLinearGradient
					style={[{ position: "absolute" }, scaleAnim]}
					colors={[
						`rgba(0,0,0,${0})`,
						`rgba(0,0,0,${0.1})`,
						`rgba(0,0,0,${0.3})`,
						`rgba(0,0,0,${0.5})`,
						`rgba(0,0,0,${0.8})`,
						`rgba(0,0,0,${1})`,
					]}
				/>
			</Animated.View>

			<View>
				<FlatList
					data={playListVideos}
					contentContainerStyle={{ paddingTop: posterSize + 48 }}
					renderItem={({ item }) => <MyVideoCard publication={item} id={item.id} />}
				/>
				<ScrollView>
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
					<Heading title={"Please login to use all features of LensPlay"} style={{color:"white",fontSize:24}} />
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default PlayListScreen;

const styles = StyleSheet.create({
	imageContainer: {
		height: Dimensions.get("screen").height / 2,
		width: Dimensions.get("screen").width,
		position: "absolute",
	},
	imageStyle: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
	},
});
