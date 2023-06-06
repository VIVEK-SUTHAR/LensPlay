import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import ProfileHeader from "components/Profile/ProfileHeader";
import Tabs, { Tab } from "components/UI/Tabs";
import StorageKeys from "constants/Storage";
import { RootTabScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { getColors } from "react-native-image-colors";
import { useGuestStore } from "store/GuestStore";
import { useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import getIPFSLink from "utils/getIPFSLink";
import Logger from "utils/logger";
import getPubCoverImage from "utils/watchlater/getPubCoverImage";
import getWatchLaters from "utils/watchlater/getWatchLaters";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { allWatchLaters, setAllWatchLaters, setCover, setColor } = useWatchLater();
	if (isGuest) return <PleaseLogin />;

	async function handleCover(coverURL: string) {
		setCover(coverURL);
		getColors(coverURL, {
			fallback: "#000000",
			cache: true,
			key: coverURL,
			quality: "lowest",
			pixelSpacing: 500,
		})
			.then((colors) => {
				switch (colors.platform) {
					case "android":
						setColor(colors?.average);
						break;
					case "ios":
						setColor(colors?.detail);
						break;
					default:
						setColor("#7A52B5");
				}
			})
			.catch((error) => {
				setColor("#7A52B5");
				Logger.Error("Failed to fetch image for geting dominient color", error);
			});
	}

	async function getWatchLaterData() {
		// if (!allWatchLaters) {
		// 	Logger.Warn("Not null returning")
		// }
		// await AsyncStorage.removeItem("@watchLater");
		// return;
		const watchLater = await AsyncStorage.getItem(StorageKeys.WatchLaters);
		if (!watchLater) {
			Logger.Log("No watch laters in local storage");
			const watchLaterData = await getWatchLaters(currentProfile?.id);
			if (watchLaterData.length > 0) {
				await AsyncStorage.setItem(StorageKeys.WatchLaters, JSON.stringify(watchLaterData));
				fetchAndStoreWatchLaters(watchLaterData);
			}
		} else {
			Logger.Success("From Local Storage");
			const localPubIds = JSON.parse(watchLater);
			Logger.Log("Local Pubs", localPubIds);
			fetchAndStoreWatchLaters(localPubIds);
		}
	}

	const fetchAndStoreWatchLaters = async (pubIds: string[]) => {
		if (!allWatchLaters) {
			setAllWatchLaters(pubIds);
		}
		Logger.Log("Added to Store");
		const coverURL = await getPubCoverImage(pubIds[0]);
		if (coverURL) {
			handleCover(getIPFSLink(coverURL));
		}
	};

	React.useEffect(() => {
		getWatchLaterData();
	}, [setAllWatchLaters]);

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
