import {
	Dimensions,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import React from "react";
import Heading from "components/UI/Heading";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = {};

const ShotSkeleton = (props: Props) => {
	const { height, width } = useWindowDimensions();
	const bottomTabBarHeight = useBottomTabBarHeight();
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#111111", justifyContent: "space-between" }}>
			<StatusBar backgroundColor={"#111111"} barStyle={"light-content"} />
			<Heading
				title={"Shots"}
				style={{
					fontSize: 32,
					color: "#fff",
					fontWeight: "600",
					marginTop: "10%",
					marginLeft: 8,
				}}
			/>
			<View
				style={{
					width: width,
					height: height - bottomTabBarHeight,
					position: "relative",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						position: "absolute",
						width: Dimensions.get("window").width,
						zIndex: 0,
						bottom: 10,
						paddingHorizontal: 8,
					}}
				>
					<View
						style={{
							backgroundColor: "#1d1d1d",
							marginBottom: 8,
							height: 12,
							width: width * 0.4,
						}}
					/>
					<View
						style={{
							backgroundColor: "#1d1d1d",
							marginBottom: 8,
							height: 12,
							width: width * 0.3,
						}}
					/>
					<View
						style={{ flexDirection: "row", alignItems: "center", marginBottom: bottomTabBarHeight-8 }}
					>
						<View
							style={{
								backgroundColor: "#1d1d1d",
								height: 44,
								width: 44,
								borderRadius: 50,
							}}
						/>
						<View
							style={{
								marginLeft: 8,
								height: 12,
								width: width * 0.4,
								backgroundColor: "#1d1d1d",
							}}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ShotSkeleton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#111111",
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
});
