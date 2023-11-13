import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import { STATIC_ASSET } from "constants/index";

type Props = {
	avatarUrls: Array<string>;
};

const AvatarGroup = (props: Props) => {
	return (
		<View style={styles.row}>
			{props.avatarUrls.map((item, index) => {
				if (index == 0) return <Avatar src={item} height={36} width={36} />;
				if (index == 5) return;
				return <Avatar src={item} height={36} width={36} mx={-4} />;
			})}
		</View>
	);
};

export default AvatarGroup;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
	},
});
