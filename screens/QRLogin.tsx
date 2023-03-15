import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { useAuthStore, useProfile, useToast } from "../store/Store";
import { QRdata } from "../types";
import { RootStackScreenProps } from "../types/navigation/types";
import { ToastType } from "../types/Store";
import decryptData from "../utils/decryptData";
import extractURLs from "../utils/extractURL";
import handleWaitlist from "../utils/handleWaitlist";
import getDefaultProfile from "../utils/lens/getDefaultProfile";
import getTokens from "../utils/lens/getTokens";
import storeTokens from "../utils/storeTokens";

const QRLogin = ({ navigation }: RootStackScreenProps<"QRLogin">) => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { setAccessToken, setRefreshToken, setIsViaDeskTop } = useAuthStore();
  const { setCurrentProfile, setHasHandle } = useProfile();
  const toast = useToast();

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (status === "denied") {
      Linking.openSettings();
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.conatiner}>
        <StyledText
          title="Requesting Camera Permission..."
          style={{ fontSize: 20, color: "white", alignSelf: "center" }}
        />
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.conatiner}>
        <StyledText
          title="Please give camera permission,in order to scan QR"
          style={{ fontSize: 20, color: "white", alignSelf: "center" }}
        />
        <View
          style={{
            height: "50%",
            width: "80%",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onPress={() => {
              getBarCodeScannerPermissions();
            }}
            title="Grant Permission"
            bg={"white"}
            my={8}
            borderRadius={8}
            textStyle={{ fontWeight: "600", fontSize: 20, color: "black" }}
            py={8}
            iconPosition="right"
          />
        </View>
      </SafeAreaView>
    );
  }

  const LoginSteps = [
    {
      instruction: "1. Go to https://lensplay.xyz/connect",
    },
    {
      instruction: "2. Connect your wallet and sign message",
    },
    {
      instruction: "3. Scan QR and Explore LensPlay",
    },
  ];

  async function HandleDefaultProfile(adress: string) {
    const userDefaultProfile = await getDefaultProfile(adress);
    if (userDefaultProfile) {
      setHasHandle(true);
      setCurrentProfile(userDefaultProfile);
    } else {
      setHasHandle(false);
    }
  }

  const handleBarcodeScanned = async (data: QRdata) => {
    if (data) {
      setShowScanner(false);
      try {
        const signature = JSON.parse(data.data).signature;
        const address = JSON.parse(data.data).address;
        if (!signature && !address) {
          toast.show("QR Expired, Please regenerate", ToastType.ERROR, true);
          return;
        }
        const decryptedSignature = await decryptData(signature);
        const userData = await handleWaitlist(address);

        if (!userData.fields.hasAccess) {
          navigation.replace("LeaderBoard", {
            referralsCount: userData.referralsCount,
            rankingPoints: userData.rankingPoints,
            rankingPosition: userData.rankingPosition,
            refferalLink: `https://form.waitlistpanda.com/go/${userData.listId}?ref=${userData.id}`,
          });
        }

        if (userData?.statusCode === 404) {
          navigation.replace("JoinWaitlist");
          return;
        }

        if (userData.fields.hasAccess) {
          const tokens = await getTokens({
            address,
            signature: decryptedSignature,
          });
          setAccessToken(tokens?.accessToken);
          setRefreshToken(tokens?.refreshToken);
          await storeTokens(tokens?.accessToken, tokens?.refreshToken, true);
          await HandleDefaultProfile(address);
          navigation.navigate("Root");
        }
      } catch (error) {
        console.log("[Error]:Error in QR Login");
        throw new Error("[Error]:Error in QR Login", {
          cause: error,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.padding16}>
        <StyledText title="Follow below steps" style={styles.stepsHeader} />
        {LoginSteps.map((item) => (
          <StyledText
            title={extractURLs(item.instruction)}
            style={styles.stepInstruction}
          />
        ))}
      </View>
      {showScanner ? (
        <BarCodeScanner
          children={
            <View style={styles.qrOverlayContainer}>
              <View style={styles.qrBlock}></View>
            </View>
          }
          onBarCodeScanned={handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              setShowScanner(true);
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
      )}
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
  stepInstruction: { color: "white", fontSize: 14, fontWeight: "600" },
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
    height: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
