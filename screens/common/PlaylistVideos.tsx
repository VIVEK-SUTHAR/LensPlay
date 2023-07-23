import {
	Dimensions,
	FlatList,
	LayoutChangeEvent,
	SafeAreaView,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
	Scalars,
	useAllPublicationsLazyQuery,
	usePublicationDetailsLazyQuery,
} from "customTypes/generated";
import MyVideoCard, { SheetProps, actionListType } from "components/common/MyVideoCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import Heading from "components/UI/Heading";
import PlaylistHeader from "components/Playlist/PlaylistHeader";
import PlaylistCover from "components/Playlist/PlaylistCover";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import useAddWatchLater from "hooks/useAddToWatchLater";
import Sheet from "components/Bottom";
import CommonStyles from "styles/index";
import Ripple from "components/UI/Ripple";
import Logger from "utils/logger";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import DeleteVideo from "components/VIdeo/DeleteVideo";
import { useProfile } from "store/Store";
import removeVideoFromPlaylist from "utils/playlist/removeVideoFromPlaylist";
import MyVideoCardSkeleton from "components/UI/MyVideoCardSkeleton";

type Props = {
	videoTitle: string;
	index: number;
	result: any;
};

const PlaylistVideos: React.FC<RootStackScreenProps<"PlayListScreen">> = ({ route }) => {
	const scrollY = useSharedValue<number>(0);
	// const [PubId, setPubId] = useState();
	const handlePublication = React.useCallback((publication: Post | Mirror) => {
		setPublication(publication);
	}, []);
	const [playlistVideo, setplaylistVideo] = useState<Post[]>([]);
	const { currentProfile } = useProfile();
	const [fetchPublications, { data }] = useAllPublicationsLazyQuery();
	const [isLoading, setisLoading] = useState(true);
	const PlaylistVideoSheetRef = React.useRef<BottomSheetMethods>(null);
	const [publication, setPublication] = React.useState<Post | Mirror | null>(null);
	const posterSize = Dimensions.get("screen").height / 3;
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});

	const fetchAllVideos = async () => {
		const data = await getAllVideos(route.params.playlistId);
		console.log("im here", data[0].publicationId);
		const publications = await fetchPublications({
			variables: { request: { publicationIds: data[0].publicationId } },
		});
		setisLoading(false);
		console.log(publications.data?.publications.items);
		const playListVideos = publications.data?.publications.items;
		const playlistCover = publications.data?.publications.items[0]?.metadata.cover;
		const coverLink = getIPFSLink(getRawurl(playlistCover));

		console.log("haas", coverLink);

		console.log(playListVideos, "n");

		setplaylistVideo(playListVideos);
	};
	React.useEffect(() => {
		fetchAllVideos();
	}, []);

	const renderItem = ({ item }: { item: Post | Mirror }) => {
		return (
			<>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
				<MyVideoCard
					setPublication={handlePublication}
					sheetRef={PlaylistVideoSheetRef}
					publication={item}
					id={item?.id}
				/>
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
			<View style={{position:"relative"}} >
				<PlaylistHeader playlistTitle={route.params.playlistTitle} scrollY={scrollY} />
				<PlaylistCover
					coverLink={getIPFSLink(getRawurl(data?.publications.items[0]?.metadata.cover))}
					playlistTitle={route.params.playlistTitle}
					scrollY={scrollY}
				/>
			</View>
			{(isLoading) ? (
				<>
					<MyVideoCardSkeleton />
					<MyVideoCardSkeleton />
					<MyVideoCardSkeleton />
					<MyVideoCardSkeleton />
				</>
			) : (
				<>
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
					<PlaylistVideoSheet
						sheetRef={PlaylistVideoSheetRef}
						publication={publication}
						profileId={route.params.channelId}
						playlistId={route.params.playlistId}
					/>
				</>
			)}
		</View>
	);
};

export const PlaylistVideoSheet = ({
	sheetRef,
	publication,
	profileId,
	playlistId,
}: SheetProps) => {
	// const deleteRef=React.useRef<BottomSheetMethods>(null);
	const removeVideo = async () => {
		const removePlaylistVideo = await removeVideoFromPlaylist(playlistId!, publication?.id);
		console.log("ye saaabb", removePlaylistVideo);
	};

	const { add, remove } = useAddWatchLater();
	const actionList: actionListType[] = [
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				void Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
		{
			name: "Remove from playlist",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				removeVideo();
			},
		},
	];

	const channelActionList: actionListType[] = [
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
		{
			name: publication?.bookmarked ? "Remove from watch later" : "Add to watch later",
			icon: publication?.bookmarked ? "delete" : "clock",
			onPress: (publication) => {
				if (publication?.bookmarked) {
					remove(publication);
				} else {
					add(publication);
				}
			},
		},
	];

	return (
		<>
			<Sheet
				ref={sheetRef}
				snapPoints={[150]}
				enablePanDownToClose={true}
				enableOverDrag={true}
				bottomInset={32}
				style={CommonStyles.mx_8}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				detached={true}
			>
				<FlatList
					data={profileId ? channelActionList : actionList}
					renderItem={({ item }) => {
						return (
							<Ripple
								onTap={() => {
									Logger.Log("chumma2", publication);
									item.onPress(publication);
									sheetRef?.current?.close();
								}}
							>
								<View
									style={{
										width: "100%",
										height: "auto",
										paddingVertical: 16,
										paddingHorizontal: 16,
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Icon name={item.icon} color={"white"} />
									<StyledText
										title={item.name}
										style={{
											fontSize: 16,
											marginHorizontal: 8,
											color: "white",
										}}
									/>
								</View>
							</Ripple>
						);
					}}
				/>
			</Sheet>
		</>
	);
};

export default PlaylistVideos;
