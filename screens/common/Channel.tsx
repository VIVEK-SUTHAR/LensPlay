import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import Playlist from "components/Profile/Playlist";
import ProfileHeader from "components/Profile/ProfileHeader";
import ProfileSkeleton from "components/UI/ProfileSkeleton";
import Tabs, { Tab } from "components/UI/Tabs";
import type { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useGuestStore } from "store/GuestStore";
import CommonStyles from "styles/index";
import formatHandle from "utils/formatHandle";

const ProfileScreen: React.FC<RootStackScreenProps<"Channel">> = ({ navigation, route }) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState(false);

	const { isGuest } = useGuestStore();

	const sheetRef = React.useRef<BottomSheetMethods>(null);

	React.useEffect(() => {
		const delay = setTimeout(() => {
			setIsReadyToRender(true);
		}, 0);
		return () => clearTimeout(delay);
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.name || formatHandle(route?.params?.handle),
		});
	}, [navigation,route]);

	const channelId = React.useMemo(() => route.params.profileId, [navigation,route]);
	const ethAddress = React.useMemo(() => route.params.ethAddress, [navigation,route]);

	if (isGuest) return <PleaseLogin />;
	if (!isReadyToRender) return <ProfileSkeleton />;
	return (
		<>
			<SafeAreaView style={CommonStyles.screenContainer}>
				<StatusBar style={"auto"} />
				<Tabs>
					<Tab.Screen
						name="Home"
						children={() => <ProfileHeader profileId={channelId} ethAddress={ethAddress} />}
					/>
					<Tab.Screen name="All Videos" children={() => <AllVideos profileId={channelId} />} />
					<Tab.Screen
						name="Playlist"
						children={() => <Playlist profileId={channelId} />}
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
