import { StyleSheet, Text, View } from "react-native";
import React from "react";

type AddWatchLaterButtonProps = {
	publicationId: string;
};

const AddWatchLaterButton: React.FC<AddWatchLaterButtonProps> = ({ publicationId }) => {
	return (
		<View>
			<Text>AddWatchLaterButton</Text>
		</View>
	);
};

export default AddWatchLaterButton;

const styles = StyleSheet.create({});
