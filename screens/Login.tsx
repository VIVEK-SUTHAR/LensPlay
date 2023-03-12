import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { MotiImage, MotiView } from "moti";
import * as React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import StyledText from "../components/UI/StyledText";
import { LENSPLAY_SITE } from "../constants";
import { primary } from "../constants/Colors";
import { RootStackScreenProps } from "../types/navigation/types";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [login, setLogin] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <View>
            <MotiView
              style={styles.box1}
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 500,
                delay: 450,
              }}
            >
              <Icon name="shots_outline" color="white" size={64} />
            </MotiView>
          </View>
          <View style={{ flexDirection: "row", padding: 8 }}>
            <MotiView
              style={styles.box2}
              from={{ opacity: 0, scale: 0.5, translateX: -150 }}
              animate={{ opacity: 1, scale: 1, translateX: 0 }}
              transition={{
                type: "timing",
                duration: 550,
                delay: 450,
              }}
            >
              <Icon name="play" color="white" size={36} />
            </MotiView>
            <MotiView
              style={styles.box3}
              from={{ opacity: 0, scale: 0.5, translateX: 150 }}
              animate={{ opacity: 1, scale: 1, translateX: 0 }}
              transition={{
                type: "timing",
                duration: 550,
                delay: 450,
              }}
            >
              <Image
                style={{ width: 64, height: 64 }}
                source={require("../assets/images/lens.png")}
              />
              {/* <Icon name="play" color="white" size={36} /> */}
            </MotiView>
            {/* <MotiImage
            source={{ uri: require("../assets/images/lens.png") }}
          /> */}
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View>
            <Heading
              title="LensPlay"
              style={{
                fontSize: 64,
                color: "white",
                fontWeight: "700",
                textAlign: "center",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                marginTop: 8,
                justifyContent: "flex-end",
              }}
            >
              <StyledText
                title={"See the world in a"}
                style={{
                  fontSize: 20,
                  color: "white",
                  textAlign: "right",
                }}
              />
              <View style={{ flexDirection: "row", marginTop: -4 }}>
                <StyledText
                  title={"different"}
                  style={{
                    fontSize: 20,
                    color: "#56CBF9",
                    textAlign: "right",
                    marginRight: 8,
                  }}
                />
                <StyledText
                  title={"way"}
                  style={{
                    fontSize: 20,
                    color: "white",
                    textAlign: "right",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 16,
          width: "100%",
        }}
      >
        <StyledText
          title={
            <>
              <StyledText
                title={"By clicking on get started you agree to our"}
                style={{ color: "gray", fontSize: 12 }}
              />{" "}
              <StyledText
                style={{
                  textDecorationLine: "underline",
                  color: "white",
                  fontSize: 12,
                }}
                title={"Privacy Policy"}
                onPress={() => {
                  Linking.openURL(LENSPLAY_SITE);
                }}
              />{" "}
              <StyledText title={"and "} style={{ color: "gray" }} />
              <StyledText
                style={{
                  textDecorationLine: "underline",
                  color: "white",
                  fontSize: 12,
                }}
                title={"Terms and Condition"}
                onPress={() => {
                  Linking.openURL(LENSPLAY_SITE);
                }}
              />{" "}
            </>
          }
          style={{ marginBottom: 16 }}
        />
        <Button
          onPress={async () => {
            navigation.navigate("ConnectWallet");
          }}
          title="Get Started"
          bg={primary}
          textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
          py={12}
          icon={<AntDesign name="arrowright" size={20} />}
          iconPosition="right"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-around",
  },
  box1: {
    width: 196,
    height: 196,
    backgroundColor: "#56CBF9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    width: 96,
    height: 96,
    backgroundColor: "#EBDD4E",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  box3: {
    width: 96,
    height: 96,
    backgroundColor: "#9EF01A",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
});
