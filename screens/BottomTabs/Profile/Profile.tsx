import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
// import Playlist from "components/Profile/Playlist";
import ProfileHeader from "components/Profile/ProfileHeader";
import ProfileSkeleton from "components/UI/ProfileSkeleton";
import Tabs, { Tab } from "components/UI/Tabs";
import ErrorMesasge from "components/common/ErrorMesasge";
import { useProfileQuery } from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile } from "store/Store";
import CommonStyles from "styles/index";
import Logger from "utils/logger";

const ProfileScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { isGuest } = useGuestStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const [refreshing, setRefreshing] = React.useState(false);

	const {
		data: Profile,
		loading,
		error,
		refetch,
	} = useProfileQuery({
		variables: {
			request: {
				forProfileId:"0x97fd"
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});
	console.log(Profile?.profile?.stats);
	
		

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await refetch({
			request: {
				forHandle: currentProfile?.handle,
			},
		}).catch((err) => {
			Logger.Error("Error in Refreshing error", err);
		});
		setRefreshing(false);
		Logger.Warn("hellloo", Profile?.profile?.id);
	}, []);

	if (isGuest) return <PleaseLogin />;

	return (
		<>
			<SafeAreaView style={CommonStyles.screenContainer}>
				<StatusBar style={"auto"} />
				<Tabs>
					<Tab.Screen
						name="Home"
						children={() => {
							if (loading) return <ProfileSkeleton />;
							if (error)
								return (
									<ErrorMesasge
										message="Something went wrong"
										withImage={true}
										retryMethod={onRefresh}
										withButton={true}
									/>
								);
							if (Profile) {
								return <ProfileHeader Profile={Profile} onRefresh={onRefresh} />;
							}
						}}
					/>
					<Tab.Screen
						name="All Videos"
						children={() => <AllVideos profileId={Profile?.profile?.id} />}
					/>
					{/* <Tab.Screen name="Playlist" children={() => <Playlist />} /> */}
					{/* <Tab.Screen
						name="Mirror Videos"
						children={() => <MirroredVideos channelId={Profile?.profile?.id} />}
					/>
					<Tab.Screen
						name="Collected Videos"
						children={() => <CollectedVideos ethAddress={Profile?.profile?.ownedBy?.address} />}
					/> */}
				</Tabs>
			</SafeAreaView>
			<UnPinSheet sheetRef={sheetRef} />
		</>
	);
};

export default ProfileScreen;
