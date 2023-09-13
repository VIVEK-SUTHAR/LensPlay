import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import CommentSheet from "components/Comments/CommentSheet";
import Icon from "components/Icon";
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
import { black } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
	BackHandler,
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useLikeStore } from "store/ReactionStore";
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
	const { setLikeCount, setIsLiked, setIsDisLiked } = useLikeStore();

	React.useEffect(() => {
		const delay = setTimeout(() => {
			setIsReadyToRender(true);
		}, 100);
		return () => clearTimeout(delay);
	}, [activePublication]);

	const [isMute, setIsMute] = useState<boolean>(false);
	const { clearStats, setCollectStats, setMirrorStats } = useReactionStore();

	const handleBackButtonClick = React.useCallback(() => {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) {
			navigation.goBack();
			clearStats();
			setCollectStats(false, 0);
			setMirrorStats(false, 0);
		}
		return true;
	}, [navigation]);

	const handleBlur = React.useCallback(() => {
		setVideoURI("");
		clearStats();
		setCollectStats(false, 0);
		setMirrorStats(false, 0);
	}, []);

	navigation.addListener("blur", handleBlur);

	useEffect(() => {
		setIsLiked(activePublication?.reaction === "UPVOTE");
		setIsDisLiked(activePublication?.reaction === "DOWNVOTE");
		setLikeCount(activePublication?.stats?.totalUpvotes!);
		setCollectStats(
			activePublication?.hasCollectedByMe || false,
			activePublication?.stats?.totalAmountOfCollects || 0
		);
		if (activePublication?.__typename === "Mirror") {
			setMirrorStats(
				activePublication?.mirrorOf.mirrors?.length > 0,
				activePublication?.stats?.totalAmountOfMirrors || 0
			);
		}
		if (activePublication?.__typename === "Post") {
			setMirrorStats(
				activePublication?.mirrors?.length > 0,
				activePublication?.stats?.totalAmountOfMirrors || 0
			);
		}

		const handler = BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
		return () => {
			handler.remove();
		};
	}, []);

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
					<View style={{ paddingHorizontal: 8, marginTop: 24, marginBottom: 16 }}>
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
					</View>
					<ScrollView
						style={{
							marginBottom: 16,
							marginStart: 4,
						}}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<LikeButton />
						<DisLikeButton />
						<MirrorButton mirrorRef={mirrorRef} />
						<CollectButton collectRef={collectRef} />
						<ShareButton />
						<ReportButton />
					</ScrollView>
					<View
						style={{
							marginHorizontal: 8,
						}}
					>
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
			<CollectVideoSheet sheetRef={collectRef} />
			<MirrorVideoSheet sheetRef={mirrorRef} />
		</>
	);
};

export default VideoPage;

const styles = StyleSheet.create({
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
