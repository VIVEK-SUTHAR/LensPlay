import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import WatchLaterList from "components/WatchLater/WatchLaterList";
import { white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { useProfile } from "store/Store";
import formatHandle from "utils/formatHandle";
import Logger from "utils/logger";
import addToWatchLater from "utils/watchlater/addToWatchLater";
import getWatchLaters from "utils/watchlater/getWatchLaters";

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { currentProfile } = useProfile();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
			<LinearGradient
				style={{
					alignItems: "center",
					padding: 16,
				}}
				colors={["#2d201a", "black"]}
			>
				<Image
					source={{
						uri: "https://cdn.hashnode.com/res/hashnode/image/upload/v1683447015650/23f2a101-69a3-437f-a26b-0498f35e783b.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
					}}
					style={{
						height: 200,
						width: "100%",
						borderRadius: 8,
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
		</SafeAreaView>
	);
};

export default WatchLater;
