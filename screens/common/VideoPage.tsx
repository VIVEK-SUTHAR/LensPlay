import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import CommentSheet from "components/Comments/CommentSheet";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { VideoCreator, VideoMeta } from "components/VIdeo";
import MetaDataSheet from "components/VIdeo/Actions/MetaDataSheet";
import MirrorVideoSheet from "components/VIdeo/Actions/MirrorVideoSheet";
import VideoActions from "components/VIdeo/Actions/VideoActions";
import MoreVideos from "components/VIdeo/MoreVideos";
import VideoPageSkeleton from "components/VIdeo/VideoPageSkeleton";
import { black } from "constants/Colors";
import type { HandleInfo, VideoMetadataV3 } from "customTypes/generated";
import type { RootStackScreenProps } from "customTypes/navigation";
import React from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	useActivePublication,
	useReactionStore,
	useThemeStore,
} from "store/Store";
import useVideoURLStore from "store/videoURL";
import formatHandle from "utils/formatHandle";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import createLivePeerAsset from "utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "utils/video/isInLivePeer";
import VideoPlayer from "../../packages/VideoPlayer";
import CollectVideoSheet from "components/VIdeo/Actions/CollectVideoSheet";

const VideoPage = ({ navigation }: RootStackScreenProps<"VideoPage">) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState<boolean>(false);
	const { activePublication } = useActivePublication();
	const { top } = useSafeAreaInsets();
	const theme = useThemeStore();

	const handleBlur = React.useCallback(() => {
		setVideoURI("");
		clearStats();
		setCollectStats(false, 0);
		setMirrorStats(false, 0);
	}, []);

	React.useEffect(() => {
		const delay = setTimeout(() => {
			setIsReadyToRender(true);
		}, 50);

		const blurSubscription = navigation.addListener("blur", handleBlur);

		//Clean-Up Listeners
		return () => {
			clearTimeout(delay);
			blurSubscription();
		};
	}, [activePublication]);

	const { clearStats, setCollectStats, setMirrorStats } = useReactionStore();

	const collectRef = React.useRef<BottomSheetMethods>(null);
	const mirrorRef = React.useRef<BottomSheetMethods>(null);
	const descRef = React.useRef<BottomSheetMethods>(null);
	const commentRef = React.useRef<BottomSheetMethods>(null);

	const openCommentSheet = () => commentRef?.current?.snapToIndex(0);

	const metadata = activePublication?.metadata as VideoMetadataV3;

	const { setVideoURI, uri } = useVideoURLStore();

	const LENS_MEDIA_URL = metadata?.asset?.video?.raw?.uri;

	useFocusEffect(
		React.useCallback(() => {
			if (metadata.asset?.video?.optimized?.uri) {
				setVideoURI(metadata.asset?.video?.optimized?.uri);
				return;
			}
			checkIfLivePeerAsset(LENS_MEDIA_URL).then((res) => {
				if (res) {
					Logger.Success("Transcoded LivePeer URL", res);
					setVideoURI(res);
				} else {
					setVideoURI(getIPFSLink(LENS_MEDIA_URL));
					createLivePeerAsset(LENS_MEDIA_URL);
				}
			});
			return () => {
				setVideoURI("");
			};
		}, [activePublication])
	);

	
	if (!isReadyToRender) return <VideoPageSkeleton />;

	return (
		<>
			<SafeAreaView style={[styles.container, { paddingTop: top }]}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<VideoPlayer
						source={{
							uri: uri,
						}}
						poster={{
							uri: getIPFSLink(getRawurl(metadata?.asset?.cover)),
						}}
						sliderTheme={{
							minimumTrackTintColor: theme.PRIMARY,
						}}
					/>
				</View>
				<ScrollView style={{ backgroundColor: "black" }}>
					<View style={styles.videoMetadataContainer}>
						<VideoMeta
							title={metadata?.title}
							description={metadata?.content}
							descRef={descRef}
						/>
						<VideoCreator
							profileId={activePublication?.by?.id}
							avatarLink={getRawurl(activePublication?.by?.metadata?.picture)}
							uploadedBy={
								activePublication?.by?.metadata?.displayName ||
								formatHandle(activePublication?.by?.handle as HandleInfo)
							}
							alreadyFollowing={
								activePublication?.by?.operations?.isFollowedByMe?.value ||
								false
							}
						/>
					</View>
					<VideoActions mirrorRef={mirrorRef} collectRef={collectRef}/>
					<View style={styles.commentsTitleContainer}>
						<TouchableOpacity
							style={styles.commentsContainer}
							onPress={openCommentSheet}
							activeOpacity={0.8}
						>
							<StyledText
								title="Comments"
								style={{
									fontSize: 16,
									fontWeight: "600",
									color: "white",
								}}
							/>
							<Icon name="arrowDown" color="white" size={16} />
						</TouchableOpacity>
					</View>
					<MoreVideos />
				</ScrollView>
			</SafeAreaView>
			<CommentSheet commentSheetRef={commentRef} />
			<MetaDataSheet sheetRef={descRef} />
			<MirrorVideoSheet sheetRef={mirrorRef} />
			<CollectVideoSheet sheetRef={collectRef} />
		</>
	);
};

export default VideoPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	videoMetadataContainer: {
		paddingHorizontal: 8,
		marginTop: 24,
		marginBottom: 16,
	},

	commentsTitleContainer: {
		marginHorizontal: 8,
	},
	commentsContainer: {
		backgroundColor: black[600],
		padding: 12,
		borderRadius: 8,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "center",
	},
});
