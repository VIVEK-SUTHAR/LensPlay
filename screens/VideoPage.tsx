import { View, ScrollView, SafeAreaView, ToastAndroid, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore, useProfile, useReactionStore, useThemeStore } from "../store/Store";
import { useState } from "react";
import { addLike, removeLike, isFollowedByMe } from "../api";
import { setStatusBarHidden } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import formatInteraction from "../utils/formatInteraction";
import { dark_primary } from "../constants/Colors";
import LikeIcon from "../components/svg/LikeIcon";
import DisLikeIcon from "../components/svg/LikeIcon";
import Comment from "../components/Comments/";
import CommentInput from "../components/Comments/CommentInput";
import {
	CollectButton,
	ReportButton,
	ShareButton,
	VideoCreator,
	VideoMeta,
} from "../components/VIdeo";

const VideoPage = ({ navigation, route }: RootStackScreenProps<"VideoPage">) => {
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likes, setLikes] = useState<number>(route.params.stats?.totalUpvotes);
	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
	const [isMute, setIsMute] = useState<boolean>(false);
	const [isalreadyLiked, setisalreadyLiked] = useState<boolean>(
		route.params.reaction === "UPVOTE" ? true : false
	);
	const [isalreadyDisLiked, setisalreadyDisLiked] = useState<boolean>(
		route.params.reaction === "DOWNVOTE" ? true : false
	);

	const { PRIMARY } = useThemeStore();
	const authStore = useAuthStore();
	const userStore = useProfile();
	const likedPublication = useReactionStore();

	const thumbup = likedPublication.likedPublication;
	const thumbdown = likedPublication.dislikedPublication;

	useEffect(() => {
		thumbup.map((publication) => {
			if (publication.id === route.params.id) {
				setisalreadyLiked(true);
				setisalreadyDisLiked(false);
				setLikes(publication.likes + 1);
			}
		});
		thumbdown.map((publication) => {
			if (publication.id === route.params.id) {
				if (isalreadyLiked) {
					setisalreadyDisLiked(true);
					setisalreadyLiked(false);
					setLikes((prev) => prev - 1);
				} else {
					setisalreadyDisLiked(true);
					setisalreadyLiked(false);
				}
			}
		});
	}, [navigation, route.params.playbackId]);

	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) navigation.goBack();
		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
	}, []);

	const PublicationStats = route.params.stats;

	const onLike = async () => {
		if (!isalreadyLiked && !isLiked) {
			setLikes((prev) => prev + 1);
			setIsLiked(true);
			setisalreadyDisLiked(false);
			addLike(authStore.accessToken, userStore.currentProfile?.id, route.params.id, "UPVOTE").then(
				(res) => {
					if (res.addReaction === null) {
						likedPublication.addToReactedPublications(route.params.id, likes, thumbdown);
					}
				}
			);
		}
	};

	const onDislike = async () => {
		if (!isalreadyDisLiked) {
			if (isalreadyLiked || isLiked) {
				setLikes((prev) => prev - 1);
				setIsLiked(false);
				setisalreadyLiked(false);
			}
			setisalreadyDisLiked(true);
			addLike(
				authStore.accessToken,
				userStore.currentProfile?.id,
				route.params.id,
				"DOWNVOTE"
			).then((res) => {
				if (res) {
					if (res.addReaction === null) {
						likedPublication.addToDislikedPublications(route.params.id, thumbup);
					}
				}
			});
			removeLike(authStore.accessToken, userStore.currentProfile?.id, route.params.id)
				.then((res) => {})
				.catch((error) => {
					if (error instanceof Error) {
						ToastAndroid.show("Can't react to post", ToastAndroid.SHORT);
					}
				});
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<Player
				poster={route.params.banner}
				title={route.params.title}
				url={route.params.playbackId}
				inFullscreen={inFullscreen}
				isMute={isMute}
				setInFullscreen={setInFullsreen}
				setIsMute={setIsMute}
			/>
			<ScrollView>
				<View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
					<VideoMeta title={route.params.title} description={route.params.description} />
					<VideoCreator
						profileId={route.params.profileId}
						avatarLink={route.params.avatar}
						uploadedBy={route.params.uploadedBy}
						alreadyFollowing={route.params.isFollowdByMe || false}
					/>
					<ScrollView
						style={{
							paddingVertical: 24,
						}}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Button
							title={formatInteraction(likes) || "0"}
							mx={4}
							px={16}
							width={"auto"}
							bg={dark_primary}
							type={"filled"}
							borderRadius={8}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white",
								marginLeft: 4,
							}}
							borderColor={isalreadyLiked ? PRIMARY : isLiked ? PRIMARY : "white"}
							onPress={onLike}
							icon={
								<LikeIcon
									height={20}
									width={20}
									filled={isalreadyLiked || isLiked ? true : false}
								/>
							}
						/>
						<Button
							title=""
							onPress={onDislike}
							mx={4}
							px={16}
							width={"auto"}
							bg={dark_primary}
							type={"filled"}
							borderRadius={8}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: "white",
							}}
							borderColor={isalreadyDisLiked ? PRIMARY : "white"}
							icon={
								<DisLikeIcon height={20} width={20} filled={isalreadyDisLiked ? true : false} />
							}
						/>
						<CollectButton
							publicationId={route.params.id}
							bannerUrl={route.params.banner}
							title={route.params.uploadedBy}
							totalCollects={PublicationStats.totalAmountOfCollects}
							videoUrl={route.params.playbackId}
						/>
						<ShareButton title={route.params.title} id={route.params.id} />
						<ReportButton />
					</ScrollView>
					<Comment publicationId={route.params.id} />
				</View>
			</ScrollView>
			<CommentInput publicationId={route.params.id} />
		</SafeAreaView>
	);
};

export default VideoPage;
