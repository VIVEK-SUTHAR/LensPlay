import { useFocusEffect } from "@react-navigation/native";
import WatchLaterHeader from "components/WatchLater/WatchLaterHeader";
import WatchLaterList from "components/WatchLater/WatchLaterList";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import useWatchLater from "store/WatchLaterStore";

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { color } = useWatchLater();
	const scrollY = useSharedValue<number>(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			"worklet";
			scrollY.value = event.contentOffset.y;
		},
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar backgroundColor={color ?? "transparent"} style="auto"/>
			<WatchLaterHeader
				playlistTitle={"Watch Later"}
				scrollY={scrollY}
			/>
			<WatchLaterList scrollHandler={scrollHandler} />
		</SafeAreaView>
	);
};

export default WatchLater;
