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
	Mirror,
	Post,
	useAllPublicationsLazyQuery,
	usePublicationDetailsLazyQuery,
} from "customTypes/generated";
import MyVideoCard from "components/common/MyVideoCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Heading from "components/UI/Heading";
import PlaylistHeader from "components/Playlist/PlaylistHeader";
import PlaylistCover from "components/Playlist/PlaylistCover";

type Props = {
	videoTitle: string;
	index: number;
	result: any;
};

const PlaylistVideos: React.FC<RootStackScreenProps<"PlayListScreen">> = () => {
	const scrollY = useSharedValue<number>(0);
	const [playlistVideo, setplaylistVideo] = useState<Post[] | Mirror[]>([]);
	const [fetchPublications] = useAllPublicationsLazyQuery();

	const posterSize = Dimensions.get("screen").height / 3;
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});

	const fetchAllVideos = async () => {
		const data = await getAllVideos("Blink-0x018c00");
		console.log("im here", data[0].publicationId);
		const publications = await fetchPublications({
			variables: { request: { publicationIds: data[0].publicationId } },
		});
		console.log(publications.data?.publications.items);
		const playListVideos = publications.data?.publications.items;
		console.log(playListVideos, "n");

		setplaylistVideo(playListVideos);
	};
	React.useEffect(() => {
		fetchAllVideos();
	}, []);

	const renderItem = ({ item }: { item: Post | Mirror }) => {
		return (
			<>
				<MyVideoCard publication={item} id={item?.id} />
				<MyVideoCard publication={item} id={item?.id} />
				<MyVideoCard publication={item} id={item?.id} />
				<MyVideoCard publication={item} id={item?.id} />
				<MyVideoCard publication={item} id={item?.id} />
				<MyVideoCard publication={item} id={item?.id} />
			</>
		);
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<PlaylistHeader scrollY={scrollY} />
			<PlaylistCover scrollY={scrollY} />
			<Animated.FlatList
				data={playlistVideo}
				renderItem={renderItem}
				contentContainerStyle={{
					paddingTop: posterSize + 24,
					gap: 16,
					paddingHorizontal: 16,
					paddingBottom: 48,
				}}
				onScroll={scrollHandler}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default PlaylistVideos;
