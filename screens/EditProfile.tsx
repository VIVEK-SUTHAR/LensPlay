import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { dark_primary } from "../constants/Colors";
import StyledText from "../components/UI/StyledText";
import { useThemeStore } from "../store/Store";
import Button from "../components/UI/Button";

const EditProfile = () => {
  const theme = useThemeStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <StyledText title="Name" style={styles.textStyle} />
        <TextInput
          placeholder="Vivek"
          style={styles.input}
          placeholderTextColor="gray"
          selectionColor={theme.PRIMARY}
        />
      </View>
      <View style={styles.inputContainer}>
        <StyledText title="Bio" style={styles.textStyle} />
        <TextInput
          placeholder="bio"
          numberOfLines={4}
          style={styles.input}
          placeholderTextColor="gray"
          selectionColor={theme.PRIMARY}
        />
      </View>
      <View
        style={[styles.inputContainer, { position: "absolute", bottom: 16 }]}
      >
        <Button
          title="Update"
          width={"100%"}
          px={12}
          textStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 16,
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 16,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: dark_primary,
    color: "white",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
