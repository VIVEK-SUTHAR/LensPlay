import * as Clipboard from "expo-clipboard";
import React from "react";
import { Dimensions, Vibration, View, useWindowDimensions } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";
import { white } from "constants/Colors";
import { useProfile, useToast } from "store/Store";
import { ToastType } from "customTypes/Store";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { useNavigation } from "@react-navigation/native";
import { HandleInfo } from "customTypes/generated";

function ProfileQR() {
	const { currentProfile } = useProfile();
	const toast = useToast();
	const windowWidth = Dimensions.get("window").width;
	const profileLink = `https://lensplay.xyz/channel/${currentProfile?.id}`;
	const navigation = useNavigation();
	const goToQRScreen = React.useCallback(() => {
		navigation.navigate("MyQR");
	}, []);

	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Avatar
					src={getRawurl(currentProfile?.metadata?.picture)}
					height={windowWidth / 3}
					width={windowWidth / 3}
				/>
				<Heading
					title={currentProfile?.metadata?.displayName}
					style={{
						color: "white",
						fontSize: 20,
						fontWeight: "600",
						marginTop: 16,
					}}
				/>
				<StyledText
					title={formatHandle(currentProfile?.handle as HandleInfo)}
					style={{
						color: "gray",
						fontSize: 12,
						fontWeight: "500",
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					marginVertical: 24,
				}}
			>
				<Button
					title={"Copy link"}
					width={"48%"}
					bg={white[800]}
					py={16}
					textStyle={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "600",
					}}
					onPress={async () => {
						await Clipboard.setStringAsync(profileLink);
						Vibration.vibrate(100, true);
						toast.show("Link copied", ToastType.SUCCESS, true);
					}}
				/>
				<Button
					title={"Show QR"}
					width={"48%"}
					bg={white[800]}
					py={16}
					textStyle={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "600",
					}}
					onPress={goToQRScreen}
				/>
			</View>
		</View>
	);
}

function ProfileQRSheet() {
	const { width, height } = useWindowDimensions();
	const { currentProfile } = useProfile();

	return (
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
					href: require("../../assets/images/icon.png"),
					padding: 0,
					scale: 1,
					hidePieces: true,
				}}
			/>
		</View>
	);
}

export default React.memo(ProfileQR);

const ProfileSheet = React.memo(ProfileQRSheet);

export { ProfileSheet };
