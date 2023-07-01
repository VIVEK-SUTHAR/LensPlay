import { useFocusEffect } from "@react-navigation/native";
import WatchLaterList from "components/WatchLater/WatchLaterList";
import { RootStackScreenProps } from "customTypes/navigation";
import React from "react";
import { SafeAreaView } from "react-native";
import useWatchLater from "store/WatchLaterStore";

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { color } = useWatchLater();

	useFocusEffect(() => {
		navigation.setOptions({
			headerStyle: { backgroundColor: color ? color : "#7A52B5" },
		});
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<WatchLaterList />
		</SafeAreaView>
	);
};

export default WatchLater;
