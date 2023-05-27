import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
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
import getImageProxyURL from "../../../utils/getImageProxyURL";
import getIPFSLink from "../../../utils/getIPFSLink";
import getRawurl from "../../../utils/getRawUrl";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
  const sheetRef = React.useRef<BottomSheetMethods>(null);
  const { setAvatarColors } = useBgColorStore();

  const userStore = useProfile();
  const { isGuest } = useGuestStore();

  if (isGuest) return <PleaseLogin />;

  return (
    <>
      <SafeAreaView style={CommonStyles.screenContainer}>
        <StatusBar style={"auto"} />
        <Tabs>
          <Tab.Screen name="Home" children={() => <ProfileHeader />} />
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
