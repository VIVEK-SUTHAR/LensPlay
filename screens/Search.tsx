import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dark_primary, dark_secondary, primary } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";

const Search = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: dark_secondary, elevation: 0 },
      headerLeft: () => (
        <View style={{ width: "89%", padding: 4 }}>
          <TextInput
            caretHidden={true}
            placeholder="Type something to search..."
            placeholderTextColor={"white"}
            clearButtonMode={"while-editing"}
            style={{
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              color: "white",
              borderColor: primary,
              borderWidth: 1,
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          />
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark_secondary }}>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
