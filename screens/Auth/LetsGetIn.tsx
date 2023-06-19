import Create from "assets/Icons/Create";
import Earn from "assets/Icons/Earn";
import Shine from "assets/Icons/Shine";
import Paginator from "components/Login/Paginator";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { LENSPLAY_SITE } from "constants/index";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Animated, Linking, StyleSheet, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface LoginSwiper {
	id: number;
	title: string;
	icon: JSX.Element;
}

const LetsGetIn = ({ navigation }: RootStackScreenProps<"LetsGetIn">) => {
	const { width, height } = useWindowDimensions();
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const slidesRef = React.useRef(null);
	const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	const NavigateToConnectWallet = () => {
		navigation.replace("ConnectWallet");
	};

	const data: LoginSwiper[] = [
		{ id: 1, title: "Create", icon: <Create /> },
		{ id: 2, title: "Earn", icon: <Earn /> },
		{ id: 3, title: "Shine", icon: <Shine /> },
	];

	const keyExtractor = (item: LoginSwiper) => item.id.toString();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<View style={{ justifyContent: "center", alignItems: "center", marginVertical: 44 }}>
				<Paginator data={data} scrollX={scrollX} />
			</View>
			<Animated.FlatList
				data={data}
				keyExtractor={keyExtractor}
				horizontal
				pagingEnabled
				bounces={false}
				showsHorizontalScrollIndicator={false}
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
									title={item.title}
									style={{
										color: "white",
										fontSize: 44,
										fontWeight: "600",
										textAlign: "center",
									}}
								/>
							</View>
							<View
								style={{
									width: width,
									height: height * 0.5,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{item.icon}
							</View>
						</View>
					);
				}}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: false,
				})}
				viewabilityConfig={viewConfig}
				ref={slidesRef}
				scrollEventThrottle={32}
			/>

			<View
				style={{
					width: "100%",
					paddingHorizontal: 16,
					alignItems: "center",
				}}
			>
				<Button
					title={"Get Started"}
					bg={white[700]}
					textStyle={{
						fontWeight: "600",
						fontSize: 20,
						color: black[700],
					}}
					py={16}
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
		</SafeAreaView>
	);
};

export default LetsGetIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#161616",
		justifyContent: "space-around",
	},
});
