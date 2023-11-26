import StyledText from "components/UI/StyledText";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useActiveVideoFilters, useThemeStore } from "store/Store";

type Props = {
	title: string;
	value: string;
	isActive?: boolean;
	onPress?: () => void;
};

function Chip({ title, value }: Props) {
	const theme = useThemeStore();
	const { activeFilter, setActiveFilters } = useActiveVideoFilters();
	const updateCategory = () => {
		if (activeFilter === value) setActiveFilters("all");
		else {
			setActiveFilters(value);
		}
	};
	return (
		<TouchableOpacity
			style={[
				styles.chipContainer,
				{ backgroundColor: `${activeFilter === value ? theme.PRIMARY : theme.DARK_PRIMARY}` },
			]}
			onPress={updateCategory}
		>
			<StyledText
				title={title.replace(/_/g, " ")}
				style={{
					fontSize: 12,
					fontWeight: "600",
					color: `${activeFilter === title ? "black" : "white"}`,
				}}
			/>
		</TouchableOpacity>
	);
}

export default Chip;

const styles = StyleSheet.create({
	chipContainer: {
		width: "auto",
		maxHeight: 34,
		paddingHorizontal: 12,
		paddingVertical: 6,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginHorizontal: 4,
	},
});
