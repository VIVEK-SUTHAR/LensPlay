import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import ProfileHeader from "components/Profile/ProfileHeader";
import Tabs, { Tab } from "components/UI/Tabs";
import { PublicationMainFocus, useAllPublicationsLazyQuery } from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useProfile } from "store/Store";
import useWatchLater, { type WatchLater } from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import Logger from "utils/logger";
import getWatchLaters from "utils/watchlater/getWatchLaters";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { setAllWatchLaters } = useWatchLater();
	if (isGuest) return <PleaseLogin />;

	const [getAllPublications] = useAllPublicationsLazyQuery();

	async function getWatchLaterData() {
		// await AsyncStorage.removeItem("@watchLater");
		// return;
		const watchLater = await AsyncStorage.getItem("@watchLaters");
		if (!watchLater) {
			Logger.Log("Not watch later");
			const watchLaterData = await getWatchLaters(currentProfile?.id);
			if (watchLaterData.length > 0) {
				Logger.Success('Got',watchLaterData)
				await AsyncStorage.setItem("@watchLaters", JSON.stringify(watchLaterData));
				fetchAndStoreWatchLaters(watchLaterData)
			}
		} else {
			Logger.Log('From Local Storage')
			const localPubIds = JSON.parse(watchLater).watchLater;
			fetchAndStoreWatchLaters(localPubIds);
		}
	}
	const fetchAndStoreWatchLaters = async (pubIds: string[]) => {
		const pubs = await getAllPublications({
			variables: {
				request: {
					publicationIds: pubIds,
					metadata: {
						mainContentFocus: [PublicationMainFocus.Video],
					},
				},
				reactionRequest: {
					profileId: currentProfile?.id,
				},
			},
		});
		setAllWatchLaters(pubs?.data?.publications?.items as WatchLater[]);
	};

	React.useEffect(() => {
		getWatchLaterData();
	}, []);

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
