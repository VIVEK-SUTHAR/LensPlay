import React, { useCallback } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import { useThemeStore, useToast } from "../../store/Store";
import { useUploadStore } from "../../store/UploadStore";
import { RootStackScreenProps } from "../../types/navigation/types";

export default function AddDescription({
  navigation,
}: RootStackScreenProps<"AddDescription">) {
  const theme = useThemeStore();
  const { description, setDescription } = useUploadStore();
  const toast = useToast();

  const handleDescription = () => {
    if (!description?.trim()) return toast.error("Please enter description");
    if (description.trim().length > 1000)
      return toast.info("Description length exceed");
    navigation.replace("AddDetails");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
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
            value={description ? description : ""}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 24,
              fontSize: 20,
              height: "100%",
              color: "white",
            }}
            autoFocus={true}
            onChange={useCallback((e: { nativeEvent: { text: string } }) => {
              setDescription(e.nativeEvent.text);
            }, [])}
          />
        </View>
      </KeyboardAvoidingView>
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
          onPress={handleDescription}
          bg={"white"}
        />
      </View>
    </SafeAreaView>
  );
}
