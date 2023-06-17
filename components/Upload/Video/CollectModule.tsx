import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { black, dark_primary, dark_secondary, primary } from "constants/Colors";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useUploadStore } from "store/UploadStore";
import Logger from "utils/logger";
import FollowerOnlyCollect from "./CollectModules/FollowerOnlyCollect";
import { useNavigation } from "@react-navigation/native";

type CollectModuleSheetProp = {
	collectModuleRef: React.RefObject<BottomSheetMethods>;
};

export type CollectToggleType = {
	title: string,
	subTitle: String,
	switchValue: boolean,
	onPress:()=>void
}

export default function CollectModule({ collectModuleRef }: CollectModuleSheetProp) {
	const navigation = useNavigation();
	return (
		<Pressable
			style={{
				paddingHorizontal: 16,
				paddingVertical: 16,
				marginHorizontal: 8,
				borderRadius: 8,
				backgroundColor: dark_primary,
				marginTop: 16,
				marginBottom: 8,
			}}
			onPress={(e) => {
				navigation.navigate("SelectCollectModule");
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
					title={"Who can collect"}
					style={{
						color: "white",
						fontSize: 16,
						fontWeight: "500",
						maxWidth: "75%",
					}}
				/>
				<StyledText
					title={"Free"}
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
					title={"By default, no one can collect this video"}
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

function _collectToggle({ title, subTitle, switchValue, onPress }: CollectToggleType){
	return (
		<View style={styles.itemContainer}>
							<View
								style={{
									width: "83%",
								}}
							>
								<StyledText title={title} style={styles.itemText} />
								<StyledText
									title={subTitle}
									style={{
										color: "gray",
										fontSize: 14,
										fontWeight: "500",
									}}
								/>
							</View>
							<Switch
								value={switchValue}
								handleOnPress={onPress}
								activeTrackColor={primary}
								inActiveTrackColor="rgba(255,255,255,0.2)"
								thumbColor="white"
							/>
						</View>
	);
}

function _CollectModuleSheet({ collectModuleRef }: CollectModuleSheetProp) {
	const [isCollectEnabled, setIsCollectEnabled] = useState<boolean>(false);
	const uploadStore = useUploadStore();

	const closeSheet = useCallback(() => {
		collectModuleRef?.current?.close();
	}, []);

	React.useEffect(() => {
		if (isCollectEnabled) {
			Logger.Success("Enabled");
			uploadStore.setCollectModule({
				type: "freeCollectModule",
				isFreeCollect: true,
				followerOnlyCollect: false,
				isFreeTimedCollect: false,
				isRevertCollect: false,
			});
		} else {
			uploadStore.setCollectModule({
				type: "revertCollectModule",
				isRevertCollect: true,
			});
		}
	}, [isCollectEnabled]);

	return (
		<Sheet
			ref={collectModuleRef}
			snapPoints={[680]}
			containerStyle={{
				height: "auto",
			}}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<ScrollView
				contentContainerStyle={{
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<View style={{ padding: 16 }}>
					<Heading
						title={"Collect Settings"}
						style={{
							color: "white",
							fontSize: 20,
							marginHorizontal: 8,
							marginBottom: 16,
							fontWeight: "600",
						}}
					/>
					<View
						style={{
							backgroundColor: dark_secondary,
							marginVertical: 8,
							borderRadius: 8,
							paddingHorizontal: 12,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "flex-start",
								marginVertical: 16,
							}}
						>
							<View
								style={{
									maxWidth: "80%",
								}}
							>
								<StyledText
									title={"Make this Video collectible"}
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "500",
									}}
								/>
								<StyledText
									title={"By enabling this, your video will be collectible by others as NFT"}
									style={{
										color: "gray",
										fontSize: 14,
										fontWeight: "500",
									}}
								/>
							</View>
							<Switch
								value={isCollectEnabled}
								handleOnPress={() => {
									setIsCollectEnabled((prev) => !prev);
								}}
								activeTrackColor={primary}
								inActiveTrackColor="rgba(255,255,255,0.2)"
								thumbColor="white"
							/>
						</View>
					</View>
					{isCollectEnabled && <FollowerOnlyCollect />}
				</View>
				<View
					style={{
						width: "100%",
						padding: 16,
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<Button
						title={"Save"}
						width={"30%"}
						bg={"white"}
						borderRadius={8}
						textStyle={{
							textAlign: "center",
							fontWeight: "600",
						}}
						onPress={closeSheet}
					/>
				</View>
			</ScrollView>
		</Sheet>
	);
}
const CollectModuleSheet=React.memo(_CollectModuleSheet);
const CollectToggle = React.memo(_collectToggle);
export { CollectModuleSheet, CollectToggle };


const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
		borderRadius: 12,
		backgroundColor: dark_primary,
		paddingVertical: 18,
		marginVertical: 8,
	},
	itemText: {
		color: "white",
		fontSize: 16,
	},
})