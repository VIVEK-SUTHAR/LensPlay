import {
	Dimensions,
	FlatList,
	Image,
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
import { usePlaylistStore, useProfile, useThemeStore, useToast } from "store/Store";
import removeVideoFromPlaylist from "utils/playlist/removeVideoFromPlaylist";
import MyVideoCardSkeleton from "components/UI/MyVideoCardSkeleton";
import { RefreshControl } from "react-native";

type Props = {
	videoTitle: string;
	index: number;
	result: any;
};

const PlaylistVideos: React.FC<RootStackScreenProps<"PlayListScreen">> = ({ route }) => {
	const scrollY = useSharedValue<number>(0);
	const handlePublication = React.useCallback((publication: Post | Mirror) => {
		setPublication(publication);
	}, []);
	const theme=useThemeStore();
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [fetchPublications, { data }] = useAllPublicationsLazyQuery({fetchPolicy:"no-cache"});
	const [isLoading, setisLoading] = useState(true);
	const PlaylistVideoSheetRef = React.useRef<BottomSheetMethods>(null);
	const [publication, setPublication] = React.useState<Post | Mirror | null>(null);
	const posterSize = Dimensions.get("screen").height / 3;
	const {videoPlaylist, setVideoPlaylist} = usePlaylistStore();
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});

	const fetchAllVideos = async () => {
		const data = await getAllVideos(route.params.playlistId);
		Logger.Success("im here", data[0].publicationId);
		   
		const publications = await fetchPublications({
			variables: { request: { publicationIds: data[0]?.publicationId } },
		});
		setisLoading(false);
		const playlistCover = publications.data?.publications.items[0]?.metadata.cover;
		const coverLink = getIPFSLink(getRawurl(playlistCover));
		setVideoPlaylist(publications.data?.publications.items);
	};
	const onRefresh = () => {
		setRefreshing(true);
		fetchAllVideos().then(() => setRefreshing(false));
	};
	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);
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
				<PlaylistHeader playlistTitle={route.params.playlistTitle} scrollY={scrollY} />
				<PlaylistCover
					coverLink={getIPFSLink(getRawurl(data?.publications.items[0]?.metadata.cover))}
					playlistTitle={route.params.playlistTitle}
					scrollY={scrollY}
				/>
			{isLoading ? (
				<>
					<View
						style={{
							paddingTop: posterSize + 24,
							gap: 16,
							paddingHorizontal: 4,
							paddingBottom: 48,
						}}
					>
						<MyVideoCardSkeleton />
						<MyVideoCardSkeleton />
						<MyVideoCardSkeleton />
						<MyVideoCardSkeleton />
					</View>
				</>
			) : (
				<>
					<Animated.FlatList
						data={videoPlaylist}
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
								<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
									<Image
										source={require("../../assets/images/notfound.png")}
										style={{
											resizeMode: "contain",
											maxHeight: "50%",
											maxWidth: "50%",
											justifyContent: "center",
											alignSelf: "center",
										}}
									/>
									<StyledText
										title={"This playlist has no videos"}
										numberOfLines={1}
										style={{
											color: "#ffffff",
											fontSize: 20,
											fontWeight: "400",
											justifyContent: "center",
											textAlign:"center"
										}}
									/>
								</View>
							);
						}}
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
	const {videoPlaylist, setVideoPlaylist} = usePlaylistStore();
	const toast = useToast();
	const removeVideo = async () => {
		const newPublications = videoPlaylist.filter((Publication, index) => {
			return Publication.id != publication?.id;
		  });
		  Logger.Log('Here is new playlist', newPublications);
		setVideoPlaylist(newPublications);
		toast.success("Video removed successfully");
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
