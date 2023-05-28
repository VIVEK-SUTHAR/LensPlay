import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { SETTINGS } from "constants/tracking";
import { Scalars, useHidePublicationMutation } from "customTypes/generated";
import React from "react";
import { View } from "react-native";
import { useAuthStore, useToast } from "store/Store";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

export type DeleteVideoProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
	pubId: Scalars["InternalPublicationId"];
};

export default function DeleteVideo({ sheetRef, pubId }: DeleteVideoProps) {
	const toast = useToast();
	const { accessToken } = useAuthStore();

	const [deleteVideo, { data, error, loading }] = useHidePublicationMutation({
		onCompleted: (data) => {
			toast.success("video deleted successfully");
			void TrackAction(SETTINGS.PROFILE.UPDATE_DETAILS);
		},
		onError: () => {
			toast.error("some error occured please try again");
			Logger.Error("Failed to Delete Video", error);
		},
	});

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[390]}
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
						onPress={() => {
							sheetRef.current?.close();
						}}
						title="Cancel"
						bg={"rgba(255,255,255,0.1)"}
						textStyle={{
							fontWeight: "600",
							fontSize: 16,
							color: "white",
						}}
						py={12}
						borderRadius={8}
					/>
					<Button
						onPress={() => {
							deleteVideo({
								variables: {
									request: {
										publicationId: pubId,
									},
								},
								context: {
									headers: {
										"x-access-token": `Bearer ${accessToken}`,
									},
								},
							});
						}}
						mt={16}
						title="Delete"
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
