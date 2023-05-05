import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Linking, SafeAreaView, StyleSheet, View } from "react-native";
import Icon from "../../components/Icon";
import Button from "../../components/UI/Button";
import StyledText from "../../components/UI/StyledText";
import { dark_primary, white } from "../../constants/Colors";
import { RootStackScreenProps } from "../../types/navigation/types";

const QRLogin = ({ navigation }: RootStackScreenProps<"QRLogin">) => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar />
      <View style={styles.placeholder}>
        <Image
          style={{
            width: "100%",
            height: "80%",
            resizeMode: "contain",
          }}
          source={require("../../assets/images/home.png")}
        />
      </View>
      <View style={styles.greyContainer}>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <StyledText
            title={"Connect wallet via Desktop"}
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "900",
              textAlign: "center",
            }}
          />
        </View>
        <View>
          <View style={styles.stepContainer}>
            <View style={styles.numberContainer}>
              <StyledText
                title={"1"}
                style={{ color: "white", fontSize: 16, fontWeight: "900" }}
              />
            </View>
            <StyledText
              title={"Open our website link on your desktop"}
              style={{
                color: "white",
                opacity: 0.9,
                marginLeft: 12,
                fontSize: 15,
                flex: 1,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              title={"https://lensplay.xyz/connect"}
              borderRadius={8}
              textStyle={{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
                opacity: 0.8,
              }}
              bg={dark_primary}
              py={16}
              onPress={() => {
                Linking.openURL("https://lensplay.xyz/connect");
              }}
            />
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.numberContainer}>
              <StyledText
                title={"2"}
                style={{ color: "white", fontSize: 16, fontWeight: "900" }}
              />
            </View>
            <View
              style={{
                marginLeft: 12,
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-around",
                flex: 1,
              }}
            >
              <StyledText
                title={"Connect your preffered wallet"}
                style={{ color: "white", opacity: 0.9, fontSize: 15 }}
              />
              <StyledText
                title={
                  "Click on Login with lens and Sign message through wallet"
                }
                style={{ color: "white", opacity: 0.5 }}
              />
            </View>
          </View>
          <View style={[styles.stepContainer]}>
            <View style={styles.numberContainer}>
              <StyledText
                title={"3"}
                style={{ color: "white", fontSize: 16, fontWeight: "900" }}
              />
            </View>
            <StyledText
              title={
                "Once connecetd and signed, scan the QR code shown on the website"
              }
              style={{
                color: "white",
                opacity: 0.9,
                marginLeft: 12,
                fontSize: 15,
                flex: 1,
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.push("Scanner");
            }}
            title="Scan QR"
            bg={white[600]}
            py={12}
            px={32}
            textStyle={{
              fontSize: 16,
              fontWeight: "500",
            }}
            icon={<Icon name="qr" color="black" />}
            iconPosition="right"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRLogin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: dark_primary,
    justifyContent: "space-between",
  },
  placeholder: {
    flex: 0.3,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  padding16: {
    paddingHorizontal: 16,
  },
  greyContainer: {
    flex: 0.7,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "black",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  numberContainer: {
    height: 36,
    width: 36,
    flexDirection: "column",
    backgroundColor: dark_primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  stepsHeader: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 4,
  },
  stepInstruction: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
