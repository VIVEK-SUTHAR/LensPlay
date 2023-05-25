import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  ActivityIndicator,
  InteractionManager,
  SafeAreaView,
} from "react-native";
import { getColors } from "react-native-image-colors";
import PleaseLogin from "../../components/PleaseLogin";
import AllVideos from "../../components/Profile/AllVideos";
import CollectedVideos from "../../components/Profile/CollectedVideos";
import MirroredVideos from "../../components/Profile/MirroredVideos";
import { UnPinSheet } from "../../components/Profile/PinnedPublication";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Tabs, { Tab } from "../../components/UI/Tabs";
import { useBgColorStore } from "../../store/BgColorStore";
import { useGuestStore } from "../../store/GuestStore";
import { useProfile } from "../../store/Store";
import CommonStyles from "../../styles";
import { RootStackScreenProps } from "../../types/navigation/types";
import getImageProxyURL from "../../utils/getImageProxyURL";
import getIPFSLink from "../../utils/getIPFSLink";
import getRawurl from "../../utils/getRawUrl";

const ProfileScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Channel">) => {
  const [isReadyToRender, setIsReadyToRender] = React.useState(false);

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReadyToRender(true);
    });
  }, []);

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

  const channelId = React.useMemo(() => route.params.profileId, [navigation]);
  const ethAddress = React.useMemo(() => route.params.ethAddress, [navigation]);
  

  if (isGuest) return <PleaseLogin />;

  return (
    <>
      {/* {!isReadyToRender && <ActivityIndicator />} */}
      <SafeAreaView style={CommonStyles.screenContainer}>
        <StatusBar style={"auto"} />
        <Tabs>
          <Tab.Screen
            name="Home"
            children={() => <ProfileHeader profileId={channelId} ethAddress={ethAddress} />}
          />
          <Tab.Screen
            name="All Videos"
            children={() => <AllVideos profileId={channelId} />}
          />
          <Tab.Screen
            name="Mirror Videos"
            children={() => <MirroredVideos channelId={channelId} />}
          />
          <Tab.Screen
            name="Collected Videos"
            children={() => <CollectedVideos ethAddress={ethAddress} />}
          />
        </Tabs>
      </SafeAreaView>
      <UnPinSheet sheetRef={sheetRef} />
    </>
  );
};

export default ProfileScreen;
