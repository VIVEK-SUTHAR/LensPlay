import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import Lottie from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";

const UploadIndicator = () => {
	const { uploadingStatus, setUploadingStatus } = useUploadStore();
	const theme = useThemeStore();
	useEffect(() => {
		setUploadingStatus("UPLOADINGCOVER");
		setTimeout(() => {
			setUploadingStatus("UPLOADINGVIDEO");
		}, 5000);
		setTimeout(() => {
			setUploadingStatus("DONE");
		}, 6000);
	}, []);
	return (
		<View style={styles.container}>
			{uploadingStatus === "UPLOADINGCOVER" ? (
				<>
					<Lottie source={require("../../../assets/uploadCover.json")} autoPlay loop />
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Uploading cover"}
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
					<Lottie source={require("../../../assets/uploadVideo.json")} autoPlay loop />
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Uploading video"}
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
					<Lottie source={require("../../../assets/uploadDone.json")} autoPlay loop />
					<View
						style={{
							position: "absolute",
							bottom: 32,
						}}
					>
						<StyledText
							title={"Uploading video"}
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
