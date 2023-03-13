import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import searchUser from "../api/zooTools/searchUser";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import Icon from "../components/Icon";
import Button from "../components/UI/Button";
import StyledText from "../components/UI/StyledText";
import { useAuthStore, useProfile } from "../store/Store";
import { QRData } from "../types";
import { RootStackScreenProps } from "../types/navigation/types";
import decryptData from "../utils/decryptData";
import extractURLs from "../utils/extractURL";
import storeData from "../utils/storeData";

const QRLogin = ({ navigation }: RootStackScreenProps<"QRLogin">) => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const { setAccessToken, setRefreshToken, setIsViaDeskTop } = useAuthStore();
  const { setCurrentProfile, setUserProfileId } = useProfile();

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

  const handleBarcodeScanned = async (data: QRData) => {
    if (data) {
      try {
        const accessToken = await decryptData(
          JSON.parse(data.data).accessToken
        );
        const refreshToken = await decryptData(
          JSON.parse(data.data).refreshToken
        );

        const profileId = JSON.parse(data.data).profileId;

        storeData(accessToken, refreshToken, profileId);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserProfileId(profileId);
        setShowScanner(false);
        const profiledata = await client.query({
          query: getUserProfile,
          variables: {
            id: profileId,
          },
        });
        const access = await searchUser(profiledata.data.profile.ownedBy);
        if (!(access.statusCode === 404)) {
          const handleUser = {
            email: access.email,
            hasAccess: access.fields.hasAccess,
          };
          await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
          if (access.fields.hasAccess) {
            setIsViaDeskTop(true);
            setCurrentProfile(profiledata.data.profile);
            navigation.navigate("Root");
          }
          if (!access.fields.hasAccess) {
            navigation.push("LeaderBoard", {
              referralsCount: access.referralsCount,
              rankingPoints: access.rankingPoints,
              rankingPosition: access.rankingPosition,
              refferalLink: `https://form.waitlistpanda.com/go/${access.listId}?ref=${access.id}`,
            });
          }
        } else {
          navigation.navigate("JoinWaitlist");
        }
      } catch (error) {}
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
