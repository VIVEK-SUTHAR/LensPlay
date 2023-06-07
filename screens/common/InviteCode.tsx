import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import { black, dark_primary, dark_secondary, primary, white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import { Image } from "expo-image";
import linking from "navigation/LinkingConfiguration";
import React, { useState } from "react";
import {
	Dimensions,
	Linking,
	NativeSyntheticEvent,
	SafeAreaView,
	TextInput,
	TextInputChangeEventData,
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

	const shareOnTwitter = () => {
		Linking.openURL(
			`https://twitter.com/intent/tweet?original_referer=yoururl.com&source=tweetbutton&url=GM frens 👋,%0a%0aI'm trying @lensplayxyz 🚀,need my invite to access LensPlay 🔥`
		);
	};

	const shareOnLens = () => {
		Linking.openURL(
			"https://lenster.xyz/?text= GM frens 👋,I'm trying @lensplayxyz 🚀,need my invite to access LensPlay 🔥"
		);
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
				justifyContent: "space-evenly",
			}}
		>
			<View
				style={{
					flex: 0.5,
					padding: 12,
				}}
			>
				<Image
					source={require("../../assets/images/home.png")}
					style={{
						flex: 1,
					}}
					contentFit="contain"
				/>
			</View>
			<View
				style={{
					alignItems: "flex-start",
					padding: 12,
				}}
			>
				<Heading
					title={"Have an invite code?"}
					style={{
						color: white[800],
						fontWeight: "600",
						fontSize: Dimensions.get("window").width / 12,
					}}
				/>
				<TextInput
					placeholder="Enter a code"
					placeholderTextColor={"white"}
					selectionColor={PRIMARY}
					onChange={handleInput}
					style={{
						paddingVertical: 12,
						paddingHorizontal: 12,
						fontSize: 20,
						marginVertical: 20,
						width: "100%",
						backgroundColor: black[400],
						borderRadius: 8,
						color: "white",
					}}
				/>
				<View
					style={{
						position: "relative",
						bottom: 16,
						paddingVertical: 12,
						width: "100%",
            marginTop:12
					}}
				>
					<Button
						title={"Let's Get In"}
						py={12}
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
			</View>

			<View style={{ padding: 16 }}>
				<Heading title="Don't have invite an code?" style={{ fontSize: 24, color: "white" }} />
				<Heading
					title="Get one by tagging lensplay in any of our socials"
					style={{ fontSize: 20, color: "grey", paddingVertical: 8 }}
				/>
				<View
					style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 16 }}
				>
					<Button
						title={"Twitter"}
						type="filled"
						bg={"#c0c0c0"}
						borderColor={"white"}
						width={"40%"}
						// borderRadius={20}
						// px={36}
						textStyle={{ color: "black", fontSize: 18 }}
						onPress={shareOnTwitter}
					/>
					<Button
						title={"Lens"}
						type="filled"
						borderColor={"white"}
						width={"40%"}
						// px={36}
						bg={"#c0c0c0"}
						textStyle={{ color: "black", fontSize: 18 }}
						onPress={shareOnLens}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
