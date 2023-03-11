import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "../components/UI/StyledText";
import { BarCodeScanner } from "expo-barcode-scanner";
import Button from "../components/UI/Button";
import extractURLs from "../utils/extractURL";
import { useAuthStore, useProfile } from "../store/Store";
import storeData from "../utils/storeData";
import { client } from "../apollo/client";
import getUserProfile from "../apollo/Queries/getUserProfile";
import searchUser from "../api/zooTools/searchUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QRLogin = ({ navigation }) => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [profileId, setprofileId] = useState("");
  const authStore = useAuthStore();
  const userStore = useProfile();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
  var CryptoJS = require("crypto-js");
  async function encryptData(data: string) {
    var ciphertext = CryptoJS.AES.encrypt(data, "secret key 123").toString();
    return ciphertext;
  }

  async function decryptData(data: string) {
    var bytes = CryptoJS.AES.decrypt(data, "secret key 123");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  const handleBarcodeScanned = async (data) => {
    if (data) {
      try {
          const accessToken=await decryptData(JSON.parse(data.data).accessToken)
          const refreshToken=await decryptData(JSON.parse(data.data).refreshToken)
        storeData(
          accessToken,
          refreshToken
        );
        authStore.setAccessToken(accessToken);
        authStore.setRefreshToken(refreshToken);
        setShowScanner(false);
        const profiledata = await client.query({
          query: getUserProfile,
          variables: {
            id: JSON.parse(data.data).profileId,
          },
        });
        
        const access = await searchUser(profiledata.data.profile.ownedBy);
        console.log(access);
        
        if (!(access.statusCode === 404)) {
          const handleUser = {
            email: access.email,
            hasAccess: access.fields.hasAccess,
          };
          await AsyncStorage.setItem("@access_Key", JSON.stringify(handleUser));
          if (access.fields.hasAccess) {
            authStore.setIsViaDeskTop(true);
            userStore.setCurrentProfile(profiledata.data.profile);
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
        }
        else{
          navigation.navigate("JoinWaitlist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.conatiner}>
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <StyledText
            title="Follow below steps"
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              marginVertical: 4,
            }}
          />
          {LoginSteps.map((item) => (
            <StyledText
              title={extractURLs(item.instruction)}
              style={{ color: "white", fontSize: 14, fontWeight: "600" }}
            />
          ))}
        </View>
        {/* {data && <StyledText title={data} style={{ color: "whiteu" }} />} */}
        {showScanner ? (
          <BarCodeScanner
            children={
              <View
                style={{
                  position: "absolute",
                  marginTop: Dimensions.get("screen").height * 0.137,
                  height: "68.8%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 200,
                    width: 200,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    borderRadius: 4,
                    borderWidth: 2,
                  }}
                ></View>
              </View>
            }
            onBarCodeScanned={handleBarcodeScanned}
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: 78,
              },
            ]}
          />
        ) : (
          <View
            style={{
              width: "90%",
              height: "80%",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
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
              iconPosition="right"
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default QRLogin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "black",
  },
});
