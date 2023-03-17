import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { RootStackScreenProps } from "../types/navigation/types";
import extractURLs from "../utils/extractURL";

const QRLogin = ({ navigation }: RootStackScreenProps<"QRLogin">) => {
  const LoginSteps = [
    {
      instruction: "1. Open your desktop browser.",
    },
    {
      instruction: "2. Visit https://lensplay.xyz/connect",
    },
    {
      instruction: "3. Connect your preffered wallet.",
    },
    {
      instruction: "4. Sign message in wallet.",
    },
    {
      instruction: "5. Scan the QR and explore LensPlay.",
    },
  ];

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.padding16}>
        <StyledText title="Follow below steps" style={styles.stepsHeader} />
        {LoginSteps.map((item, index) => (
          <StyledText
            key={index}
            title={extractURLs(item.instruction)}
            style={styles.stepInstruction}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.push("Scanner");
          }}
          title="Scan QR"
          bg={"white"}
          my={8}
          borderRadius={8}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
          py={8}
          icon={<Icon name="qr" color="black" />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
};

export default QRLogin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "black",
  },
  padding16: {
    paddingHorizontal: 16,
  },
  stepsHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 4,
  },
  stepInstruction: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  qrOverlayContainer: {
    position: "absolute",
    marginTop: Dimensions.get("screen").height * 0.137,
    height: "68.8%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  qrBlock: {
    height: 200,
    width: 200,
    backgroundColor: "transparent",
    borderColor: "white",
    borderRadius: 4,
    borderWidth: 2,
  },
  buttonContainer: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
