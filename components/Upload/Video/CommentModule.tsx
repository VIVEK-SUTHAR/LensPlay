import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useEffect } from "react";
import { FlatList, Pressable, View } from "react-native";
import { black, dark_primary } from "constants/Colors";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";

type CommentModuleSheetProps = {
	referenceModuleRef: React.RefObject<BottomSheetMethods>;
	ReferenceModuleList: ReferenceModuleListItem[];
	setActiveModule: (referenceModule: ReferenceModuleListItem) => void;
	activeModule: ReferenceModuleListItem;
};

export type ReferenceModuleListItem = {
	name: string;
	isSelected: boolean;
};

export default function CommentModule({
	sheetRef,
	activeModule,
}: {
	sheetRef: React.RefObject<BottomSheetMethods>;
	activeModule: string;
}) {
	return (
		<Pressable
			style={{
				paddingHorizontal: 16,
				paddingVertical: 16,
				marginHorizontal: 8,
				borderRadius: 8,
				backgroundColor: dark_primary,
				marginVertical: 8,
			}}
			onPress={(e) => {
				sheetRef?.current?.snapToIndex(0);
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<StyledText
					title={"Who can comment"}
					style={{
						color: "white",
						fontSize: 16,
						fontWeight: "500",
						maxWidth: "75%",
					}}
				/>
				<StyledText
					title={activeModule}
					style={{
						color: "gray",
						fontSize: 12,
						fontWeight: "500",
						marginHorizontal: 2,
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<StyledText
					title={"By default, everyone can comment on your video"}
					style={{
						color: "gray",
						fontSize: 12,
						fontWeight: "500",
						maxWidth: "65%",
					}}
				/>
				<Icon name="arrowForward" size={16} />
			</View>
		</Pressable>
	);
}
function CommentModuleSheet({
	ReferenceModuleList,
	activeModule,
	referenceModuleRef,
	setActiveModule,
}: CommentModuleSheetProps) {
	const theme = useThemeStore();
	const uploadStore = useUploadStore();
	useEffect(() => {
		if (activeModule.name === ReferenceModuleList[0].name) {
			uploadStore.setReferenceModule(null);
		}
		if (activeModule.name === ReferenceModuleList[1].name) {
			uploadStore.setReferenceModule({
				isFollowerOnly: true,
				degreesOfSeparationReferenceModule: {
					isEnabled: false,
					seperationLevel: 1,
				},
			});
		}
		if (activeModule.name === ReferenceModuleList[2].name) {
			uploadStore.setReferenceModule({
				isFollowerOnly: false,
				degreesOfSeparationReferenceModule: {
					isEnabled: true,
					seperationLevel: 1,
				},
			});
		}
		if (activeModule.name === ReferenceModuleList[3].name) {
			uploadStore.setReferenceModule({
				isFollowerOnly: false,
				degreesOfSeparationReferenceModule: {
					isEnabled: true,
					seperationLevel: 2,
				},
			});
		}
	}, [activeModule]);
	return (
		<Sheet
			ref={referenceModuleRef}
			snapPoints={[390]}
			style={{
				height: "auto",
			}}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<View style={{ padding: 16 }}>
				<StyledText
					title={"Select who can comment"}
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginVertical: 8,
					}}
				/>
				<FlatList
					data={ReferenceModuleList}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								onPress={() => {
									setActiveModule(ReferenceModuleList[index]);
									referenceModuleRef.current?.close();
								}}
							>
								<StyledText
									title={item.name}
									style={{
										color: "rgba(255,255,255,0.8)",
										fontSize: 18,
										fontWeight: "400",
										marginVertical: 16,
									}}
								/>
								{activeModule.name === item.name ? (
									<View
										style={{
											height: "auto",
											width: "auto",
											backgroundColor: activeModule.name === item.name ? theme.PRIMARY : "black",
											borderRadius: 50,
											padding: 4,
											marginVertical: 16,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Icon
											name={"done"}
											color={activeModule.name === item.name ? "black" : "white"}
											size={18}
										/>
									</View>
								) : (
									<></>
								)}
							</Pressable>
						);
					}}
				/>
			</View>
		</Sheet>
	);
}
export { CommentModuleSheet };
