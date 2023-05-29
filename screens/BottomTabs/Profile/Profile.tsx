import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import ProfileHeader from "components/Profile/ProfileHeader";
import Tabs, { Tab } from "components/UI/Tabs";
import { RootTabScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useGuestStore } from "store/GuestStore";
import CommonStyles from "styles/index";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();

	if (isGuest) return <PleaseLogin />;

	return (
		<>
			<SafeAreaView style={CommonStyles.screenContainer}>
				<StatusBar style={"auto"} />
				<Tabs>
					<Tab.Screen name="Home" children={() => <ProfileHeader />} />
					<Tab.Screen name="All Videos" children={() => <AllVideos />} />
					<Tab.Screen name="Mirror Videos" children={() => <MirroredVideos />} />
					<Tab.Screen name="Collected Videos" children={() => <CollectedVideos />} />
				</Tabs>
			</SafeAreaView>
			<UnPinSheet sheetRef={sheetRef} />
		</>
	);
};

export default ProfileScreen;
