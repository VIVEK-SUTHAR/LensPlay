import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Heading from "./Heading";
import { useThemeStore } from "store/Store";
import StyledText from "./StyledText";

const LensPlayBadge = () => {
	const theme = useThemeStore();
	return (
		<View style={styles.headerContainer}>
			<Heading title="LensPlay" style={{ fontSize: 24, fontWeight: "700", color: "white" }} />
			<View style={[styles.betaBadgeContainer, { backgroundColor: theme.PRIMARY }]}>
				<StyledText title="Beta" style={{ color: "black", fontSize: 8, fontWeight: "600" }} />
			</View>
		</View>
	);
};

export default React.memo(LensPlayBadge);

const styles = StyleSheet.create({
	headerContainer: {
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	betaBadgeContainer: {
		marginHorizontal: 4,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 8,
	},
});
