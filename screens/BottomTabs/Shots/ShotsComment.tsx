import Comment from "components/Comments";
import CommentInput from "components/Comments/CommentInput";
import type { RootStackScreenProps } from "customTypes/navigation";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function ShotsComment({
  route,
}: RootStackScreenProps<"ShotsComment">) {
  return (
    <SafeAreaView style={styles.container}>
      <Comment publicationId={route.params.publicationId} shots={true} />
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
