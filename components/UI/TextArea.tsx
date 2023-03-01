import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { dark_primary } from "../../constants/Colors";
import { useThemeStore } from "../../store/Store";
import StyledText from "./StyledText";

interface InputProps {
  label: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  placeHolder: string;
  value: string;
  rows?: number;
}

const TextArea = ({
  label,
  onChange,
  placeHolder,
  value,
  rows = 3,
}: InputProps) => {
  const { PRIMARY } = useThemeStore();
  return (
    <View style={styles.inputContainer}>
      <StyledText title={label} style={styles.textStyle} />
      <TextInput
        multiline={true}
        numberOfLines={rows}
        onChange={onChange}
        style={styles.input}
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
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: dark_primary,
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
