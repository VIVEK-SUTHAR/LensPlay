import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, white } from "constants/Colors";
import useProfileManager from "hooks/useProfileManager";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore, useToast } from "store/Store";
import Logger from "utils/logger";
import { useWalletClient } from "wagmi";

type Props = {
	addManagerSheetRef: React.RefObject<BottomSheetMethods>;
};

const AddProfileManager = ({ addManagerSheetRef }: Props) => {
	const [address, setAddress] = React.useState<string | null>(null);
	const [isAdding, setIsAdding] = React.useState(false);

	const {data}=useWalletClient();
	const { PRIMARY } = useThemeStore();
	const { error } = useToast();
	const { addManager, signProfileManagerMessage, broadcastProfileManagerTx } = useProfileManager();

	const addAddress = async () => {
		setIsAdding(true);
		try {
			if (!address?.length || (!address.startsWith("0x") && address.length !== 42)) {
				error("Please enter valid address");
				return;
			}

			const typedData = await addManager(address);
			if (typedData) {
	

				const res = await signProfileManagerMessage(typedData);
				if (res?.id && res.sign) {
					console.log(res);
					return;
					const txn = await broadcastProfileManagerTx(res.id, res.sign);
				}
			}
		} catch (er) {
			Logger.Error("E",er)
			error("Something wet wrong");
		} finally {
			setIsAdding(false);
		}
	};
	return (
		<Sheet
			ref={addManagerSheetRef}
			index={-1}
			snapPoints={["80%"]}
			android_keyboardInputMode="adjustResize"
			enableDynamicSizing={true}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			style={{
				
				zIndex: 100,
			}}
		>
			<BottomSheetScrollView>
				<View style={styles.p_16}>
					<View style={styles.titleContainer}>
						<Heading
							title="Add profile manager"
							style={{
								fontSize: 20,
								fontWeight: "600",
								color: white[700],
							}}
						/>
					</View>
					<StyledText
						title="You can add a EOA that can post on your behalf."
						style={{
							fontSize: 16,
							fontWeight: "600",
							color: "gray",
						}}
					/>
					<BottomSheetTextInput
						placeholder="Enter address"
						placeholderTextColor={white[100]}
						selectionColor={PRIMARY}
						style={[styles.inputStyle, { borderColor: PRIMARY }]}
						onChange={(e) => {
							setAddress(e.nativeEvent.text);
						}}
					/>
					<Button
						title={"Add"}
						isLoading={isAdding}
						width={"auto"}
						onPress={addAddress}
						py={12}
						textStyle={{
							fontSize: 18,
							textAlign: "center",
							color:
								!address?.length || (!address.startsWith("0x") && address.length !== 42)
									? "red"
									: address.startsWith("0x") && address.length === 42
									? "white"
									: "gray",
						}}
					/>
				</View>
			</BottomSheetScrollView>
		</Sheet>
	);
};

export default AddProfileManager;

const styles = StyleSheet.create({
	p_16: {
		padding: 16,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	inputStyle: {
		paddingVertical: 16,
		fontSize: 16,
		marginVertical: 16,
		color: white[700],
		fontWeight: "500",
		backgroundColor: dark_primary,
		paddingHorizontal: 16,
		borderRadius: 8,
		borderWidth: 1,
	},
});
