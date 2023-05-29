import { dark_primary } from "constants/Colors";
import React from "react";
import {
	NativeSyntheticEvent,
	Platform,
	StyleSheet,
	TextInput,
	TextInputChangeEventData,
	View,
} from "react-native";
import { useThemeStore } from "store/Store";
import StyledText from "components/UI/StyledText";

interface InputProps {
	label: string;
	onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
	placeHolder: string;
	value: string;
	rows?: number;
}

const TextArea: React.FC<InputProps> = ({ label, onChange, placeHolder, value, rows = 3 }) => {
	const { PRIMARY } = useThemeStore();
	return (
		<View style={styles.inputContainer}>
			<StyledText title={label} style={styles.textStyle} />
			<TextInput
				multiline={true}
				numberOfLines={Platform.OS === "ios" ? undefined : rows}
				onChange={onChange}
				style={[
					styles.input,
					{
						minHeight: Platform.OS === "ios" && rows ? 16 * rows : undefined,
					},
				]}
				placeholder={value || placeHolder}
				placeholderTextColor="gray"
				selectionColor={PRIMARY}
				value={value}
				textAlignVertical="top"
			/>
		</View>
	);
};

export default TextArea;

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		marginVertical: 8,
	},
	textStyle: {
		color: "white",
		fontWeight: "600",
		marginBottom: 8,
		fontSize: 16,
	},
	input: {
		backgroundColor: dark_primary,
		color: "white",
		paddingHorizontal: 16,
		paddingVertical: Platform.OS === "ios" ? 24 : 8,
		borderRadius: 8,
	},
});
