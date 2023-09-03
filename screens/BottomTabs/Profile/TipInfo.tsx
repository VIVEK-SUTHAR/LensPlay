import {
	LayoutChangeEvent,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import Animated, {
	Extrapolation,
	SharedValue,
	event,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Transaction from "components/tip/Transaction";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackScreenProps } from "customTypes/navigation";
import TipHeader from "components/tip/TipHeader";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "store/Store";
import StyledText from "components/UI/StyledText";
import { Image } from "expo-image";
import PosterImage from "components/tip/PosterImage";

type Props = {};
const posterSize = Dimensions.get("screen").height / 3;
const headerTop = 44 - 16;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const TipInfo: React.FC<RootStackScreenProps<"TipInfo">> = ({ route }) => {
	// const posterSize = Dimensions.get("screen").height / 2;

	const scrollY = useSharedValue<number>(0);
	const navigation = useNavigation();
	const inset = useSafeAreaInsets();
	const posterSize = Dimensions.get("screen").height / 4;
	const theme = useThemeStore();
	const [refreshing, setRefreshing] = React.useState<boolean>(false);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});
	// const layoutY = useSharedValue(0);
	// const opacityAnim = useAnimatedStyle(() => {
	// 	return {
	// 		opacity: interpolate(
	// 			scrollY.value,
	// 			[
	// 				((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 				posterSize - (headerTop + inset.top) + 1,
	// 			],
	// 			[0, 1]
	// 		),
	// 		transform: [
	// 			{
	// 				scale: interpolate(
	// 					scrollY.value,
	// 					[
	// 						((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 						posterSize - (headerTop + inset.top) + 1,
	// 					],
	// 					[0.98, 1],
	// 					Extrapolation.CLAMP
	// 				),
	// 			},
	// 			{
	// 				translateY: interpolate(
	// 					scrollY.value,
	// 					[
	// 						((posterSize - (headerTop + inset.top)) / 4) * 3,
	// 						posterSize - (headerTop + inset.top) + 1,
	// 					],
	// 					[-10, 0],
	// 					Extrapolation.CLAMP
	// 				),
	// 			},
	// 		],
	// 		paddingTop: inset.top === 0 ? 8 : inset.top,
	// 	};
	// });

	const renderItem = ({ item }: { item: number }) => {
		return <Transaction />;
	};

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<TipHeader scrollY={scrollY} />
			<PosterImage scrollY={scrollY} />
			<Animated.FlatList
				data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
				renderItem={renderItem}
				refreshControl={_RefreshControl}
				contentContainerStyle={{
					paddingTop: posterSize + 24,
					gap: 16,
					paddingHorizontal: 4,
					paddingBottom: 48,
				}}
				onScroll={scrollHandler}
				// extraData={playlistVideo}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => {
					return (
						<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
							{/* <Image
										source={require("../../assets/images/notfound.png")}
										style={{
											resizeMode: "contain",
											maxHeight: "50%",
											maxWidth: "50%",
											justifyContent: "center",
											alignSelf: "center",
										}}
									/> */}
							<StyledText
								title={"This playlist has no videos"}
								numberOfLines={1}
								style={{
									color: "#ffffff",
									fontSize: 20,
									fontWeight: "400",
									justifyContent: "center",
									textAlign: "center",
								}}
							/>
						</View>
					);
				}}
			/>

			{/* <View style={{ flex: 1, flexDirection: "column" }}> */}
			{/* <ScrollView onScroll={scrollHandler} style={{ flex: 0.6, backgroundColor: "black" }}>
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
					<Transaction />
				</ScrollView> */}
			{/* </View> */}
		</SafeAreaView>
	);
};

export default TipInfo;


const styles = StyleSheet.create({
	Linear: {
		position: "absolute",
	},
	imageContainer: {
		width: "100%",
		height: "100%",
	},
});
