import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { black, white } from "constants/Colors";
import Icon from "./Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";

export default function PleaseLogin() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/pleaselogin.png")}
      />
      <View style={styles.messageContainer}>
        <Heading
          title={"Please login to use all features of LensPlay"}
          style={styles.message}
        />
        <Button
          title="Login"
          icon={<Icon name="arrowForward" size={16} color={black[500]} />}
          iconPosition="right"
          width={"auto"}
          bg={white[800]}
          px={24}
          py={8}
          textStyle={styles.buttonText}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
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
    height: 300,
    width: 300,
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
  buttonText: {
    color: black[500],
    fontSize: 16,
    fontWeight: "600",
  },
});
