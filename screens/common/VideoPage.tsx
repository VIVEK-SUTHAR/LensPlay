import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import Sheet from "components/Bottom";
import Comment from "components/Comments";
import CommentInput from "components/Comments/CommentInput";
import Skeleton from "components/common/Skeleton";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import {
	CollectButton,
	LikeButton,
	ReportButton,
	ShareButton,
	VideoCreator,
	VideoMeta,
} from "components/VIdeo";
import DisLikeButton from "components/VIdeo/Actions/DisLikeButton";
import MirrorButton from "components/VIdeo/Actions/MirrorButton";
import VideoPageSkeleton from "components/VIdeo/VideoPageSkeleton";
import VideoPlayer from "components/VideoPlayer";
import { black, dark_primary, primary, white } from "constants/Colors";
import { LENSPLAY_SITE, STATIC_ASSET } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import {
	useCreateDataAvailabilityMirrorViaDispatcherMutation,
	useCreateMirrorViaDispatcherMutation,
	useProxyActionMutation,
} from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import { ToastType } from "customTypes/Store";
import { Image } from "expo-image";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";
import { useReaction } from "hooks/useLensQuery";
import React, { useEffect, useRef, useState } from "react";
import {
	BackHandler,
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Pressable,
	LayoutAnimation,
} from "react-native";
import {
	useActivePublication,
	useAuthStore,
	useProfile,
	useReactionStore,
	useToast,
} from "store/Store";
import useVideoURLStore from "store/videoURL";
import extractURLs from "utils/extractURL";
import getImageProxyURL from "utils/getImageProxyURL";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import TrackAction from "utils/Track";
import createLivePeerAsset from "utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "utils/video/isInLivePeer";
import { freeCollectPublication, freeMirror } from "../../api";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import Icon from "components/Icon";
import getPublicationCollectModule from "utils/lens/getPublicationCollectModule";

