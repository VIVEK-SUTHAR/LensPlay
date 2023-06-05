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
import { getColors } from "react-native-image-colors";
import { useGuestStore } from "store/GuestStore";
import { useProfile } from "store/Store";
import useWatchLater, { type WatchLater } from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import getIPFSLink from "utils/getIPFSLink";
import getImageProxyURL from "utils/getImageProxyURL";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import getWatchLaters from "utils/watchlater/getWatchLaters";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { setAllWatchLaters, setCover, setColor } = useWatchLater();
	if (isGuest) return <PleaseLogin />;

	const [getAllPublications] = useAllPublicationsLazyQuery({
		onError(error) {
			Logger.Error("Error in fetching pubs", error);
		},
	});

	async function handleCover(coverURL: string) {
		getColors("https://ik.imagekit.io/4uh8nmwsx/fotor-ai-2023060417146.jpg?f-webp", {
			quality: "highest",
		}).then((colors) => {
			switch (colors.platform) {
				case "android":
					Logger.Success("Got ik coclor", colors.average);

					// setColor(colors?.average);
					break;
				case "ios":
					setColor(colors?.detail);
					break;
				default:
					setColor("black");
			}
		});
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
		// await AsyncStorage.removeItem("@watchLater");
		// return;
		const watchLater = await AsyncStorage.getItem("@watchLaters");
		if (!watchLater) {
			Logger.Log("Not watch later");
			const watchLaterData = await getWatchLaters(currentProfile?.id);
			if (watchLaterData.length > 0) {
				Logger.Success("Got", watchLaterData);
				await AsyncStorage.setItem("@watchLaters", JSON.stringify(watchLaterData));
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
		Logger.Log("Local Pubs for fetcging", pubIds);
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
		const coverURL = getImageProxyURL({
			formattedLink: getIPFSLink(getRawurl(pubs?.data?.publications?.items[0]?.metadata?.cover)),
		});
		if (coverURL) {
			handleCover(coverURL);
		}
		Logger.Log("Added to Store");
	};

	React.useEffect(() => {
		getWatchLaterData();
	}, [navigation]);

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 	}, [navigation])
	// );

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
