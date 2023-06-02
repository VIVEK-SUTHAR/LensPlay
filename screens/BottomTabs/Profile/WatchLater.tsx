import MyVideoCard from "components/common/MyVideoCard";
import StyledText from "components/UI/StyledText";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useProfile } from "store/Store";
import formatHandle from "utils/formatHandle";

const WatchLater: React.FC<RootStackScreenProps<"WatchLater">> = ({ navigation }): JSX.Element => {
	const { currentProfile } = useProfile();

	return (
		<ScrollView style={{ flex: 1, backgroundColor: "black" }}>
			<LinearGradient
				style={{
					height: "30%",
					justifyContent: "flex-start",
					alignItems: "center",
					paddingTop: 36,
					paddingHorizontal: 12,
				}}
				colors={["#2d201a", "black"]}
			>
				<Image
					source={{
						uri: "https://cdn.hashnode.com/res/hashnode/image/upload/v1683447015650/23f2a101-69a3-437f-a26b-0498f35e783b.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
					}}
					style={{
						height: "60%",
						width: "100%",
						borderRadius: 8,
						resizeMode: "cover",
					}}
				/>
				<StyledText
					title="Watch Later"
					style={{
						color: "white",
						fontWeight: "600",
						alignSelf: "flex-start",
						fontSize: 20,
						marginVertical: 12,
					}}
				/>
				<StyledText
					title={currentProfile?.name || formatHandle(currentProfile?.handle)}
					style={{
						color: "white",
						fontWeight: "600",
						alignSelf: "flex-start",
						fontSize: 16,
						marginVertical: 4,
					}}
				/>
			</LinearGradient>
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
		</ScrollView>
	);
};

export default WatchLater;
