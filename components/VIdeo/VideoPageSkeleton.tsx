import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import Button from "components/UI/Button";

type Props = {};

const VideoPageSkeleton = (props: Props) => {
	const width = Dimensions.get("screen").width;
	return (
		<SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
			<StatusBar backgroundColor={"#111111"} barStyle={"light-content"} />
			<View
				style={{
					backgroundColor: "#111111",
					width: Dimensions.get("screen").width,
					height: 280,
					justifyContent: "center",
					alignItems: "center",
				}}
			/>

			<View style={{justifyContent:"center",paddingHorizontal:12,paddingVertical:8}} >
				<View
					style={{ width: width * 0.9, height: 12, marginVertical: 2, backgroundColor: "#1d1d1d" }}
				/>
				<View
					style={{ width: width * 0.8, height: 12, marginVertical: 2, backgroundColor: "#1d1d1d" }}
				/>
			</View>

			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "#1d1d1d" }} />
					<View style={styles.textContainer}>
						<View
							style={{
								width: Dimensions.get("screen").width * 0.3,
								height: 12,
								backgroundColor: "#1d1d1d",
								marginVertical: 2,
							}}
						/>
						<View
							style={{
								width: Dimensions.get("screen").width * 0.2,
								height: 12,
								backgroundColor: "#1d1d1d",
								marginVertical: 2,
							}}
						/>
					</View>
				</View>

				<Button
					title={"Suscribe"}
					width={"auto"}
					px={24}
					py={8}
					type={"filled"}
					bg={"#1d1d1d"}
					textStyle={styles.buttonText}
				/>
			</View>
		</SafeAreaView>
	);
};

export default VideoPageSkeleton;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 4,
		justifyContent: "space-between",
		marginTop: 12,
		textAlign: "center",
		paddingHorizontal: 12,
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		marginHorizontal: 8,
		maxWidth: 185,
	},
	heading: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
	},
	subtext: {
		color: "gray",
		fontSize: 12,
		fontWeight: "500",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#1d1d1d",
	},
});
