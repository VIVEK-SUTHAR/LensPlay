import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import CommentSheet from "components/Comments/CommentSheet";
import Skeleton from "components/common/Skeleton";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import LPImage from "components/UI/LPImage";
import StyledText from "components/UI/StyledText";
import {
	CollectButton,
	LikeButton,
	ReportButton,
	ShareButton,
	VideoCreator,
	VideoMeta,
} from "components/VIdeo";
import CollectVideoSheet from "components/VIdeo/Actions/CollectVideoSheet";
import DisLikeButton from "components/VIdeo/Actions/DisLikeButton";
import MetaDataSheet from "components/VIdeo/Actions/MetaDataSheet";
import MirrorButton from "components/VIdeo/Actions/MirrorButton";
import MirrorVideoSheet from "components/VIdeo/Actions/MirrorVideoSheet";
import MoreVideos from "components/VIdeo/MoreVideos";
import VideoPageSkeleton from "components/VIdeo/VideoPageSkeleton";
import VideoPlayer from "components/VideoPlayer";
import { black, dark_primary } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import { useReaction } from "hooks/useLensQuery";
import React, { useEffect, useRef, useState } from "react";
import {
	BackHandler,
	Dimensions,
	LayoutAnimation,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useActivePublication, useReactionStore } from "store/Store";
import useVideoURLStore from "store/videoURL";
import getImageProxyURL from "utils/getImageProxyURL";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import createLivePeerAsset from "utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "utils/video/isInLivePeer";

const VideoPage = ({ navigation }: RootStackScreenProps<"VideoPage">) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState<boolean>(false);
	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
	const { activePublication } = useActivePublication();

	React.useEffect(() => {
		Logger.Count("Landed in VideoPage");
		const delay = setTimeout(() => {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			setIsReadyToRender(true);
		}, 0);
		return () => clearTimeout(delay);
	}, [activePublication]);

	const [isMute, setIsMute] = useState<boolean>(false);
	const {
		reaction,
		setReaction,
		videopageStats,
		collectStats,
		mirrorStats,
		setVideoPageStats,
		clearStats,
		setCollectStats,
		setMirrorStats,
	} = useReactionStore();

	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) {
			navigation.goBack();
			setReaction(false);
			clearStats();
			setCollectStats(false, 0);
			setMirrorStats(false, 0);
		}
		return true;
	}

	navigation.addListener("blur", () => {
		setReaction(false);
		setVideoURI("");
		clearStats();
		setCollectStats(false, 0);
		setMirrorStats(false, 0);
	});

	navigation.addListener("focus", () => {
		setInFullsreen(false);
	});

	useEffect(() => {
		const handler = BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
		return () => {
			handler.remove();
		};
	}, []);

	const { data: ReactionData, error, loading } = useReaction(activePublication?.id);

	if (ReactionData) {
		if (!reaction) {
			setReaction(true);
			setVideoPageStats(
				ReactionData?.publication?.reaction === "UPVOTE",
				ReactionData?.publication?.reaction === "DOWNVOTE",
				ReactionData?.publication?.stats?.totalUpvotes
			);
			setCollectStats(
				ReactionData?.publication?.hasCollectedByMe,
				ReactionData?.publication?.stats?.totalAmountOfCollects
			);
			setMirrorStats(
				ReactionData?.publication?.mirrors?.length > 0,
				ReactionData?.publication?.stats?.totalAmountOfMirrors
			);
		}
	}

	const collectRef = useRef<BottomSheetMethods>(null);
	const mirrorRef = useRef<BottomSheetMethods>(null);
	const descRef = useRef<BottomSheetMethods>(null);
	const commentRef = useRef<BottomSheetMethods>(null);

	const openCommentSheet = () => commentRef?.current?.snapToIndex(0);

	const LENS_MEDIA_URL = activePublication?.metadata?.media[0]?.original?.url;
	const { setVideoURI, uri } = useVideoURLStore();

	useFocusEffect(
		React.useCallback(() => {
			if (
				activePublication?.metadata?.media[0]?.optimized?.url?.includes("https://lp-playback.com")
			) {
				setVideoURI(activePublication?.metadata?.media[0]?.optimized?.url);
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
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				{uri.length > 0 ? (
					<VideoPlayer
						poster={getRawurl(activePublication?.metadata?.cover)}
						title={activePublication?.metadata?.name || ""}
						url={uri}
						inFullscreen={inFullscreen}
						isMute={isMute}
						setInFullscreen={setInFullsreen}
						setIsMute={setIsMute}
					/>
				) : (
					<LPImage
						source={{
							uri: getImageProxyURL({
								formattedLink: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
							}),
						}}
						style={{
							width: inFullscreen
								? Dimensions.get("screen").height
								: Dimensions.get("screen").width,
							height: inFullscreen ? Dimensions.get("screen").width : 250,
						}}
					/>
				)}
				<ScrollView>
					<View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
						<VideoMeta
							title={activePublication?.metadata?.name}
							description={activePublication?.metadata?.description}
							descRef={descRef}
						/>
						<VideoCreator
							profileId={activePublication?.profile?.id}
							avatarLink={getRawurl(activePublication?.profile?.picture)}
							uploadedBy={activePublication?.profile?.name || activePublication?.profile?.handle}
							alreadyFollowing={activePublication?.profile?.isFollowedByMe || false}
						/>
						<ScrollView
							style={{
								paddingVertical: 24,
							}}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							{loading || !reaction ? (
								<Skeleton
									children={
										<Button
											title={""}
											mx={4}
											px={34}
											width={"auto"}
											bg={dark_primary}
											type={"filled"}
											borderRadius={8}
										/>
									}
									number={5}
									horizontal={true}
								/>
							) : (
								<>
									<LikeButton
										like={videopageStats?.likeCount}
										id={activePublication?.id}
										isalreadyLiked={videopageStats?.isLiked}
									/>
									<DisLikeButton
										isalreadyDisLiked={videopageStats?.isDisliked}
										id={activePublication?.id}
									/>
									<MirrorButton
										id={activePublication?.id}
										totalMirrors={mirrorStats?.mirrorCount}
										isAlreadyMirrored={mirrorStats?.isMirrored}
										bannerUrl={getRawurl(activePublication?.metadata?.cover)}
										mirrorRef={mirrorRef}
									/>
									<CollectButton
										totalCollects={collectStats?.collectCount}
										collectRef={collectRef}
										hasCollected={collectStats?.isCollected}
									/>
									<ShareButton
										title={activePublication?.profile?.name || activePublication?.profile.handle}
										publicationId={activePublication?.id}
									/>
									<ReportButton publicationId={activePublication?.id} />
								</>
							)}
						</ScrollView>
						<View style={styles.commentsContainer}>
							<StyledText
								title="Comments"
								style={{
									fontSize: 16,
									fontWeight: "700",
									color: "white",
								}}
							/>
							<TouchableOpacity onPress={openCommentSheet}>
								<Icon name="arrowDown" color="white" size={20} />
							</TouchableOpacity>
						</View>
					</View>
					<MoreVideos />
				</ScrollView>
			</SafeAreaView>
			<CommentSheet commentSheetRef={commentRef} />
			<MetaDataSheet sheetRef={descRef} />
			<CollectVideoSheet sheetRef={collectRef} />
			<MirrorVideoSheet sheetRef={mirrorRef} />
		</>
	);
};
export default VideoPage;
const styles = StyleSheet.create({
	commentsContainer: {
		backgroundColor: black[600],
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8,
		width: "98%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "center",
	},
});
