import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { textOnly } from "@lens-protocol/metadata/";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import { black } from "constants/Colors";
import { APP_ID, LENSPLAY_SITE } from "constants/index";
import { ToastType } from "customTypes/Store";
import { useCommentOnMomokaMutation, useCommentOnchainMutation } from "customTypes/generated";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import {
	useActivePublication,
	useAuthStore,
	useProfile,
	useThemeStore,
	useToast,
} from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import uploadMetaDataToArweave from "utils/uploadMetaToArweave";
import uploadProfileMetadata from "utils/uploadProfileMetadata";

type CommentInputProps = {
	publicationId: string;
};

const CommentInput = ({ publicationId }: CommentInputProps) => {
	const [commentText, setCommentText] = useState<string>("");
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const toast = useToast();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { isGuest } = useGuestStore();
	const { activePublication } = useActivePublication();

	const [createComment] = useCommentOnchainMutation({
		onCompleted: (data) => {
			Logger.Success("Done", data);
		},
		onError: (errr) => {
			Logger.Error("Error in commentiing", errr);
			toast.error("Something went wrong");
		},
	});

	const [createDataAvaibalityComment] = useCommentOnMomokaMutation({
		onCompleted: (data) => {
			Logger.Success("DA Comment published", data);
		},
		onError: (err, cliOpt) => {
			Logger.Error("Error in DA Comment", err, "\nClient Option", cliOpt);
		},
	});

	async function publishComment() {
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		if (commentText.length === 0) {
			toast.show("Please type something", ToastType.ERROR, true);
			return;
		}

		const isDAPublication = Boolean(activePublication?.momoka?.proof);

		if (isDAPublication) {
			toast.success("Comment submitted!");
			setCommentText("");
			setIsFocused(false);
			const commentMetadata = textOnly({
				content: commentText,
				appId: APP_ID,
				marketplace: {
					description: commentText,
					name: commentText,
					external_url: `https://www.lensplay.xyz/${currentProfile?.handle}`,
				},
			});
			const contenturi = await uploadProfileMetadata(commentMetadata as any);
			createDataAvaibalityComment({
				variables: {
					request: {
						commentOn: publicationId,
						contentURI: `ar://${contenturi.id}`,
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
			toast.success("Comment submitted!");
			setCommentText("");
			setIsFocused(false);
			const commentMetadata = textOnly({
				content: commentText,
				appId: APP_ID,
				marketplace: {
					description: commentText,
					name: commentText,
					external_url: `https://www.lensplay.xyz/${currentProfile?.handle}`,
				},
			});
			const contenturi = await uploadProfileMetadata(commentMetadata as any);
			await createComment({
				variables: {
					request: {
						commentOn: publicationId,
						contentURI: `ar://${contenturi.id}`,
						referenceModule: {
							followerOnlyReferenceModule: false,
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
			setCommentText("");
			toast.show("Something Went wrong", ToastType.ERROR, true);
		}
	}

	return (
		<View
			style={{
				paddingBottom: 24,
				backgroundColor: black[600],
				borderTopWidth: 1,
				borderColor: black[400],
			}}
		>
			<View
				style={{
					width: "100%",
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
						src={getIPFSLink(getRawurl(currentProfile?.metadata?.picture))}
						height={28}
						width={28}
					/>
				</View>
				<BottomSheetTextInput
					placeholder="What's in your mind"
					style={{ flex: 1, color: "white" }}
					selectionColor={PRIMARY}
					value={commentText}
					onFocus={() => {
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
					onChange={(e) => {
						setCommentText(e.nativeEvent.text);
					}}
					placeholderTextColor={"white"}
				/>
				<Pressable
					android_ripple={{
						color: commentText.length === 0 ? "gray" : PRIMARY,
						radius: 20,
					}}
					style={{
						height: 60,
						justifyContent: "center",
						alignItems: "center",
						paddingHorizontal: 12,
					}}
					onPressIn={publishComment}
				>
					<Icon name="send" color={commentText.length === 0 ? "gray" : PRIMARY} size={24} />
				</Pressable>
			</View>
		</View>
	);
};

export default React.memo(CommentInput);
