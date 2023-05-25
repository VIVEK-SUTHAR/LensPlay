import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { getColors } from "react-native-image-colors";
import PleaseLogin from "../../../components/PleaseLogin";
import AllVideos from "../../../components/Profile/AllVideos";
import CollectedVideos from "../../../components/Profile/CollectedVideos";
import MirroredVideos from "../../../components/Profile/MirroredVideos";
import { UnPinSheet } from "../../../components/Profile/PinnedPublication";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import { useBgColorStore } from "../../../store/BgColorStore";
import { useGuestStore } from "../../../store/GuestStore";
import { useProfile } from "../../../store/Store";
import CommonStyles from "../../../styles";
import { RootTabScreenProps } from "../../../types/navigation/types";
import getIPFSLink from "../../../utils/getIPFSLink";
import getImageProxyURL from "../../../utils/getImageProxyURL";
import getRawurl from "../../../utils/getRawUrl";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const sheetRef = React.useRef<BottomSheetMethods>(null);
  const { setAvatarColors } = useBgColorStore();

  const userStore = useProfile();
  const { currentProfile } = useProfile();
  const { isGuest } = useGuestStore();

  React.useEffect(() => {
    const coverURL = getImageProxyURL({
      formattedLink: getIPFSLink(getRawurl(userStore.currentProfile?.picture)),
    });

    getColors(coverURL, {
      fallback: "#000000",
      cache: true,
      key: coverURL,
      quality: "lowest",
      pixelSpacing: 500,
    }).then((colors) => {
      console.log(colors);
      switch (colors.platform) {
        case "android":
          setAvatarColors(colors.average);
          break;
        case "ios":
          setAvatarColors(colors.primary);
          break;
        default:
          setAvatarColors("black");
      }
    });

    return () => {
      setAvatarColors(null);
    };
  }, []);

  if (isGuest) return <PleaseLogin />;

  return (
    <>
      <SafeAreaView style={CommonStyles.screenContainer}>
        <StatusBar style={"auto"} />
        <Tabs>
          <Tab.Screen
            name="Home"
            children={() => <ProfileHeader />}
          />
          <Tab.Screen name="All Videos" children={() => <AllVideos />} />
          <Tab.Screen
            name="Mirror Videos"
            children={() => <MirroredVideos />}
          />
          <Tab.Screen
            name="Collected Videos"
            children={() => <CollectedVideos />}
          />
        </Tabs>
      </SafeAreaView>
      <UnPinSheet sheetRef={sheetRef} />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ProfileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft: 8,
    marginTop: "-20%",
    zIndex: 12,
  },
  editButtonContainer: {
    justifyContent: "flex-end",
    marginRight: 16,
    top: 0,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  verifiedContainer: {
    backgroundColor: "transparent",
    height: "auto",
    width: "auto",
    padding: 1,
    borderRadius: 8,
    marginTop: 8,
    marginHorizontal: 4,
  },
});