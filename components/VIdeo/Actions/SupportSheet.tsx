import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import Sheet from "components/Bottom";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import { black, primary, white } from "constants/Colors";
import { ToastType } from "customTypes/Store";
import { Profile } from "customTypes/generated";
import React from "react";
import { Platform, View } from "react-native";
import { useProfile, useToast } from "store/Store";
import Logger from "utils/logger";
import sendTip from "utils/tip/sendTip";

const _supportSheet = ({
	supportRef,
	profile,
}: {
	supportRef: React.RefObject<BottomSheetMethods>;
	profile: Profile | undefined;
}) => {
	const [amount, setAmount] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const toast = useToast();
	const { address, provider, isConnected } = useWalletConnectModal();
	const { currentProfile } = useProfile();

	const sendToken = async () => {
		try {
			if (amount == "") {
				toast.show("Please enter an amount", ToastType.ERROR, true);
				setIsLoading(false);
				return;
			}
			const amountRegex = /^[0-9.]+$/;
			if (!amountRegex.test(amount)) {
				toast.show("Invalid amount", ToastType.ERROR, true);
				setIsLoading(false);
				return;
			}
			const intValue = parseInt(amount, 10);
			const intGweiValue = intValue * 10 ** 18;
			const hexAmount = "0x" + intGweiValue.toString(16);
			Logger.Success(profile?.ownedBy);

			const txResult = await provider?.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: address,
						to: profile?.ownedBy,
						data: "0x",
						value: hexAmount,
					},
				],
			});
			console.log(txResult, "This is tx result");

			// await subscribeChannel(profile?.profile?.ownedBy);
			const result = await sendTip(currentProfile?.ownedBy, amount, profile?.ownedBy, message);
			Logger.Log("this is tip", result);
			setAmount("");
			setIsLoading(false);
			toast.show("Amount sent successfully", ToastType.SUCCESS, true);
		} catch (error) {
			setAmount("");
			setIsLoading(false);
			Logger.Log("error aya hai", error);
			toast.show("Something went wrong", ToastType.ERROR, true);
		}
	};
	return (
		<Sheet
			ref={supportRef}
			snapPoints={[280]}
			enablePanDownToClose={true}
			enableOverDrag={true}
			bottomInset={64}
			style={{
				marginHorizontal: 8,
			}}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			detached={true}
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
				>
					<Heading
						title={`Support @${profile?.handle}`}
						style={{
							fontSize: 18,
							color: white[800],
							fontWeight: "600",
						}}
					/>
				</View>
				<View
					style={{
						borderBottomColor: black[300],
						borderBottomWidth: 1,
						marginVertical: 8,
					}}
				/>
				<BottomSheetScrollView>
					<View
						style={{
							padding: 12,
						}}
					>
						<BottomSheetTextInput
							placeholder="Enter amount in Matic"
							value={amount}
							placeholderTextColor={white[200]}
							selectionColor={primary}
							style={{
								backgroundColor: black[400],
								color: "white",
								paddingHorizontal: 16,
								paddingVertical: Platform.OS === "ios" ? 16 : 8,
								borderRadius: 8,
								flex: 1,
							}}
							keyboardType="number-pad"
							onChange={(e) => {
								e.preventDefault();
								setAmount(e.nativeEvent.text);
							}}
						/>
						<BottomSheetTextInput
							placeholder="Message"
							value={message}
							placeholderTextColor={white[200]}
							selectionColor={primary}
							style={{
								backgroundColor: black[400],
								color: "white",
								paddingHorizontal: 16,
								paddingVertical: Platform.OS === "ios" ? 16 : 8,
								borderRadius: 8,
								flex: 1,
								marginVertical: 16,
							}}
							onChange={(e) => {
								e.preventDefault();
								setMessage(e.nativeEvent.text);
							}}
						/>
						<Button
							onPress={async () => {
								setIsLoading(true);
								await sendToken();
							}}
							title="Send"
							bg={white[600]}
							textStyle={{
								fontWeight: "600",
								fontSize: 16,
								color: "black",
							}}
							isLoading={isLoading}
							py={12}
							borderRadius={8}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

const SupportSheet = React.memo(_supportSheet);

export default SupportSheet;
