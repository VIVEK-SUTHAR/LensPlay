import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { dark_primary, primary } from "constants/Colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUploadStore } from "store/UploadStore";
import ArrowForward from "assets/Icons/ArrowForward";

type CollectModuleSheetProp = {
	collectModuleRef: React.RefObject<BottomSheetMethods>;
};

export type CollectToggleType = {
	title: string;
	subTitle: String;
	switchValue: boolean;
	onPress: () => void;
};

export default function CollectModule({ collectModuleRef }: CollectModuleSheetProp) {
	const navigation = useNavigation();
	const { collectModule } = useUploadStore();
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
					title={collectModule?.isPaidCollect ? "Paid" : "Free"}
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
				<ArrowForward height={16} width={16} />
			</View>
		</Pressable>
	);
}

function _collectToggle({ title, subTitle, switchValue, onPress }: CollectToggleType) {
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

const CollectToggle = React.memo(_collectToggle);
export { CollectToggle };

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
});
