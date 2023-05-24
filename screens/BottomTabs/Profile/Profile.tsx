import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import AllVideos from "../../../components/Profile/AllVideos";
import CollectedVideos from "../../../components/Profile/CollectedVideos";
import MirroredVideos from "../../../components/Profile/MirroredVideos";
import { UnPinSheet } from "../../../components/Profile/PinnedPublication";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import { useProfile } from "../../../store/Store";
import CommonStyles from "../../../styles";
import { RootTabScreenProps } from "../../../types/navigation/types";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { currentProfile } = useProfile();
	return (
		<>
			<SafeAreaView style={[CommonStyles.screenContainer]}>
				<StatusBar style={"auto"} />
				<ProfileHeader profileId={currentProfile?.id} />
				<Tabs>
					<Tab.Screen name="All Videos" children={() => <AllVideos />} />
					<Tab.Screen name="Mirror Videos" children={() => <MirroredVideos />} />
					<Tab.Screen name="Collected Videos" children={() => <CollectedVideos />} />
				</Tabs>
				<UnPinSheet sheetRef={sheetRef} />
			</SafeAreaView>
		</>
	);
};

export default ProfileScreen;
