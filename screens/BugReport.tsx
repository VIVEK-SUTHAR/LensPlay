import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledText from "../components/UI/StyledText";
import TextArea from "../components/UI/TextArea";

const BugReport = ({ navigation }: RootStackScreenProps<"BugReport">) => {
const [BugInfo, setBugInfo] = useState("")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Pressable
          style={{
            borderWidth: 2,
            position: "absolute",
            width: "100%",
            top: 0,
          }}
        >
          <StyledText title="GG" style={{ color: "white",fontSize:24 }} />
        </Pressable>
        
        <TextArea
            label="Bug Description"
            placeHolder={"Describe the bug you found"}
            value={BugInfo}
            onChange={(e) => {
              setBugInfo(e.nativeEvent.text);
              console.log(BugInfo);
            }}
          />
    </SafeAreaView>
  );
};

export default BugReport;

const styles=StyleSheet.create({

})
