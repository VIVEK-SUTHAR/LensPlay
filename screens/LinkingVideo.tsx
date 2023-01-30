import {
	View,
	Share,
	ScrollView,
	SafeAreaView,
	ToastAndroid,
	BackHandler,
	TextInput,
	Text,
	Linking,
	Pressable,
} from "react-native";
import { AntDesign, Entypo, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useAuthStore, useProfile, useThemeStore, useToast } from "../store/Store";
import { useState } from "react";
import { setStatusBarHidden, StatusBar } from "expo-status-bar";
import { client } from "../apollo/client";
import Avatar from "../components/UI/Avatar";
import Heading from "../components/UI/Heading";
import SubHeading from "../components/UI/SubHeading";
import * as ScreenOrientation from "expo-screen-orientation";
import Drawer from "../components/UI/Drawer";
import Player from "../components/VideoPlayer";
import Button from "../components/UI/Button";
import { RootStackScreenProps } from "../types/navigation/types";
import formatInteraction from "../utils/formatInteraction";
import { ToastType } from "../types/Store";
import fetchPublicationById from "../apollo/Queries/fetchPublicationById";
import { LensPublication } from "../types/Lens/Feed";
import getIPFSLink from "../utils/getIPFSLink";
import getComments from "../apollo/Queries/getComments";
import { Comments } from "../types/Lens/Feed";
import CommentCard from "../components/CommentCard";
import CommentSkeleton from "../components/UI/CommentSkeleton";
import AnimatedLottieView from "lottie-react-native";


