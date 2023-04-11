import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import Heading from "../UI/Heading";
import { white } from "../../constants/Colors";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/error.png")}
      />
      <View style={styles.messageContainer}>
        <Heading title={message} style={styles.message} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  messageContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 16,
    color: white[200],
    fontWeight: "600",
    alignSelf: "flex-start",
    textAlign: "center",
    marginBottom: 24,
  },
});
