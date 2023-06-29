import { useFocusEffect } from "@react-navigation/native";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import WatchLaterList from "components/WatchLater/WatchLaterList";
import ErrorMesasge from "components/common/ErrorMesasge";
import { RootStackScreenProps } from "customTypes/navigation";

import React from "react";
import { SafeAreaView, View } from "react-native";
import { useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import Logger from "utils/logger";

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { currentProfile } = useProfile();
	const { cover, color } = useWatchLater();
	const { allWatchLaters } = useWatchLater();

	useFocusEffect(() => {
		if (allWatchLaters!.length > 0) {
			navigation.setOptions({
				headerStyle: { backgroundColor: color ? color : "#7A52B5" },
			});
		} else {
			navigation.setOptions({
				headerStyle: { backgroundColor: "black" },
			});
		}
	});
	Logger.Log("Cover nd color", cover, color);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			{allWatchLaters!.length > 0 ? (
				<WatchLaterList />
			) : (
				<ErrorMesasge message="Look's like you dont have any watch laters yet" withImage={true} />
			)}
		</SafeAreaView>
	);
};

export default WatchLater;
