import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View
} from "react-native";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import { useThemeStore } from "../../store/Store";

export default function AddDescription() {
  const [description, setDescription] = useState<string | null>(null);
  const theme = useThemeStore();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          height: "90%",
        }}
      >
        <TextInput
          placeholder="Add description for your video"
          placeholderTextColor={"gray"}
          selectionColor={theme.PRIMARY}
          textAlignVertical="top"
          multiline={true}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 24,
            fontSize: 20,
            height: "100%",
            color: "white",
          }}
          autoFocus={true}
          onChange={(e) => {
            setDescription(e.nativeEvent.text);
          }}
        />
      </View>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledText
          title={`${description ? description.length : 0}/1000`}
          style={{ color: "gray", fontSize: 16, fontWeight: "600" }}
        />
        <Button
          title={"Save"}
          py={8}
          width={"30%"}
          textStyle={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
          onPress={() => {
            // navigation.navigate("AddDetails");
          }}
          bg={"white"}
        />
      </View>
    </SafeAreaView>
  );
}
