import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import ProfileHeader from "components/Profile/ProfileHeader";
import Tabs, { Tab } from "components/UI/Tabs";
import { PublicationMainFocus, useProfileBookMarksLazyQuery } from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { getColors } from "react-native-image-colors";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { setCover, setColor, sessionCount } = useWatchLater();

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

	const [getBookMarks, { data, loading }] = useProfileBookMarksLazyQuery({
		variables: {
			req: {
				profileId: currentProfile?.id,
				metadata: {
					mainContentFocus: [PublicationMainFocus.Video],
				},
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	React.useEffect(() => {
		getBookMarks()
			.then((res) => {
				if (res) {
					handleCover(
						getIPFSLink(
							getRawurl(res?.data?.publicationsProfileBookmarks?.items[0]?.metadata?.cover)
						)
					);
				}
			})
			.catch((err) => {
				Logger.Error("[Error while fetching Bookmarks....]", err);
			});
		Logger.Count("EFFECT RAN");
	}, [sessionCount]);

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
