import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { dark_primary, primary, white } from "constants/Colors";
import { LENSPLAY_SITE } from "constants/index";
import { PROFILE, PUBLICATION } from "constants/tracking";
import {
	PublicationStats,
	ReactionTypes,
	useAddReactionMutation,
	useCreateDataAvailabilityMirrorViaDispatcherMutation,
	useCreateMirrorViaDispatcherMutation,
	useRemoveReactionMutation,
} from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import React, { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile, useThemeStore, useToast } from "store/Store";
import extractURLs from "utils/extractURL";
import getDifference from "utils/getDifference";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

type CommentCardProps = {
	avatar: string;
	username: string;
	commentText: string;
	commentTime: string;
	id: string;
	isFollowdByMe: boolean | undefined;
	name: string | undefined;
	stats: PublicationStats;
	commentId: string;
	isIndexing?: boolean;
	isAlreadyLiked: boolean;
	isMirrored: boolean;
	isDA: boolean;
	address: string;
};

const CommentCard: React.FC<CommentCardProps> = ({
	avatar,
	username,
	commentText,
	commentTime,
	id,
	isFollowdByMe,
	name,
	stats,
	commentId,
	isIndexing,
	isAlreadyLiked,
	isMirrored,
	isDA,
	address
}) => {
	const [Liked, setLiked] = useState<boolean>(isAlreadyLiked);
	const [likes, setLikes] = useState<number>(stats?.totalUpvotes);
	const [mirrorCount, setMirrorCount] = useState<number>(stats?.totalAmountOfMirrors);
	const [isMirror, setIsMirror] = useState<boolean>(isMirrored);

	const { accessToken } = useAuthStore();
	const navigation = useNavigation();
	const userStore = useProfile();
	const { isGuest } = useGuestStore();
	const toast = useToast();

	const [addReaction] = useAddReactionMutation({
		onError: () => {
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
		onCompleted: () => {
			setLiked(true);
			setLikes((prev) => prev + 1);
		},
	});

	const [createOnChainMirror] = useCreateMirrorViaDispatcherMutation();

	const { PRIMARY } = useThemeStore();

	const [createDataAvaibalityMirror] = useCreateDataAvailabilityMirrorViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("DA Mirrored", data);
		},
		onError: (err, cliOpt) => {
			Logger.Error("Error in DA Mirror", err, "\nClient Option", cliOpt);
			toast.show(err.message, ToastType.ERROR, true);
		},
	});

	const [removeReaction] = useRemoveReactionMutation({
		onError: () => {
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
		onCompleted: () => {
			setLiked(false);
			setLikes((prev) => prev - 1);
		},
	});

	const setLike = async () => {
		if (isIndexing) return;
		if (!Liked) {
			addReaction({
				variables: {
					request: {
						profileId: userStore.currentProfile?.id,
						reaction: ReactionTypes.Upvote,
						publicationId: commentId,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		} else {
			removeReaction({
				variables: {
					request: {
						profileId: userStore.currentProfile?.id,
						reaction: ReactionTypes.Upvote,
						publicationId: commentId,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
						"origin": LENSPLAY_SITE,
					},
				},
			});
		}
	};


	const onMirror = async () => {
		if (isMirrored) {
			toast.show("Already mirrored", ToastType.ERROR, true);
			return;
		}
		try {
						
			toast.success("Mirror submitted!");
			setMirrorCount(mirrorCount => mirrorCount + 1);
			setIsMirror(true);
			if (isDA) {
				createDataAvaibalityMirror({
					variables: {
						request: {
							from: userStore?.currentProfile?.id,
							mirror: commentId,
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
			await createOnChainMirror({
				variables: {
					request: {
						profileId: userStore?.currentProfile?.id,
						publicationId: commentId,
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
				Logger.Error(error.message+'')
			}
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "black",
				borderColor: dark_primary,
				borderBottomWidth: 1,
				paddingVertical: 8,
				marginVertical: 4,
			}}
		>
			<Pressable
				onPress={() => {
					navigation.navigate("Channel", {
						profileId: id,
						isFollowdByMe: isFollowdByMe,
						name: name,
						ethAddress: address,
						handle: username
					});
				}}
				style={{
					marginRight: 8,
				}}
			>
				<Avatar src={avatar} height={40} width={40} />
			</Pressable>
			<View style={{ flex: 1 }}>
				<View>
					<Heading title={name || id} style={{ fontSize: 14, color: "white", fontWeight: "500" }} />
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Heading title={`@${username}`} style={{ fontSize: 12, color: "gray", marginTop: 2 }} />
						<StyledText
							title={isIndexing ? "Indexing" : getDifference(commentTime)}
							style={{ fontSize: 10, color: "gray" }}
						/>
					</View>
				</View>
				<StyledText
					style={{
						fontSize: 14,
						color: "white",
						fontWeight: "600",
						marginTop: 4,
					}}
					title={extractURLs(commentText)}
				></StyledText>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: 8,
						justifyContent: "space-between",
					}}
				>
					<Button
						title={likes}
						onPress={() => {
							if (isGuest) {
								toast.show("Please Login", ToastType.ERROR, true);
								return;
							}
							setLike();
							setLiked((prev) => !prev);
						}}
						width={"auto"}
						bg="transparent"
						type={"filled"}
						textStyle={{
							color: Liked ? primary : "white",
							fontSize: 14,
							fontWeight: "500",
							marginLeft: 4,
							paddingEnd: 16,
						}}
						icon={<Icon name="like" size={16} color={Liked ? primary : "white"} />}
					/>
					<Button
						title={mirrorCount}
						py={4}
						width={"auto"}
						type={"filled"}
						px={16}
						bg="transparent"
						textStyle={{
							color: isMirror?PRIMARY:"white",
							fontSize: 14,
							fontWeight: "500",
							marginLeft: 4,
						}}
						icon={<Icon name="mirror" size={20} color={isMirror?PRIMARY:"white"}/>}
						borderColor="#232323"
						onPress={async () => {
							if (isGuest) {
								toast.show("Please Login", ToastType.ERROR, true);
								return;
							}
							if(!isMirror){
								onMirror();
							}
						}}
					/>
					<Button
						title={""}
						py={4}
						width={"auto"}
						type={"filled"}
						px={16}
						bg="transparent"
						textStyle={{
							color: "white",
							fontSize: 14,
							fontWeight: "500",
							marginLeft: 4,
						}}
						icon={<Icon name="report" size={20} />}
						borderColor="#232323"
						onPress={() => {
							navigation.navigate("ReportPublication", {
								publicationId: id,
							});
						}}
					/>
				</View>
			</View>
		</View>
	);
};

export default React.memo(CommentCard);
