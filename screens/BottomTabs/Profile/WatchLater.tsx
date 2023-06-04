import AsyncStorage from "@react-native-async-storage/async-storage";
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

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { currentProfile } = useProfile();
	const [coverData, setCoverData] = React.useState({
		color: "black",
		cover: "",
	});

	async function handleColor() {
		const watchLater = await AsyncStorage.getItem("@watchLater");
		if (watchLater) {
			const colorCode = JSON.parse(watchLater).color;
			const coverURL = JSON.parse(watchLater).cover;

			setCoverData({
				color: colorCode,
				cover: coverURL,
			});
		}
	}

	React.useEffect(() => {
		handleColor();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<LinearGradient
				style={{
					alignItems: "center",
					padding: 16,
				}}
				colors={[coverData.color, "black"]}
			>
				<Image
					source={{
						uri: coverData.cover,
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
