import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { SETTINGS } from "constants/tracking";
import { Mirror, Post, Scalars, useHidePublicationMutation } from "customTypes/generated";
import React from "react";
import { View } from "react-native";
import { useAuthStore, useToast } from "store/Store";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

export type DeleteVideoProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
	publication: Post | Mirror | null;
};

export default function DeleteVideo({ sheetRef, publication }: DeleteVideoProps) {
	const toast = useToast();
	const { accessToken } = useAuthStore();

	const [deleteVideo, { data, error, loading }] = useHidePublicationMutation({
		onCompleted: (data) => {
			toast.success("video deleted successfully");
			sheetRef?.current?.close();
			void TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
		},
		onError: () => {
			toast.error("some error occured please try again");
			Logger.Error("Failed to Delete Video", error);
		},
	});
	function deleteInLens() {
		deleteVideo({
			variables: {
				request: {
					publicationId: publication?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	}

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[240]}
			enablePanDownToClose={true}
			enableOverDrag={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			bottomInset={32}
			style={{
				marginHorizontal: 8,
			}}
			detached={true}
		>
			<View
				style={{
					justifyContent: "space-between",
					padding: 16,
					height: "100%",
				}}
			>
				<View>
					<Heading
						title="Are you sure you want to delete this video?"
						style={{
							color: "white",
							fontSize: 20,
							marginVertical: 4,
							textAlign: "left",
							fontWeight: "600",
						}}
					/>
					<StyledText
						title="By doing this, you are not able to get this video back."
						style={{
							color: "gray",
							fontSize: 14,
							marginVertical: 4,
							fontWeight: "500",
						}}
					/>
				</View>
				<View>
					<Button
						onPress={deleteInLens}
						mt={16}
						title="Confirm"
						bg={"#f5f5f5"}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							color: "black",
						}}
						py={12}
						borderRadius={8}
					/>
				</View>
			</View>
		</Sheet>
	);
}
