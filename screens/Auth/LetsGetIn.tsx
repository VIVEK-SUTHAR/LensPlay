import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Animated, Dimensions, FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import StyledText from "components/UI/StyledText";
import { LENSPLAY_SITE } from "constants/index";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import Button from "components/UI/Button";
import { Image } from "expo-image";
import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import Paginator from "components/Login/Paginator";
import NewPaginator from "./NewPaginator";

const LetsGetIn = ({ navigation }: RootStackScreenProps<"LetsGetIn">) => {
	const loginRef = React.useRef<BottomSheetMethods>(null);
	const [isloading, setIsloading] = React.useState<boolean>(false);
	const width = Dimensions.get("window").width;

	const NavigateToConnectWallet = () => {
		navigation.navigate("ConnectWallet");
	};

	const data = [
		// "https://images.pexels.com/photos/14579361/pexels-photo-14579361.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
		require("../../assets/images/light.png"),
		require("../../assets/images/light.png"),
		require("../../assets/images/light.png"),
	];
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const slidesRef = React.useRef(null);
	// const viewableItemsChanged = React.useRef(({ viewableItems }) => {
	// 	setCurrentIndex(viewableItems[0].index);
	// }).current;
	const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<LinearGradient
				colors={["#1d1d1d", "#000000"]}
				style={{ flex: 1, justifyContent: "space-between" }}
				locations={[0.3, 0.7]}
			>
				<View style={{ position: "relative" }}>
					<View
						style={{
							width: WINDOW_WIDTH,
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							paddingTop: "10%",
						}}
					>
						<Image
							source={require("../../assets/images/light.png")}
							style={{ width: WINDOW_WIDTH * 0.7, height: WINDOW_WIDTH * 1.4 }}
							contentFit="contain"
						/>
						<Image
							source={require("../../assets/images/video2.svg")}
							style={{
								position: "absolute",
								resizeMode: "contain",
								height: "65%",
								width: "50%",
								left: "-5%",
								top: "10%",
								// zIndex:3
							}}
						/>
						<Image
							source={require("../../assets/images/upload.png")}
							style={{
								position: "absolute",
								resizeMode: "contain",
								height: "45%",
								width: "45%",
								left: "32%",
								top: "22%",
							}}
						/>
						<Image
							source={require("../../assets/images/hashtag.svg")}
							style={{
								position: "absolute",
								resizeMode: "contain",
								height: "65%",
								width: "65%",
								right: "0%",
								bottom: "0%",
								zIndex:2
							}}
						/>
						<Image
							source={require("../../assets/images/upload.png")}
							style={{
								position: "absolute",
								resizeMode: "contain",
								height: "45%",
								width: "45%",
								right: "32%",
								// top: "22%",
								bottom:30
							}}
						/>
					</View>
					<View
						style={{
							// width:"35%",
							// height: "35%",
							justifyContent: "center",
							alignItems: "center",
							// zIndex: 2,
						}}
					>
						<Animated.FlatList
							data={data}
							keyExtractor={(index) => index.toString()}
							horizontal
							pagingEnabled
							bounces={false}
							renderItem={({ item }) => {
								return (
									<View>
										<View
											style={{
												width: width,
												paddingHorizontal: 16,
												justifyContent: "center",
											}}
										>
											<StyledText
												title={"Create"}
												style={{
													color: "white",
													fontSize: 36,
													fontWeight: "600",
													textAlign: "center",
												}}
											/>
										</View>
										<View style={{ justifyContent: "center", alignItems: "center", marginTop: 24 }}>
											<NewPaginator data={data} scrollX={scrollX} />
										</View>
									</View>
								);
							}}
							onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
								useNativeDriver: false,
							})}
							// onViewableItemsChanged={viewableItemsChanged}
							viewabilityConfig={viewConfig}
							ref={slidesRef}
							scrollEventThrottle={32}
						/>
						{/* <Image
						source={require("../../assets/images/3D-1.webp")}
						style={{ width: "70%", height: "70%" }}
						contentFit="contain"
					/> */}
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 16,
						width: "100%",
					}}
				>
					<Button
						title={"Get Started"}
						width={"100%"}
						isLoading={isloading}
						bg={white[600]}
						textStyle={{
							fontWeight: "600",
							fontSize: 20,
							color: black[800],
						}}
						py={12}
						onPress={NavigateToConnectWallet}
					/>
					<StyledText
						title={
							<>
								<StyledText
									title={"By clicking on get started you agree to our"}
									style={{ color: "gray", fontSize: 12 }}
								/>{" "}
								<StyledText
									style={{
										textDecorationLine: "underline",
										color: "white",
										fontSize: 12,
									}}
									title={"Privacy Policy"}
									onPress={() => {
										Linking.openURL(LENSPLAY_SITE);
									}}
								/>{" "}
								<StyledText title={"and "} style={{ color: "gray" }} />
								<StyledText
									style={{
										textDecorationLine: "underline",
										color: "white",
										fontSize: 12,
									}}
									title={"Terms and Condition"}
									onPress={() => {
										Linking.openURL(LENSPLAY_SITE);
									}}
								/>{" "}
							</>
						}
						style={{ marginVertical: 16 }}
					/>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default LetsGetIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2D3436",
		justifyContent: "space-around",
	},
	box1: {
		width: 196,
		height: 196,
		backgroundColor: "#56CBF9",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	box2: {
		width: 96,
		height: 96,
		backgroundColor: "#EBDD4E",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 4,
	},
	box3: {
		width: 96,
		height: 96,
		backgroundColor: "#9EF01A",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 4,
	},
});
