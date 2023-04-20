import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sheet from "../../components/Bottom";
import ConnectWalletSheet from "../../components/Login/ConnectWalletSheet";
import Onboarding from "../../components/Login/Onboarding";
import StyledText from "../../components/UI/StyledText";
import { LENSPLAY_SITE } from "../../constants";
import { RootStackScreenProps } from "../../types/navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const loginRef = React.useRef<BottomSheetMethods>(null);
  const [isloading, setIsloading] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" style="light" />
      <Onboarding loginRef={loginRef} isloading={isloading} />
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
        snapPoints={["40%"]}
        children={
          <ConnectWalletSheet loginRef={loginRef} setIsloading={setIsloading} />
        }
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D3436",
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
