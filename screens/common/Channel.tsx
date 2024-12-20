import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import PleaseLogin from "components/PleaseLogin";
import AllVideos from "components/Profile/AllVideos";
import CollectedVideos from "components/Profile/CollectedVideos";
import MirroredVideos from "components/Profile/MirroredVideos";
import { UnPinSheet } from "components/Profile/PinnedPublication";
import ProfileHeader from "components/Profile/ProfileHeader";
import ProfileSkeleton from "components/UI/ProfileSkeleton";
import Tabs, { Tab } from "components/UI/Tabs";
import ErrorMesasge from "components/common/ErrorMesasge";
import { useProfileQuery } from "customTypes/generated";
import type { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile } from "store/Store";
import CommonStyles from "styles/index";
import formatHandle from "utils/formatHandle";
import Logger from "utils/logger";

const ProfileScreen: React.FC<RootStackScreenProps<"Channel">> = ({ navigation, route }) => {
	const [isReadyToRender, setIsReadyToRender] = React.useState(false);

	const { isGuest } = useGuestStore();

	const sheetRef = React.useRef<BottomSheetMethods>(null);
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const [refreshing, setRefreshing] = React.useState(false);

	React.useEffect(() => {
		const delay = setTimeout(() => {
			setIsReadyToRender(true);
		}, 0);
		return () => clearTimeout(delay);
	}, []);
	Logger.Warn("Channel Handle ",route.params.handle)
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.name || formatHandle(route?.params?.handle),
		});
	}, [navigation, route]);

	const {
		data: Profile,
		loading,
		error,
		refetch,
	} = useProfileQuery({
		variables: {
			request: {
				forHandle:
					route?.params?.handle === "lensprotocol.lens" ? "lensprotocol" : route?.params?.handle,
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});
	const channelId = Profile?.profile?.id;

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await refetch({
			request: {
				forHandle: route?.params?.handle,
			},
		}).catch((err) => {
			Logger.Error("Error in Refreshing error", err);
		});

		setRefreshing(false);
	}, [route?.params?.handle]);

	if (isGuest) return <PleaseLogin />;
	if (!isReadyToRender) return <ProfileSkeleton />;
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

	if (!Profile?.profile)
		return (
			<ErrorMesasge message="Sorry, Profile doesn't exist" withImage={true} withButton={false} />
		);
	Logger.Success(JSON.stringify(Profile));
	return (
		<>
			<SafeAreaView style={CommonStyles.screenContainer}>
				<StatusBar style={"auto"} />
				<Tabs>
					<Tab.Screen
						name="Home"
						children={() => <ProfileHeader Profile={Profile} onRefresh={onRefresh} />}
					/>
					<Tab.Screen
						name="All Videos"
						children={() => <AllVideos profileId={Profile?.profile?.id} />}
					/>
					{/* <Tab.Screen
						name="Mirror Videos"
						children={() => <MirroredVideos channelId={Profile?.profile?.id} />}
					/>
					<Tab.Screen
						name="Collected Videos"
						children={() => <CollectedVideos ethAddress={Profile?.profile?.ownedBy} />}
					/> */}
				</Tabs>
			</SafeAreaView>
			<UnPinSheet sheetRef={sheetRef} />
		</>
	);
};

export default ProfileScreen;