const LinkingVideo = ({ navigation, route }: RootStackScreenProps<"LinkingVideos">) => {
	const [inFullscreen, setInFullsreen] = useState<boolean>(false);
	const [descOpen, setDescOpen] = useState<boolean>(false);
	const [ismodalopen, setIsmodalopen] = useState<boolean>(false);
	const [commentText, setCommentText] = useState<string>("");
	const [isMute, setIsMute] = useState<boolean>(false);
	const [isImdexing, setIsImdexing] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [videoData, setVideoData] = useState<LensPublication>();
	const [isFocused, setIsFocused] = useState(false);
	const [comments, setComments] = useState<Comments[]>([]);

	const theme = useThemeStore();
	const authStore = useAuthStore();
	const userStore = useProfile();
	const toast = useToast();

	function handleBackButtonClick() {
		setStatusBarHidden(false, "fade");
		setInFullsreen(!inFullscreen);
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
		if (!inFullscreen) navigation.goBack();
		return true;
	}

	useEffect(() => {
		let publicationId = "";
		Linking.addEventListener("url", (event) => {
			const id = event?.url?.split("/watch/")[1];
			publicationId = id;
			getVideoById(publicationId);
			return;
		});
		Linking.getInitialURL().then((res) => {
			console.log(res);
			
			const id = res?.split("/watch/")[1];
			publicationId = id ? id : "";
			getVideoById(publicationId);
			return;
		});
		BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
	}, []);
	
	async function fetchComments(publicationId): Promise<void> {
		try {
			const data = await client.query({
				query: getComments,
				variables: {
					postId: publicationId,
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${authStore.accessToken}`,
					},
				},
			});
			setComments([]);
			setComments(data.data.publications.items);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Can't fetch comments", { cause: error.cause });
			}
		} finally {
			setIsLoading(false);
		}
	}

	const getVideoById = async (pubId: string) => {
		setIsLoading(true);
		try {
			const feed = await client.query({
				query: fetchPublicationById,
				variables: {
					pubId: pubId,
				},
				context: {
					headers: {
						"x-access-token": authStore.accessToken ? `Bearer ${authStore.accessToken}` : "",
					},
				},
			});
			setVideoData(feed.data.publication);
			fetchComments(pubId);
			
			return feed;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Something went wrong", { cause: error });
			}
		} finally {
			setIsLoading(false);
		}
	};
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: `Let's watch ${videoData?.metadata?.name} by ${videoData?.profile.handle} on LensPlay,
        
        `,
			});
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};
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
							style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: "gray" }}
						></View>
						<View style={{ marginHorizontal: 8 }}>
							<View style={{ height: 8, width: 100, backgroundColor: "gray" }}></View>
							<View
								style={{ height: 8, width: 45, backgroundColor: "gray", marginVertical: 8 }}
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
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor={"black"} translucent={true} />
			<Player
				poster={videoData?.metadata?.cover}
				title={videoData?.metadata?.name || ""}
				url={videoData?.metadata?.media[0]?.original?.url || ""}
				inFullscreen={inFullscreen}
				isMute={isMute}
				setInFullscreen={setInFullsreen}
				setIsMute={setIsMute}
			/>
			<Drawer isOpen={ismodalopen} setIsOpen={setIsmodalopen}>
				<View
					style={{
						width: "100%",
						height: "100%",
						opacity: 1,
						alignItems: "center",
					}}
				>
					<View style={{ maxWidth: "90%" }}>
						<Player
							poster={videoData?.metadata?.cover}
							title={videoData?.metadata.name || ""}
							url={videoData?.metadata.media[0].original.url || ""}
							inFullscreen={inFullscreen}
							isMute={isMute}
							setInFullscreen={setInFullsreen}
							setIsMute={setIsMute}
						/>
					</View>
					<Heading
						title={`${videoData?.metadata?.name} by ${videoData?.profile?.name}`}
						style={{
							textAlign: "center",
							fontSize: 16,
							color: "white",
							fontWeight: "600",
							marginVertical: 12,
						}}
					/>
					<Button
						title="Collect for free"
						width={"90%"}
						py={8}
						my={4}
						textStyle={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}
						onPress={() => {
							setIsmodalopen(false);
							toast.show("Collect Submitted", ToastType.SUCCESS, true);
						}}
					/>
				</View>
			</Drawer>
			<ScrollView>
				<View style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Heading
							title={videoData?.metadata?.name}
							style={{
								fontSize: 16,
								fontWeight: "700",
								color: "white",
							}}
						/>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Feather
								name={`chevron-${descOpen ? "up" : "down"}`}
								size={28}
								color="white"
								onPress={() => setDescOpen(!descOpen)}
							/>
						</View>
					</View>
					<View>
						{descOpen ? (
							<View style={{ marginTop: 8 }}>
								<SubHeading
									title={videoData?.metadata?.description}
									style={{ color: "white", fontSize: 14 }}
								/>
							</View>
						) : (
							<></>
						)}
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
							<Avatar src={videoData?.profile?.picture?.original?.url} width={40} height={40} />
							<View style={{ marginHorizontal: 8 }}>
								<Heading
									title={videoData?.profile?.name}
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "500",
									}}
								/>
								<SubHeading
									title={`@${videoData?.profile?.handle}`}
									style={{
										color: "gray",
										fontSize: 12,
										fontWeight: "500",
									}}
								/>
							</View>
						</View>
						<Button
							title={"Subscribe"}
							width={"auto"}
							px={16}
							py={8}
							type={"filled"}
							bg={theme.PRIMARY}
							textStyle={{
								fontSize: 16,
								fontWeight: "700",
								marginHorizontal: 4,
								color: "black",
							}}
							onPress={async () => {}}
						/>
					</View>
					<ScrollView
						style={{
							paddingVertical: 24,
						}}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<Button
							title={videoData?.stats?.totalUpvotes || "0"}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: "white",
								marginLeft: 4,
							}}
							borderColor={"white"}
							onPress={() => {
								toast.show("Please login to interact", ToastType.ERROR, true);
							}}
							icon={<AntDesign name={"like1"} size={16} color={"white"} />}
						/>
						<Button
							title=""
							mx={4}
							px={16}
							width={"auto"}
							type={"outline"}
							textStyle={{
								fontSize: 14,
								fontWeight: "500",
								color: "white",
							}}
							borderColor={"white"}
							onPress={() => {
								toast.show("Please login to interact", ToastType.ERROR, true);
							}}
							icon={<AntDesign name={"dislike1"} size={16} color={"white"} />}
						/>
						<Button
							title={`${videoData?.stats?.totalAmountOfCollects} Collects`}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<Entypo name="folder-video" size={18} color={"white"} />}
							onPress={() => {
								toast.show("Please login to collect", ToastType.ERROR, true);
							}}
							textStyle={{ color: "white", marginHorizontal: 4 }}
						/>
						<Button
							title={"Share"}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<FontAwesome name="share" size={16} color="white" />}
							onPress={onShare}
							textStyle={{ color: "white", marginHorizontal: 4 }}
						/>
						<Button
							title={"Report"}
							mx={4}
							px={10}
							width={"auto"}
							type={"outline"}
							icon={<MaterialIcons name="report" size={16} color="white" />}
							textStyle={{ color: "white", marginHorizontal: 4 }}
							onPress={() => {
								toast.show("Please login to report", ToastType.ERROR, true);
							}}
						/>
					</ScrollView>
					<View>
						<SubHeading
							title="Comments"
							style={{
								fontSize: 20,
								fontWeight: "700",
								color: "white",
								marginBottom: 8,
							}}
						/>
						{isImdexing ? (
							<CommentCard
								avatar={userStore.currentProfile?.picture.original.url}
								commentText={commentText}
								name={userStore.currentProfile?.name}
								username={userStore.currentProfile?.handle || ""}
								isIndexing={true}
								commentTime={""}
								id={""}
								isFollowdByMe={undefined}
								stats={{
									totalUpvotes: "0",
									totalAmountOfCollects: "0",
									totalAmountOfMirrors: "0",
								}}
								commentId={""}
							/>
						) : (
							<></>
						)}
						{isLoading ? (
							<ScrollView>
								<CommentSkeleton />
								<CommentSkeleton />
								<CommentSkeleton />
								<CommentSkeleton />
								<CommentSkeleton />
								<CommentSkeleton />
								<CommentSkeleton />
							</ScrollView>
						) : (
							<></>
						)}
						{!isLoading && comments.length == 0 ? (
							<View style={{ maxHeight: 200 }}>
								<AnimatedLottieView
									autoPlay
									style={{
										height: "90%",
										alignSelf: "center",
									}}
									source={require("../assets/nocomments.json")}
								/>
								<Heading
									title="There are no comments yet"
									style={{
										color: "white",
										fontSize: 20,
										textAlign: "center",
									}}
								></Heading>
							</View>
						) : (
							comments?.map((item, index) => {
								return (
									<CommentCard
										key={item?.id}
										username={item?.profile?.handle}
										avatar={item?.profile?.picture?.original?.url}
										commentText={item?.metadata?.content || item?.metadata?.description}
										commentTime={item?.createdAt}
										id={item?.profile?.id}
										isFollowdByMe={item?.profile?.isFollowedByMe}
										name={item?.profile?.name}
										stats={item?.stats}
										commentId={item?.id}
									/>
								);
							})
						)}
					</View>
				</View>
			</ScrollView>
			<View
				style={{
					backgroundColor: "#171923",
					width: "100%",
					height: 60,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						flex: 0.2,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Avatar
						src={getIPFSLink(userStore.currentProfile?.picture.original.url)}
						height={28}
						width={28}
					/>
				</View>
				<TextInput
					placeholder="What's in your mind"
					style={{ flex: 1, color: "white" }}
					selectionColor={theme.PRIMARY}
					onFocus={(e) => {
						setIsFocused((state) => !state);
					}}
					onSubmitEditing={() => {
						setIsFocused((state) => !state);
					}}
					onPressIn={() => {
						setIsFocused((state) => !state);
					}}
					onPressOut={() => {
						setIsFocused((state) => !state);
					}}
					onBlur={() => {
						setIsFocused((state) => !state);
					}}
					onChange={(e) => {}}
					placeholderTextColor={theme.PRIMARY}
				/>
				{isFocused ? (
					<Pressable
						android_ripple={{
							color: "gray",
							radius: 20,
						}}
						style={{
							height: 60,
							justifyContent: "center",
							alignItems: "center",
							// marginHorizontal: 2,
							paddingHorizontal: 12,
						}}
						onPressIn={() => {
							toast.show("Please login to comment", ToastType.ERROR, true);
						}}
					>
						<Feather name="send" color={"gray"} size={24} />
					</Pressable>
				) : (
					<></>
				)}
			</View>
		</SafeAreaView>
	);
};

export default LinkingVideo;
