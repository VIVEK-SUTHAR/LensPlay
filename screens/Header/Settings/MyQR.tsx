import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { useProfile } from "store/Store";
import QRCodeStyled from "react-native-qrcode-styled";
import formatHandle from "utils/formatHandle";
import { HandleInfo } from "customTypes/generated";
import { black } from "constants/Colors";
import Tabs, { Tab } from "components/UI/Tabs";
import ProfileScanner from "./ProfileScanner";

const MyQrTabs = () => {
	return (
		<Tabs>
			<Tab.Screen
				name="MyQRCode"
				component={MyQR}
				options={{
					title: "Your QR",
				}}
			/>
			<Tab.Screen name="Scan QR" component={ProfileScanner} />
		</Tabs>
	);
};

const MyQR = () => {
	const { width, height } = useWindowDimensions();
	const { currentProfile } = useProfile();

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					paddingHorizontal: 8,
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}
			>
				<QRCodeStyled
					data={formatHandle(currentProfile?.handle as HandleInfo)}
					style={{
						backgroundColor: "transparent",
					}}
					pieceSize={(height / width) * 6}
					color={"white"}
					gradient={{
						options: {
							colors: ["white"],
						},
					}}
					outerEyesOptions={{
						borderRadius: 24,
					}}
					innerEyesOptions={{
						borderRadius: 8,
					}}
					pieceBorderRadius={6}
					logo={{
						href: require("../../../assets/images/icon.png"),
						padding: 0,
						scale: 1,
						hidePieces: true,
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default MyQrTabs;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: black[800],
	},
});
