import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, primary } from "constants/Colors";
import { Comment } from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import useLike from "hooks/reactions/useLike";
import useMirror from "hooks/reactions/useMirror";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useThemeStore, useToast } from "store/Store";
import extractURLs from "utils/extractURL";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

function CommentCard({ comment }: { comment: Comment }) {
	const [isLiked, setIsLiked] = useState<boolean>(comment?.reaction === "UPVOTE");
	const [likeCount, setLikeCount] = useState<number>(comment?.stats?.totalUpvotes);
	const [mirrorCount, setMirrorCount] = useState<number>(comment?.stats?.totalAmountOfMirrors);
	const [isMirrored, setIsMirrored] = useState<boolean>(comment?.mirrors.length > 0);
	const navigation = useNavigation();
	const { isGuest } = useGuestStore();
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { addLike, removeLike } = useLike();
	const { mirrorPublication } = useMirror();

	const handleLike = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (!isLiked) {
			setIsLiked(true);
			setLikeCount(likeCount + 1);
			await addLike(comment);
		} else {
			setIsLiked(false);
			setLikeCount(likeCount - 1);
			await removeLike(comment);
		}
	};

	const handleMirror = async () => {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (isMirrored) return;
		try {
			setIsMirrored(true);
			setMirrorCount(mirrorCount + 1);
			await mirrorPublication(comment);
		} catch (error) {
			if (error instanceof Error) {
				toast.show(error.message, ToastType.ERROR, true);
				Logger.Error(error.message + "");
			}
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: black[600],
				borderColor: black[600],
				borderBottomWidth: 1,
				paddingVertical: 8,
				marginVertical: 4,
			}}
		>
			<Pressable
				onPress={() => {
					navigation.navigate("Channel", {
						name: comment?.profile?.name || formatHandle(comment?.profile?.handle),
						handle: comment?.profile?.handle,
					});
				}}
				style={{
					marginRight: 8,
				}}
			>
				<Avatar src={getRawurl(comment?.profile?.picture)} height={40} width={40} />
			</Pressable>
			<View style={{ flex: 1 }}>
				<View>
					<Heading
						title={comment?.profile?.name || formatHandle(comment?.profile?.handle)}
						style={{ fontSize: 14, color: "white", fontWeight: "500" }}
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Heading
							title={formatHandle(comment?.profile?.handle)}
							style={{ fontSize: 12, color: "gray", marginTop: 2 }}
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
					title={extractURLs(comment?.metadata?.content || comment?.metadata?.description)}
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
						title={likeCount}
						onPress={handleLike}
						width={"auto"}
						bg="transparent"
						type={"filled"}
						textStyle={{
							color: isLiked ? primary : "white",
							fontSize: 14,
							fontWeight: "500",
							marginLeft: 4,
							paddingEnd: 16,
						}}
						icon={<Icon name="like" size={16} color={isLiked ? primary : "white"} />}
					/>
					<Button
						title={mirrorCount}
						py={4}
						width={"auto"}
						type={"filled"}
						px={16}
						bg="transparent"
						textStyle={{
							color: isMirrored ? PRIMARY : "white",
							fontSize: 14,
							fontWeight: "500",
							marginLeft: 4,
						}}
						icon={<Icon name="mirror" size={20} color={isMirrored ? PRIMARY : "white"} />}
						borderColor="#232323"
						onPress={handleMirror}
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
								publicationId: comment?.id,
							});
						}}
					/>
				</View>
			</View>
		</View>
	);
}

export default React.memo(CommentCard);
