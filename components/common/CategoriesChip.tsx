import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useActiveVideoFilters, useThemeStore } from "store/Store";
import { VIDEO_CATEGORIES } from "constants/Categories";
import { dark_primary } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import { ScrollView } from "react-native-gesture-handler";
import Chip from "./Chip";

type Props = {};

const CategoriesChip = (props: Props) => {
	const { activeFilter, setActiveFilters } = useActiveVideoFilters();
    
	return (
		<>
			<ScrollView
				style={{
					height: 60,
					paddingVertical: 8,
					maxHeight: 60,
					marginLeft: 10,
				}}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{VIDEO_CATEGORIES.map((item, index) => {
					return (
						<Chip key={`${item.tag}-${index}`} title={item.name} value={item.tag}/>
					);
				})}
			</ScrollView>
		</>
	);
};

export default CategoriesChip;

const styles = StyleSheet.create({});
