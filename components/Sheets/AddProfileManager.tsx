import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, white } from "constants/Colors";
import useProfileManager from "hooks/useProfileManager";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { useThemeStore, useToast } from "store/Store";

type Props = {
	addManagerSheetRef: React.RefObject<BottomSheetMethods>;
};

const AddProfileManager = ({ addManagerSheetRef }: Props) => {
	const [address, setAddress] = React.useState<string | null>(null);
	const [isAdding, setIsAdding] = React.useState(false);

	const { PRIMARY } = useThemeStore();
	const { error } = useToast();
	const { addManager } = useProfileManager();

	const addAddress = async () => {
		setIsAdding(true);
		try {
			if (!address?.length || (!address.startsWith("0x") && address.length !== 42)) {
				error("Please enter valid address");
				return;
			}
			console.log("hhhh");
			await addManager(address);
		} catch (er) {
			error("Something wet wrong");
		} finally {
			setIsAdding(false);
		}
	};
	return (
		<Sheet
			ref={addManagerSheetRef}
			index={-1}
			snapPoints={["75%"]}
			android_keyboardInputMode="adjustResize"
			enableDynamicSizing={true}
			enablePanDownToClose
			backgroundStyle={{
				backgroundColor: black[600],
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

						{isAdding ? (
							<ActivityIndicator size={"small"} color={PRIMARY} />
						) : (
							<TouchableOpacity activeOpacity={0.8} onPress={addAddress}>
								<StyledText
									title="Add"
									style={{
										fontSize: 18,
										fontWeight: "600",
										color:
											!address?.length || (!address.startsWith("0x") && address.length !== 42)
												? "red"
												: address.startsWith("0x") && address.length === 42
												? "white"
												: "gray",
									}}
								/>
							</TouchableOpacity>
						)}
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
