import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import StyledText from "../UI/StyledText";

const WatchLater = (): JSX.Element => {
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
				colors={["#446B6C", "#3C6F79", "black"]}
			>
				<Image
					source={{
						uri: "https://ik.imagekit.io/lens/media-snapshot/8c5a4a4144dc2416d181bfb731069c03bc5fa00ffd06d5d6a2ad42aa4d52ede9.png",
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
					title="Vivek Suthar"
					style={{
						color: "white",
						fontWeight: "600",
						alignSelf: "flex-start",
						fontSize: 16,
						marginVertical: 4,
					}}
				/>
			</LinearGradient>
			{/* <MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard />
			<MyVideoCard /> */}
		</ScrollView>
	);
};

export default WatchLater;
