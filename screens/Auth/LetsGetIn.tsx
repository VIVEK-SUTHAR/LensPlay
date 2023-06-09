import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Dimensions, Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import StyledText from "components/UI/StyledText";
import { LENSPLAY_SITE } from "constants/index";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import Button from "components/UI/Button";
import { Image } from "expo-image";

const LetsGetIn = ({ navigation }: RootStackScreenProps<"LetsGetIn">) => {
	const loginRef = React.useRef<BottomSheetMethods>(null);
	const [isloading, setIsloading] = React.useState<boolean>(false);
	const width = Dimensions.get("window").width;

    const NavigateToConnectWallet = () => {
        navigation.navigate('ConnectWallet');
    }

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<LinearGradient colors={["#2D3436", "#000000", "#000000"]} style={{ flex: 1, justifyContent: "space-between" }}>
				<View
					style={{
						width: width,
						height: "65%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../../assets/images/3D-1.webp")}
						style={{ width: "70%", height: "70%" }}
						contentFit="contain"
					/>
				</View>
				<View
					style={{
						width: width,
						paddingHorizontal: 16,
						justifyContent: "flex-end",
					}}
				>
					<StyledText
						title={"Share, Earn & Shine on LensPlay"}
						style={{
							color: "white",
							fontSize: 32,
							fontWeight: "600",
						}}
					/>
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
