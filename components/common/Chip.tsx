import StyledText from "components/UI/StyledText";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useActiveVideoFilters, useThemeStore } from "store/Store";

type Props = {
	title: string;
	isActive?: boolean;
	onPress?: () => void;
};

function Chip({ title, isActive }: Props) {
	const theme = useThemeStore();
	return (
		<View
			style={[
				styles.chipContainer,
				{ backgroundColor: `${isActive ? theme.PRIMARY : theme.DARK_PRIMARY}` },
			]}
		>
			<StyledText
				title={title.replace(/_/g, " ")}
				style={{
					fontSize: 12,
					fontWeight: "600",
					color: `${isActive ? "black" : "white"}`,
				}}
			/>
		</View>
	);
}

export default Chip;

const styles = StyleSheet.create({
	chipContainer: {
		width: "auto",
		height: 34,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginHorizontal: 4,
	},
});
