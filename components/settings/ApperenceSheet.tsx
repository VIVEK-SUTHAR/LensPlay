import { FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Sheet from "components/Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { black } from "constants/Colors";
import Heading from "components/UI/Heading";
import { useThemeStore } from "store/Store";

type Props = {
	apperenceSheetRef: React.RefObject<BottomSheetMethods>;
};

const THEME_ACCENT_COLORS = [
	"#3498db", // Blue
	"#2ecc71", // Emerald
	"#e74c3c", // Alizarin
	"#f39c12", // Orange
	"#9b59b6", // Amethyst
	"#1abc9c", // Turquoise
	"#e67e22", // Carrot
	"#d35400", // Pumpkin
];
const ApperenceSheet = ({ apperenceSheetRef }: Props) => {
	const { setPrimaryColor } = useThemeStore();
	return (
		<Sheet
			ref={apperenceSheetRef}
			index={-1}
			snapPoints={[280]}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<FlatList
				data={THEME_ACCENT_COLORS}
				ListHeaderComponent={() => {
					return (
						<Heading
							title="Select the Accent Color"
							style={{
								color: "white",
								fontSize: 24,
								alignSelf: "flex-start",
								marginVertical: 12,
							}}
						/>
					);
				}}
				numColumns={4}
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
				}}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => setPrimaryColor(item)}
							style={{
								height: 56,
								width: 56,
								backgroundColor: item,
								borderRadius: 500,
								marginHorizontal: 16,
								marginVertical: 16,
							}}
						/>
					);
				}}
			/>
		</Sheet>
	);
};

export default React.memo(ApperenceSheet);
