import React from "react";
import { Share, View, useWindowDimensions } from "react-native";
import { black, white } from "../../constants/Colors";
import Button from "../UI/Button";
import Heading from "../UI/Heading";

export interface InviteCardOptions {
	inviteCode: string;
	isValid: boolean;
}

const InviteCard: React.FC<InviteCardOptions> = ({ inviteCode, isValid }) => {
	const { width } = useWindowDimensions();

	const ShareCode = React.useCallback(async (inviteCode: string) => {
		try {
			await Share.share({
				message: `Join lensplay by using my invite code, Invite code: ${inviteCode}`,
			});
		} catch (error) {}
	}, []);

	return (
		<View
			style={{
				height: 150,
				width: "48%",
				marginTop: 16,
				position: "relative",
				backgroundColor: black[600],
				borderRadius: 16,
				padding: 16,
				justifyContent: "space-between",
			}}
		>
			<Heading
				title={inviteCode}
				style={{ color: white[500], fontSize: width / 22, fontWeight: "600" }}
			/>
			<Button
				title={isValid ? "Share" : "Used"}
				disabled={!isValid}
				bg={white[500]}
				py={8}
				textStyle={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}
				onPress={async() => {
					await ShareCode(inviteCode);
				}}
			/>
		</View>
	);
};

export default React.memo(InviteCard);
