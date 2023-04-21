import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { black, white } from "../../constants/Colors";
import { AUTH, GUEST_MODE } from "../../constants/tracking";
import { useGuestStore } from "../../store/GuestStore";
import { useProfile, useToast } from "../../store/Store";
import { Scalars } from "../../types/generated";
import TrackAction from "../../utils/Track";
import handleWaitlist from "../../utils/handleWaitlist";
import getProfiles from "../../utils/lens/getProfiles";
import Icon from "../Icon";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import StyledText from "../UI/StyledText";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ConnectWalletSheetProps = {
  loginRef: React.RefObject<BottomSheetMethods>;
  setIsloading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConnectWalletSheet({
  loginRef,
  setIsloading,
}: ConnectWalletSheetProps) {
  const connector = useWalletConnect();
  const toast = useToast();
  const navigation = useNavigation();
  const { handleGuest } = useGuestStore();
  const { setCurrentProfile, setHasHandle } = useProfile();

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

  const handleConnectWallet = React.useCallback(async () => {
    if (connector.accounts[0]) {
      await connector.killSession();
    }
    const walletData = await connector.connect({
      chainId: 80001,
    });

    try {
      if (walletData) {
        setIsloading(true);
        loginRef?.current?.close();
        TrackAction(AUTH.WALLET_LOGIN);
        const userData = await handleWaitlist(walletData.accounts[0]);
        if (userData?.statusCode === 404) {
          navigation.navigate("JoinWaitlist");
          return;
        }

        if (!userData?.fields?.hasAccess) {
          navigation.navigate("LeaderBoard", {
            referralsCount: userData?.referralsCount,
            rankingPoints: userData?.rankingPoints,
            rankingPosition: userData?.rankingPosition,
            refferalLink: `https://form.waitlistpanda.com/go/${userData?.listId}?ref=${userData?.id}`,
          });
        }

        if (userData?.fields?.hasAccess) {
          await HandleDefaultProfile(walletData.accounts[0]);
          const isDeskTopLogin = await AsyncStorage.getItem("@viaDeskTop");
          if (isDeskTopLogin) {
            await AsyncStorage.removeItem("@viaDeskTop");
          }
          navigation.navigate("LoginWithLens");
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
    loginRef?.current?.close();
    handleGuest(false);
    navigation.navigate("QRLogin");
  }, []);

  const handleGuestLogin = React.useCallback(async () => {
    loginRef?.current?.close();
    handleGuest(true);
    navigation.navigate("Root");
    TrackAction(GUEST_MODE);
  }, []);

  return (
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
        }}
      >
        <Button
          onPress={handleConnectWallet}
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
          onPress={handleDesktopLogin}
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
          onPress={handleGuestLogin}
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
  );
}
