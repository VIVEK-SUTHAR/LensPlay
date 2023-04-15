import { AntDesign } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as React from "react";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import Button from "../../components/UI/Button";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { LENSPLAY_SITE } from "../../constants";
import { black, primary, white } from "../../constants/Colors";
import { RootStackScreenProps } from "../../types/navigation/types";
import Paginator from "../../components/Login/Paginator";
import { data } from "../../components/Login/data";
import Onboarding from "../../components/Login/Onboarding";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "../../components/Bottom";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const loginRef = React.useRef<BottomSheetMethods>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding loginRef={loginRef} />
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
      </View>
      <Sheet
        ref={loginRef}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "#1d1d1d",
        }}
        snapPoints={["25%"]}
        children={
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 16,
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Heading
                title="Choose method"
                style={{ fontSize: 24, color: "white", fontWeight: "500" }}
              />
              <StyledText
                title="Choose method to login and get started"
                style={{ fontSize: 16, color: white[100], fontWeight: "500" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Pressable
                style={{
                  backgroundColor: white[700],
                  padding: 16,
                  borderRadius: 50,
                }}
              >
                <Icon name="wallet" size={20} color={black[800]} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: white[700],
                  padding: 16,
                  borderRadius: 50,
                }}
              >
                <Icon name="desktop" size={20} color={black[800]} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: white[700],
                  padding: 16,
                  borderRadius: 50,
                }}
              >
                <Icon name="referal" size={20} color={black[800]} />
              </Pressable>
            </View>
          </View>
        }
      />
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
