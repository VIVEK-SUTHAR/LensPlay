import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import StyledText from "../components/UI/StyledText";
import { dark_primary } from "../constants/Colors";
import { useThemeStore, useToast } from "../store/Store";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { ToastType } from "../types/Store";
import Dropdown from "../components/UI/Dropdown";

type subreason = {
  reason: string;
};
export type RESONTYPEDATA = {
  reason: string;
  subReason: subreason[];
};

const ReportPublication = ({
  navigation,
  route,
}: RootStackScreenProps<"ReportPublication">) => {
  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
  }, []);

  const [selectedData, setselectedData] = useState<RESONTYPEDATA>();
  const [selectedSubReason, setSelectedSubReason] = useState<subreason>();
  const [addiText, setAddiText] = useState<string>("");
  const theme = useThemeStore();
  const toast = useToast();
  const reportData: RESONTYPEDATA[] = [
    {
      reason: "SENSITIVE",
      subReason: [{ reason: "NSFW" }, { reason: "OFFENSIVE" }],
    },
    {
      reason: "ILLEGAL",
      subReason: [{ reason: "ANIMAL_ABUSE" }, { reason: "HUMAN_ABUSE" }],
    },
    {
      reason: "FRAUD",
      subReason: [{ reason: "SCAM" }, { reason: "IMPERSONATION" }],
    },
  ];

  const handleReport = async () => {
    if (!selectedData?.reason || !selectedSubReason?.reason) {
      toast.show("Please select type and reason", ToastType.ERROR, true);
      return;
    }
    try {
      toast.show("Logic baki hai dost", ToastType.INFO, true);
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "flex-start", width: "100%" }}>
          <Heading
            title="Tell us what's wrong with this post."
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 18,
              alignSelf: "flex-start",
              paddingHorizontal: 16,
              marginBottom: 18,
            }}
          />
        </View>
        <Dropdown
          label="Select Type"
          data={reportData}
          onSelect={setselectedData}
        />
        {selectedData && (
          <Dropdown
            label="Reason"
            data={selectedData.subReason}
            onSelect={setSelectedSubReason}
          />
        )}

        <View style={styles.inputContainer}>
          <StyledText title="Additional" style={styles.textStyle} />
          <TextInput
            numberOfLines={6}
            multiline={true}
            style={styles.input}
            placeholderTextColor="gray"
            selectionColor={theme.PRIMARY}
            onChange={(e) => {
              e.preventDefault();
              setAddiText(e.nativeEvent.text);
            }}
          />
        </View>
      </ScrollView>
      <View
        style={[styles.inputContainer, { position: "absolute", bottom: 16 }]}
      >
        <Button
          title="Report now"
          width={"100%"}
          py={8}
          px={16}
          bg="#DC0000"
          borderRadius={8}
          disabled={!selectedData?.reason || !selectedSubReason?.reason}
          textStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
            color: "white",
          }}
          onPress={handleReport}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReportPublication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 2,
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
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
