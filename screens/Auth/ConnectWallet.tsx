import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Dimensions, Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Sheet from "components/Bottom";
import ConnectWalletSheet from "components/Login/ConnectWalletSheet";
import StyledText from "components/UI/StyledText";
import { LENSPLAY_SITE } from "constants/index";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import Button from "components/UI/Button";
import { Image } from "expo-image";

const ConnectWallet = ({ navigation }: RootStackScreenProps<"Login">) => {
	const loginRef = React.useRef<BottomSheetMethods>(null);
	const [isloading, setIsloading] = React.useState<boolean>(false);
	const width = Dimensions.get("window").width;

    const openSheet = React.useCallback(() => {
		loginRef?.current?.snapToIndex(0);
	}, []);``

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<LinearGradient colors={["#2D3436", "#000000", "#000000"]} style={{ flex: 1, justifyContent: "space-around", paddingBottom: 40 }}>
				<View
					style={{
						width: width,
						height: "65%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						source={require("../../assets/images/3D-4.webp")}
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
						title={"Connect & explore LensPlay"}
						style={{
							color: "white",
							fontSize: 32,
							fontWeight: "600",
						}}
					/>
					{/* <StyledText
						title={"Let's Get Started"}
						style={{
							color: "white",
							fontSize: 32,
							fontWeight: "600",
						}}
					/> */}
				</View>
				<View
					style={{
						paddingHorizontal: 16,
                        // paddingBottom: 24,
						width: "100%",
					}}
				>
                    <Button
						title={"Connect Wallet"}
						width={"100%"}
						isLoading={isloading}
						bg={white[600]}
						textStyle={{
							fontWeight: "600",
							fontSize: 20,
							color: black[800],
						}}
						py={12}
						onPress={openSheet}
					/>
				</View>
			</LinearGradient>
            <Sheet
				ref={loginRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				snapPoints={[320]}
			>
				<ConnectWalletSheet loginRef={loginRef} setIsloading={setIsloading} />
			</Sheet>
		</SafeAreaView>
	);
};

export default ConnectWallet;

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
