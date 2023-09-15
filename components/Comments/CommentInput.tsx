import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Send from "assets/Icons/Send";
import Avatar from "components/UI/Avatar";
import { black } from "constants/Colors";
import { LENSPLAY_SITE } from "constants/index";
import {
	useCreateCommentViaDispatcherMutation,
	useCreateDataAvailabilityCommentViaDispatcherMutation,
} from "customTypes/generated";
import { ToastType } from "customTypes/Store";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
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

	const [createComment] = useCreateCommentViaDispatcherMutation({
		onCompleted: (data) => {
			Logger.Success("Done", data);
		},
		onError: (errr) => {
			Logger.Error("Error in commentiing", errr);
			toast.error("Something went wrong");
		},
	});

	const [createDataAvaibalityComment] = useCreateDataAvailabilityCommentViaDispatcherMutation({
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

		const isDAPublication = activePublication?.isDataAvailability;

		if (isDAPublication) {
			toast.success("Comment submitted!");
			setCommentText("");
			setIsFocused(false);
			const contenturi = await uploadMetaDataToArweave(commentText, currentProfile?.handle);
			createDataAvaibalityComment({
				variables: {
					request: {
						commentOn: publicationId,
						contentURI: contenturi,
						from: currentProfile?.id,
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
			const contenturi = await uploadMetaDataToArweave(commentText, currentProfile?.handle);
			await createComment({
				variables: {
					request: {
						profileId: currentProfile?.id,
						publicationId: publicationId,
						contentURI: contenturi,
						collectModule: {
							revertCollectModule: true,
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
					<Avatar src={getIPFSLink(getRawurl(currentProfile?.picture))} height={28} width={28} />
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
					<Send color={commentText.length === 0 ? "gray" : PRIMARY} height={24} width={24} />
				</Pressable>
			</View>
		</View>
	);
};

export default React.memo(CommentInput);
