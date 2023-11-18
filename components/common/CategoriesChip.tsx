import { VIDEO_CATEGORIES } from "constants/Categories";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Chip from "./Chip";

const ITEM_HEIGHT = 34; //😜
const getItemLayout = (_: any, index: number) => {
	return {
		length: ITEM_HEIGHT,
		offset: ITEM_HEIGHT * index,
		index,
	};
};
const renderItem = ({ item, index }: { item: { name: string; tag: string }; index: number }) => {
	return <Chip key={`${item.tag}-${index}`} title={item.name} value={item.tag} />;
};
const CategoriesChip = () => {
	return (
		<View style={styles.categoriesListContainer}>
			<FlatList
				data={VIDEO_CATEGORIES}
				horizontal={true}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				removeClippedSubviews={true}
				keyExtractor={(item, index) => `${item.tag}-${index}`}
			/>
		</View>
	);
};

export default React.memo(CategoriesChip);

const styles = StyleSheet.create({
	categoriesListContainer: {
		height: 60,
		paddingVertical: 8,
		maxHeight: 60,
		marginLeft: 10,
	},
});
