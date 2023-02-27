import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Comment from "../components/Comments";
import CommentInput from "../components/Comments/CommentInput";
import { RootStackScreenProps } from "../types/navigation/types";

export default function ShotsComment({
  route,
}: RootStackScreenProps<"ShotsComment">) {
  return (
    <SafeAreaView style={styles.container}>
      <Comment publicationId={route.params.publicationId} />
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <CommentInput publicationId={route.params.publicationId} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 4,
  },
});
