import StyledText from "components/UI/StyledText";
import { VIDEO_CATEGORIES } from "constants/Categories";
import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
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
		setActiveFilters(value);
	};
	return (
		<TouchableOpacity
			style={{
				marginHorizontal: 4,
				backgroundColor: `${activeFilter === value ? theme.PRIMARY : theme.DARK_PRIMARY}`,
				width: "auto",
				maxHeight: 34,
				paddingHorizontal: 12,
				paddingVertical: 6,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 8,
			}}
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
