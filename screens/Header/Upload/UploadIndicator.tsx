import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import ConfettiCannon from "react-native-confetti-cannon";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Lottie from "lottie-react-native";
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
				<Lottie source={require("../../../assets/upload.json")} autoPlay loop />
			) : null}
			{uploadingStatus === "UPLOADINGVIDEO" ? (
				<View style={{ flexDirection: "row", justifyContent: "space-around", width: "90%" }}>
					<ActivityIndicator color={theme.PRIMARY} size="large" />
					<Heading
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: white[800],
						}}
						title="Uploading Video..."
					/>
				</View>
			) : null}
			{uploadingStatus === "DONE" ? (
				<>
					<View style={{ flexDirection: "row", justifyContent: "space-around", width: "90%" }}>
						<View
							style={{
								width: 30,
								height: 30,
								backgroundColor: theme.PRIMARY,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 25,
							}}
						>
							<Icon name={"done"} color={"black"} size={18} />
						</View>
						<Heading
							style={{
								fontSize: 24,
								fontWeight: "bold",
								color: white[800],
							}}
							title="Video Uploaded...."
						/>
					</View>
					<View>
						<Button
							title={"Go to Feed"}
							type="outline"
							width={"auto"}
							mt={16}
							textStyle={{
								fontWeight: "bold",
								color: white[800],
								paddingHorizontal: 16,
							}}
						/>
					</View>
					<ConfettiCannon count={200} fadeOut={true} autoStart={true} origin={{ x: -10, y: 0 }} />
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
