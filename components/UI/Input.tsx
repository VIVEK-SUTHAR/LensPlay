import React from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { dark_primary } from "../../constants/Colors";
import { useThemeStore } from "../../store/Store";
import StyledText from "./StyledText";

interface InputProps {
  label: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  placeHolder: string;
  value: string;
  style?: StyleProp<TextStyle | ViewStyle>;
}

const Input = ({ label, onChange, placeHolder, value }: InputProps) => {
  const { PRIMARY } = useThemeStore();
  return (
    <View style={styles.inputContainer}>
      <StyledText title={label} style={styles.textStyle} />
      <TextInput
        onChange={onChange}
        style={styles.input}
        placeholder={value || placeHolder}
        placeholderTextColor="gray"
        selectionColor={PRIMARY}
        value={value}
      />
    </View>
  );
};

export default Input;

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
