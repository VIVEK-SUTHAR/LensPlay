import { useFocusEffect } from "@react-navigation/native";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import WatchLaterList from "components/WatchLater/WatchLaterList";
import ErrorMesasge from "components/common/ErrorMesasge";
import { white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import formatHandle from "utils/formatHandle";
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
		}
	});
	Logger.Log("Cover nd color", cover, color);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			{allWatchLaters!.length > 0 ? (
				<>
					<LinearGradient
						style={{
							alignItems: "center",
							padding: 8,
						}}
						colors={[color ? color : "#7A52B5", "black"]}
					>
						<Image
							source={{
								uri: cover
									? cover
									: "https://ik.imagekit.io/4uh8nmwsx/fotor-ai-2023060417146.jpg?f-webp",
							}}
							style={{
								height: 200,
								width: "100%",
								borderRadius: 16,
							}}
							contentFit="cover"
						/>
						<View
							style={{
								marginVertical: 24,
								width: "100%",
							}}
						>
							<Heading
								title="Watch Later"
								style={{
									color: white[800],
									fontWeight: "600",
									fontSize: 24,
								}}
							/>
							<StyledText
								title={currentProfile?.name || formatHandle(currentProfile?.handle)}
								style={{
									color: white[200],
									fontWeight: "600",
									fontSize: 16,
									marginTop: 2,
								}}
							/>
						</View>
					</LinearGradient>
					<View
						style={{
							flex: 1,
						}}
					>
						<WatchLaterList />
					</View>
				</>
			) : (
				<ErrorMesasge message="Look's like you dont have any watch laters yet" withImage={false} />
			)}
		</SafeAreaView>
	);
};

export default WatchLater;
