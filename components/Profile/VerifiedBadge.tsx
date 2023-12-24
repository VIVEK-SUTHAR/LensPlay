import Icon from "components/Icon";
import { mainnetVerified } from "constants/Varified";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "store/Store";

type VerifiedBadgeProps = {
	profileId: string;
};

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ profileId }) => {
	const theme = useThemeStore();
	return mainnetVerified.includes(profileId) ? (
		<View style={styles.verifiedContainer}>
			<Icon name="verified" size={18} color={theme.PRIMARY} />
		</View>
	) : null;
};

export default memo(VerifiedBadge);

const styles = StyleSheet.create({
	verifiedContainer: {
		backgroundColor: "transparent",
		height: "auto",
		width: "auto",
		padding: 1,
		borderRadius: 8,
		marginTop: 8,
		marginHorizontal: 4,
	},
});
