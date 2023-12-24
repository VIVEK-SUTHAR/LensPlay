import { VIDEO_CATEGORIES } from "constants/Categories";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Chip from "./Chip";
import { useActiveVideoFilters } from "store/Store";
import { black } from "constants/Colors";

const ITEM_HEIGHT = 34; //😜
const getItemLayout = (_: any, index: number) => {
	return {
		length: ITEM_HEIGHT,
		offset: ITEM_HEIGHT * index,
		index,
	};
};

const CategoriesChip = () => {
	const { activeFilter, setActiveFilters } = useActiveVideoFilters();

	const renderItem = ({ item, index }: { item: { name: string; tag: string }; index: number }) => {
		const updateCategory = () => {
			if (activeFilter === item.tag) setActiveFilters("all");
			else {
				setActiveFilters(item.tag);
			}
		};

		return (
			<TouchableOpacity onPress={updateCategory}>
				<Chip key={`${item.tag}-${index}`} title={item.name} isActive={activeFilter === item.tag} />
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.categoriesListContainer}>
			<FlatList
				data={VIDEO_CATEGORIES}
				horizontal={true}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				removeClippedSubviews={true}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => `${item.tag}-${index}`}
			/>
		</View>
	);
};

export default React.memo(CategoriesChip);

const styles = StyleSheet.create({
	categoriesListContainer: {
		backgroundColor: black[800],
		paddingVertical: 8,
	},
});