const VideoPage = ({ navigation }: RootStackScreenProps<"VideoPage">) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState(false);

	React.useEffect(() => {
		Logger.Count("Landed in VideoPage");
		const delay = setTimeout(() => {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			setIsReadyToRender(true);
		}, 0);
		return () => clearTimeout(delay);
	}, []);

	const { activePublication } = useActivePublication();
	const toast = useToast();
	const { accessToken } = useAuthStore();
	const userStore = useProfile();

	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
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

	const isDAPublication = activePublication?.isDataAvailability;

	const [createOnChainMirror] = useCreateMirrorViaDispatcherMutation();

	const [createProcyAction] = useProxyActionMutation({
		onCompleted: (data) => {
			toast.show("Collect Submitted", ToastType.SUCCESS, true);
			setCollectStats(true, collectStats?.collectCount + 1);
			collectRef?.current?.close();
			TrackAction(PUBLICATION.COLLECT_VIDEO);
		},
		onError: (error) => {
			if (error.message == "Can only collect if the publication has a `FreeCollectModule` set") {
				toast.show("You can't collect this video", ToastType.ERROR, true);
			} else {
				toast.show("Something went wrong", ToastType.ERROR, true);
			}

			collectRef?.current?.close();
		},
	});

	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		console.log(inFullscreen);
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
			Logger.Log("returning ffrom videopage");
			handler.remove();
		};
	}, []);

	const { data: ReactionData, error, loading } = useReaction(activePublication?.id);

	if (ReactionData) {
		console.log(ReactionData);
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

	const [createDataAvaibalityMirror] = useCreateDataAvailabilityMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("DA Mirrored", data);
		},
		onError: (err, cliOpt) => {
			Logger.Error("Error in DA Mirror", err, "\nClient Option", cliOpt);
			toast.show(err.message, ToastType.ERROR, true);
		},
	});

	Logger.Warn("Collect module", getPublicationCollectModule(activePublication?.collectModule));

	const collectRef = useRef<BottomSheetMethods>(null);
	const mirrorRef = useRef<BottomSheetMethods>(null);
	const descRef = useRef<BottomSheetMethods>(null);
	const onMirror = async () => {
		if (mirrorStats?.isMirrored) {
			toast.show("Already mirrored", ToastType.ERROR, true);
			mirrorRef.current?.close();
			return;
		}
		if (!activePublication?.profile?.dispatcher?.canUseRelay) {
			toast.show("Dispatcher is disabled", ToastType.ERROR, true);
			mirrorRef.current?.close();
			return;
		}
		if (isDAPublication) {
			toast.success("Mirror submitted");
			setMirrorStats(true, mirrorStats.mirrorCount + 1);
			mirrorRef.current?.close();
			createDataAvaibalityMirror({
				variables: {
					request: {
						from: userStore?.currentProfile?.id,
						mirror: activePublication?.id,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
			return;
		}
		try {
			toast.success("Mirror submitted!");
			setMirrorStats(true, mirrorStats.mirrorCount + 1);
			mirrorRef.current?.close();
			await createOnChainMirror({
				variables: {
					request: {
						profileId: userStore?.currentProfile?.id,
						publicationId: activePublication?.id,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
			TrackAction(PUBLICATION.MIRROR);
		} catch (error) {
			if (error instanceof Error) {
				toast.show(error.message, ToastType.ERROR, true);
				mirrorRef?.current?.close();
			}
		}
	};

	const collectPublication = async () => {
		try {
			if (collectStats?.isCollected) {
				toast.show("You have already collected the video", ToastType.ERROR, true);
				return;
			}
			if (!activePublication?.profile?.dispatcher?.canUseRelay) {
				toast.show("Dispatcher is disabled", ToastType.ERROR, true);
				return;
			}
			await createProcyAction({
				variables: {
					request: {
						collect: {
							freeCollect: {
								publicationId: activePublication?.id,
							},
						},
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				Logger.Error(error + "");
			}
		} finally {
			collectRef?.current?.close();
		}
	};
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
		}, [])
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
					<Image
						placeholder={getPlaceHolderImage()}
						transition={500}
						placeholderContentFit="cover"
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
						<StyledText
							title="Comments"
							style={{
								fontSize: 20,
								fontWeight: "700",
								color: "white",
								marginBottom: 8,
							}}
						/>
						<Comment publicationId={activePublication?.id} shots={false} />
					</View>
				</ScrollView>
				<CommentInput publicationId={activePublication?.id} />
			</SafeAreaView>
			<Sheet
				ref={collectRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				snapPoints={[580]}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
					>
						<Heading
							title={"Collect video"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "500",
							}}
						/>
						<Pressable
							onPress={() => {
								collectRef?.current?.close();
							}}
						>
							<Icon name="close" size={16} />
						</Pressable>
					</View>
					<View
						style={{
							borderBottomColor: black[300],
							borderBottomWidth: 1.5,
							marginTop: 8,
						}}
					/>
					<BottomSheetScrollView
						style={{
							flex: 1,
							paddingHorizontal: 16,
						}}
					>
						<View
							style={{
								marginTop: 20,
							}}
						>
							<Image
								source={{
									uri: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
								}}
								placeholder={getPlaceHolderImage()}
								transition={500}
								placeholderContentFit="contain"
								style={{
									height: 200,
									borderRadius: 8,
									width: "100%",
								}}
								contentFit="cover"
							/>
							<StyledText
								title={activePublication?.metadata?.name}
								style={{
									fontSize: 20,
									color: white[800],
									fontWeight: "600",
									marginTop: 16,
								}}
								numberOfLines={2}
							/>
						</View>
						{/* <View
							style={{
								marginTop: 8,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Icon name="info" color={black[100]} size={16} />
							<StyledText
								title={"This video is free to collect"}
								style={{
									fontSize: 16,
									color: black[100],
									fontWeight: "600",
									marginLeft: 4,
								}}
							/>
						</View> */}
						<View
							style={{
								marginTop: 16,
							}}
						>
							<Heading
								title={"Posted by"}
								style={{
									fontSize: 16,
									color: white[100],
									fontWeight: "600",
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 8,
								}}
							>
								<Avatar
									src={getRawurl(activePublication?.profile?.picture)}
									height={40}
									width={40}
								/>
								<View
									style={{
										marginHorizontal: 8,
										maxWidth: "100%",
									}}
								>
									<Heading
										title={activePublication?.profile?.name}
										numberOfLines={1}
										style={{
											color: "white",
											fontSize: 16,
											fontWeight: "500",
										}}
									/>
									<StyledText
										title={activePublication?.profile?.handle}
										style={{
											color: "gray",
											fontSize: 12,
											fontWeight: "500",
										}}
									/>
								</View>
							</View>
						</View>
						<View
							style={{
								marginVertical: 24,
							}}
						>
							<Button
								title={collectStats?.isCollected ? "Video already collected" : `Collect Video`}
								py={12}
								textStyle={{
									fontSize: 20,
									fontWeight: "600",
									textAlign: "center",
								}}
								bg={collectStats?.isCollected ? "#c0c0c0" : primary}
								onPress={() => {
									collectPublication();
								}}
							/>
						</View>
					</BottomSheetScrollView>
				</View>
			</Sheet>
			<Sheet
				ref={mirrorRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				snapPoints={[550]}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
					>
						<Heading
							title={"Mirror video"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "500",
							}}
						/>
						<Pressable
							onPress={() => {
								mirrorRef?.current?.close();
							}}
						>
							<Icon name="close" size={16} />
						</Pressable>
					</View>
					<View
						style={{
							borderBottomColor: black[300],
							borderBottomWidth: 1.5,
							marginTop: 8,
						}}
					/>
					<BottomSheetScrollView
						style={{
							flex: 1,
							paddingHorizontal: 16,
						}}
					>
						<View
							style={{
								marginTop: 20,
							}}
						>
							<Image
								source={{
									uri: getIPFSLink(getRawurl(activePublication?.metadata?.cover)),
								}}
								placeholder={getPlaceHolderImage()}
								transition={500}
								placeholderContentFit="contain"
								style={{
									height: 200,
									borderRadius: 8,
									width: "100%",
								}}
								contentFit="cover"
							/>
							<StyledText
								title={activePublication?.metadata?.name}
								style={{
									fontSize: 20,
									color: white[800],
									fontWeight: "600",
									marginTop: 16,
								}}
								numberOfLines={2}
							/>
						</View>
						<View
							style={{
								marginTop: 16,
							}}
						>
							<Heading
								title={"Posted by"}
								style={{
									fontSize: 16,
									color: white[100],
									fontWeight: "600",
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginTop: 8,
								}}
							>
								<Avatar
									src={getRawurl(activePublication?.profile?.picture)}
									height={40}
									width={40}
								/>
								<View
									style={{
										marginHorizontal: 8,
										maxWidth: "100%",
									}}
								>
									<Heading
										title={activePublication?.profile?.name}
										numberOfLines={1}
										style={{
											color: "white",
											fontSize: 16,
											fontWeight: "500",
										}}
									/>
									<StyledText
										title={activePublication?.profile?.handle}
										style={{
											color: "gray",
											fontSize: 12,
											fontWeight: "500",
										}}
									/>
								</View>
							</View>
						</View>
						<View
							style={{
								marginVertical: 20,
							}}
						>
							<Button
								title={mirrorStats?.isMirrored ? "Video already mirrored" : `Mirror Video`}
								py={12}
								textStyle={{
									fontSize: 20,
									fontWeight: "600",
									textAlign: "center",
								}}
								bg={mirrorStats?.isMirrored ? "#c0c0c0" : primary}
								onPress={() => {
									onMirror();
								}}
							/>
						</View>
					</BottomSheetScrollView>
				</View>
			</Sheet>
			<Sheet
				ref={descRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				handleStyle={{
					padding: 16,
				}}
				snapPoints={[550, 740]}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 16,
							paddingVertical: 8,
						}}
					>
						<Heading
							title={"Description"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "500",
							}}
						/>
						<Pressable
							onPress={() => {
								descRef?.current?.close();
							}}
						>
							<Icon name="close" size={16} />
						</Pressable>
					</View>
					<View
						style={{
							borderBottomColor: black[300],
							borderBottomWidth: 1.5,
							marginTop: 8,
						}}
					/>
					<BottomSheetScrollView>
						<View style={{ paddingHorizontal: 16 }}>
							<StyledText
								title={activePublication?.metadata?.name}
								style={{
									fontSize: 18,
									fontWeight: "600",
									marginVertical: 8,
									color: "white",
									textAlign: "left",
								}}
							/>
							<View
								style={{
									paddingVertical: 10,
									width: "100%",
									paddingHorizontal: 8,
									alignSelf: "center",
									justifyContent: "space-between",
									flexDirection: "row",
									borderBottomColor: "gray",
									borderBottomWidth: 1,
								}}
							>
								<View style={styles.verticleCenter}>
									<StyledText
										title={activePublication?.stats?.totalUpvotes || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Likes" style={{ color: "white" }} />
								</View>
								<View style={styles.verticleCenter}>
									<StyledText
										title={activePublication?.stats?.totalAmountOfCollects || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Collects" style={{ color: "white" }} />
								</View>
								<View style={styles.verticleCenter}>
									<StyledText
										title={activePublication?.stats?.totalAmountOfMirrors || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Mirrors" style={{ color: "white" }} />
								</View>
							</View>
							<StyledText
								title={
									extractURLs(activePublication?.metadata?.description) ||
									"No description provided by crator"
								}
								style={{
									textAlign: "justify",
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
							<StyledText
								title={`Posted via ${
									activePublication?.appId?.charAt(0)?.toUpperCase() +
										activePublication?.appId?.slice(1) || "LensPlay"
								}`}
								style={{
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
							<StyledText
								title={"Uploaded By"}
								style={{
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
							<VideoCreator
								alreadyFollowing={activePublication?.profile?.isFollowedByMe || false}
								avatarLink={getRawurl(activePublication?.profile?.picture) || STATIC_ASSET}
								profileId={activePublication?.profile?.id}
								uploadedBy={activePublication?.profile?.name || activePublication?.profile?.handle}
								showSubscribeButton={false}
								showSubscribers={true}
								subscribersCount={activePublication?.profile?.stats?.totalFollowers}
							/>
						</View>
					</BottomSheetScrollView>
				</View>
			</Sheet>
		</>
	);
};

export default VideoPage;
const styles = StyleSheet.create({
	statsLabel: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
	},
	verticleCenter: {
		alignItems: "center",
	},
});
