import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as React from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sheet from "../../components/Bottom";
import Icon from "../../components/Icon";
import Onboarding from "../../components/Login/Onboarding";
import Heading from "../../components/UI/Heading";
import StyledText from "../../components/UI/StyledText";
import { LENSPLAY_SITE } from "../../constants";
import { black, white } from "../../constants/Colors";
import { RootStackScreenProps } from "../../types/navigation/types";
import { Image } from "react-native";
import Button from "../../components/UI/Button";
import getProfiles from "../../utils/lens/getProfiles";
import { useGuestStore } from "../../store/GuestStore";
import { useProfile, useToast } from "../../store/Store";
import { Scalars } from "../../types/generated";
import handleWaitlist from "../../utils/handleWaitlist";
import TrackAction from "../../utils/Track";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { AUTH, GUEST_MODE } from "../../constants/tracking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const loginRef = React.useRef<BottomSheetMethods>(null);
  const connector = useWalletConnect();
  const { handleGuest } = useGuestStore();
  const toast = useToast();
  const { setCurrentProfile, setHasHandle } = useProfile();
  const [isloading, setIsloading] = React.useState<boolean>(false);

  async function HandleDefaultProfile(adress: Scalars["EthereumAddress"]) {
    const userDefaultProfile = await getProfiles({
      ownedBy: adress,
    });

    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  const connectWallet = React.useCallback(async () => {
    const walletData = await connector.connect({
      chainId: 80001,
    });

    setIsloading(true);
    try {
      if (walletData) {
        TrackAction(AUTH.WALLET_LOGIN);
        const userData = await handleWaitlist(walletData.accounts[0]);
        if (userData.statusCode === 404) {
          navigation.replace("JoinWaitlist");
        }

        if (!userData.fields.hasAccess) {
          navigation.replace("LeaderBoard", {
            referralsCount: userData?.referralsCount,
            rankingPoints: userData?.rankingPoints,
            rankingPosition: userData?.rankingPosition,
            refferalLink: `https://form.waitlistpanda.com/go/${userData?.listId}?ref=${userData?.id}`,
          });
        }

        if (userData.fields.hasAccess) {
          await HandleDefaultProfile(walletData.accounts[0]);
          const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
          if (isDeskTopLogin) {
            await AsyncStorage.removeItem("@viaDeskTop");
          }
          navigation.push("LoginWithLens");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("[Error]:Error in connect wallet");
        toast.error("Something went wrong");
      }
    } finally {
      setIsloading(false);
    }
  }, [connector]);

  const handleDesktopLogin = React.useCallback(async () => {
    handleGuest(false);
    loginRef?.current?.close();
    navigation.push("QRLogin");
  }, []);

  const handleGuestLogin = React.useCallback(async () => {
    handleGuest(true);
    navigation.navigate("Root");
    TrackAction(GUEST_MODE);
  }, []);

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
        snapPoints={["70%"]}
        children={
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 16,
              width: "100%",
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/icon.png")}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
              />
              <Heading
                title="Welcome to LensPlay"
                style={{ fontSize: 24, color: "white", fontWeight: "500" }}
              />
              <StyledText
                title="Choose method to login and get started"
                style={{ fontSize: 16, color: white[100], fontWeight: "500" }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
              }}
            >
              <Button
                onPress={async () => {}}
                title="Connect wallet"
                bg={white[600]}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: black[700],
                }}
                py={16}
                icon={<Icon name="wallet" color={black[700]} size={20} />}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 16,
                  paddingHorizontal: 64,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                />
                <View>
                  <StyledText
                    title={"OR"}
                    style={{
                      width: 45,
                      textAlign: "center",
                      color: "gray",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                />
              </View>
              <Button
                onPress={async () => {}}
                title="Connect desktop wallet"
                bg={black[300]}
                textStyle={{
                  fontWeight: "600",
                  fontSize: 16,
                  marginLeft: 8,
                  color: white[600],
                }}
                py={16}
                icon={<Icon name="desktop" color={white[600]} size={20} />}
              />
              <Pressable
                style={{
                  marginTop: 32,
                }}
              >
                <StyledText
                  title="Continue as guest"
                  style={{
                    color: white[200],
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                />
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
