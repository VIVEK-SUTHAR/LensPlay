import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import { black, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Platform } from "react-native";
import {
	Dimensions,
	NativeSyntheticEvent,
	SafeAreaView,
	Share,
	StatusBar,
	TextInput,
	TextInputChangeEventData,
	TouchableOpacity,
	View,
} from "react-native";
import { useProfile, useThemeStore, useToast } from "store/Store";
import createUser from "utils/invites/createUser";

export default function InviteCode({ navigation }: RootStackScreenProps<"InviteCode">) {
	const [inviteCode, setInviteCode] = useState<string>("");
	const [isChecking, setIsChecking] = useState<boolean>(false);
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { currentProfile } = useProfile();

	const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setInviteCode(e.nativeEvent.text);
	};

	const checkIsValidInviteCode = () => {
		if (!inviteCode.includes("lensplay-")) {
			toast.error("Invaild invite code");
			return;
		}
		const inviteLength = inviteCode?.split("-").length;
		if (inviteLength == 0 || inviteLength == 1 || inviteLength === 2) {
			toast.error("Invaild invite code");
			return;
		}
		updateInvite();
	};

	const updateInvite = async () => {
		setIsChecking(true);
		try {
			const apiResponse = await fetch("https://lensplay-api.vercel.app/api/invites/redeemInvite", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					inviteCode: inviteCode,
				}),
			});
			const jsonRes = await apiResponse.json();
			if (apiResponse.status === 403) {
				toast.error(jsonRes?.message);
				return;
			}

			if (apiResponse.status === 404) {
				toast.error(jsonRes?.message);
				return;
			}

			if (apiResponse.status === 200) {
				const isUser = await createUser(
					currentProfile?.id,
					currentProfile?.ownedBy,
					jsonRes?.message?.profileId
				);
				if (isUser) {
					toast.success("Redeemed successfully");
					navigation.replace("LoginWithLens");
				} else {
					toast.error("Something went wrong");
				}
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setIsChecking(false);
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<StatusBar backgroundColor={"#111111"} barStyle={"light-content"} />
			<ScrollView>
				<View
					style={{
						position: "relative",
						marginTop: -100,
						alignItems: "center",
					}}
				>
					<Image
						source={require("../../assets/images/circle.webp")}
						style={{
							height: 360,
							width: 360,
						}}
					/>
					<View
						style={{
							position: "absolute",
							height: 360,
							width: 360,
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Image
							source={require("../../assets/images/icon.png")}
							style={{
								height: 50,
								width: 50,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						paddingHorizontal: 16,
						marginTop: 48,
					}}
				>
					<Heading
						title={"Have an invite code?"}
						style={{
							color: white[800],
							fontWeight: "600",
							fontSize: Dimensions.get("window").width / 16,
						}}
					/>
					<TextInput
						placeholder="Enter a code"
						placeholderTextColor={"white"}
						selectionColor={PRIMARY}
						onChange={handleInput}
						style={{
							padding: 16,
							fontSize: 20,
							marginTop: 16,
							width: "100%",
							backgroundColor: black[400],
							borderRadius: 8,
							color: "white",
						}}
					/>
					{/* <TouchableOpacity
					style={{ flexDirection: "row", marginTop: 8, marginHorizontal: 4 }}
					onPress={async () => {
						await Share.share({
							message:
								"GM frens 👋,\nI'm trying @lensplayxyz 🚀,need my invite to access the app🔥",
						});
					}}
				>
					<Heading
						title="Don't have an invite code? share your word on socials"
						style={{ fontSize: 16, color: "grey" }}
					/>
				</TouchableOpacity> */}
				</View>
			</ScrollView>
			<View
				style={{
					position: "absolute",
					bottom: Platform.OS === "android" ? 32 : 48,
					paddingHorizontal: 16,
					width: "100%",
				}}
			>
				<Button
					title={"Submit"}
					py={16}
					disabled={!inviteCode}
					textStyle={{
						textAlign: "center",
						fontSize: 20,
						fontWeight: "600",
					}}
					isLoading={isChecking}
					onPress={checkIsValidInviteCode}
				/>
			</View>
		</SafeAreaView>
	);
}
