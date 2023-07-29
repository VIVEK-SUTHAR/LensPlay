import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import Lottie from "lottie-react-native";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import Logger from "utils/logger";

const UploadIndicator: React.FC<RootStackScreenProps<"UploadIndicator">> = ({ navigation }) => {
	const { uploadingStatus, setUploadingStatus, setClearStore } = useUploadStore();
	const theme = useThemeStore();
	useEffect(() => {
		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			return true;
		});
		return () => {
			handler.remove();
		};
	}, []);
	useEffect(() => {
		if (uploadingStatus === "DONE") {
			setTimeout(() => {
				navigation.reset({ index: 0, routes: [{ name: "Root" }], key: undefined });
				setClearStore();
				setUploadingStatus(null);
			}, 5000);
			Logger.Success("Upload ho gaya nikal idherse");
		}
	}, [uploadingStatus]);

	return (
		<View style={styles.container}>
			<View style={{ padding: 60 }}>
				<Lottie source={require("../../../assets/upload.json")} style={{width: "100%"}} autoPlay loop />
			</View>
			{uploadingStatus === "UPLOADINGCOVER" ? (
				<>
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Uploading Cover"}
							style={{
								color: white[700],
								fontSize: 24,
								fontWeight: "600",
							}}
						/>
					</View>
				</>
			) : null}
			{uploadingStatus === "UPLOADINGVIDEO" ? (
				<>
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Uploading Video"}
							style={{
								color: white[700],
								fontSize: 24,
								fontWeight: "600",
							}}
						/>
					</View>
				</>
			) : null}
			{uploadingStatus === "DONE" ? (
				<>
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Video Uploaded"}
							style={{
								color: white[700],
								fontSize: 24,
								fontWeight: "600",
							}}
						/>
					</View>
				</>
			) : null}
		</View>
	);
};

export default UploadIndicator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: black[800],
	},
});
