import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import ConnectWalletSheet from "components/Login/ConnectWalletSheet";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Explore from "assets/Icons/Explore";

const ConnectWallet = ({ navigation }: RootStackScreenProps<"ConnectWallet">) => {
	const loginRef = React.useRef<BottomSheetMethods>(null);
	const [isloading, setIsloading] = React.useState<boolean>(false);
	const width = Dimensions.get("window").width;

	const openSheet = React.useCallback(() => {
		loginRef?.current?.snapToIndex(0);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="transparent" style="light" />
			<View
				style={{
					width: width,
					paddingHorizontal: 16,
					justifyContent: "center",
					alignItems: "center",
					marginVertical: 32,
				}}
			>
				<StyledText
					title={"Connect & explore"}
					style={{
						color: "white",
						fontSize: 32,
						fontWeight: "600",
					}}
				/>
			</View>
			<View
				style={{
					width: width,
					height: "65%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Explore />
			</View>
			<View
				style={{
					paddingHorizontal: 16,
					width: "100%",
				}}
			>
				<Button
					title={"Connect Wallet"}
					width={"100%"}
					isLoading={isloading}
					bg={white[400]}
					textStyle={{
						fontWeight: "600",
						fontSize: 20,
						color: black[400],
					}}
					py={16}
					onPress={openSheet}
				/>
			</View>
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
		backgroundColor: "#161616",
		justifyContent: "space-around",
	},
});
