import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CommentSheet from "components/Comments/CommentSheet";
import Icon from "components/Icon";
import LPImage from "components/UI/LPImage";
import CollectVideoSheet from "components/VIdeo/Actions/CollectVideoSheet";
import MetaDataSheet from "components/VIdeo/Actions/MetaDataSheet";
import MirrorVideoSheet from "components/VIdeo/Actions/MirrorVideoSheet";
import MoreVideos from "components/VIdeo/MoreVideos";
import VideoPlayer from "components/VideoPlayer";
import { black } from "constants/Colors";
import { Post, usePublicationDetailsLazyQuery } from "customTypes/generated";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useVideoURLStore from "store/videoURL";
import getImageProxyURL from "utils/getImageProxyURL";
import Logger from "utils/logger";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import {
	CollectButton,
	LikeButton,
	ReportButton,
	ShareButton,
	VideoCreator,
	VideoMeta,
} from "../../components/VIdeo";
import DisLikeButton from "../../components/VIdeo/Actions/DisLikeButton";
import MirrorButton from "../../components/VIdeo/Actions/MirrorButton";
import { useActivePublication, useReactionStore } from "../../store/Store";

import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";
import { RootStackScreenProps } from "customTypes/navigation";

const LinkingVideo = ({ navigation, route }: RootStackScreenProps<"LinkingVideo">) => {
	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
	const [isMute, setIsMute] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { videopageStats, setVideoPageStats, clearStats, setCollectStats, setMirrorStats } =
		useReactionStore();
	const { activePublication, setActivePublication } = useActivePublication();

	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) {
			clearStats();
			setCollectStats(false, 0);
			setMirrorStats(false, 0);
			navigation.goBack();
		}
		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
		getVideoById(route.params.id);
	}, [route.params.id]);

	const { setVideoURI, uri } = useVideoURLStore();
	const [fetchPub] = usePublicationDetailsLazyQuery();

	const getVideoById = async (pubId: string) => {
		try {
			const feed = await fetchPub({
				variables: {
					request: {
						publicationId: pubId,
					},
				},
			});
			setActivePublication(feed?.data?.publication as Post);
			setVideoPageStats(
				activePublication?.reaction === "UPVOTE",
				activePublication?.reaction === "DOWNVOTE",
				activePublication?.stats?.totalUpvotes || 0
			);
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
			if (
				activePublication?.metadata?.media[0]?.optimized?.url?.includes("https://lp-playback.com")
			) {
				setVideoURI(feed?.data?.publication?.metadata?.media[0]?.optimized?.url);
				return;
			}
			setVideoURI(feed?.data?.publication?.metadata?.media[0]?.original?.url);
			return feed;
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error("Failed to fetch video", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const collectRef = useRef<BottomSheetMethods>(null);
	const mirrorRef = useRef<BottomSheetMethods>(null);
	const descRef = useRef<BottomSheetMethods>(null);
	const commentRef = useRef<BottomSheetMethods>(null);

	const openCommentSheet = () => commentRef?.current?.snapToIndex(0);

	if (isLoading) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				<View
					style={{
						height: 280,
						backgroundColor: "gray",
					}}
				></View>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 15,
						justifyContent: "space-between",
						paddingHorizontal: 5,
					}}
				>
					<View style={{ height: 15, width: 150, backgroundColor: "gray" }}></View>
					<View style={{ height: 15, width: 35, backgroundColor: "gray" }}></View>
				</View>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						paddingVertical: 4,
						justifyContent: "space-between",
						marginTop: 8,
					}}
				>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View
							style={{
								height: 40,
								width: 40,
								borderRadius: 50,
								backgroundColor: "gray",
							}}
						/>
						<View style={{ marginHorizontal: 8 }}>
							<View style={{ height: 8, width: 100, backgroundColor: "gray" }}></View>
							<View
								style={{
									height: 8,
									width: 45,
									backgroundColor: "gray",
									marginVertical: 8,
								}}
							></View>
						</View>
					</View>
					<Button
						title={"Subscribe"}
						width={"auto"}
						px={16}
						py={8}
						type={"filled"}
						bg={"gray"}
						textStyle={{
							fontSize: 16,
							fontWeight: "700",
							marginHorizontal: 4,
							color: "black",
						}}
						onPress={async () => {}}
					/>
				</View>
			</SafeAreaView>
		);
	}
	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				{uri?.length > 0 ? (
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
					</View>
					<ScrollView
						style={{
							marginBottom: 16,
							marginStart: 4,
						}}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<LikeButton
							like={videopageStats?.likeCount}
							id={activePublication?.id}
							isalreadyLiked={videopageStats?.isLiked}
						/>
						<DisLikeButton
							isalreadyDisLiked={videopageStats?.isDisliked}
							id={activePublication?.id}
						/>
						<MirrorButton mirrorRef={mirrorRef} />
						<CollectButton collectRef={collectRef} />
						<ShareButton />
						<ReportButton />
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

export default LinkingVideo;

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
