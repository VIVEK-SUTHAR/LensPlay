import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import ErrorMesasge from "components/common/ErrorMesasge";
import MyVideoCard, { type actionListType } from "components/common/MyVideoCard";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";
import Skeleton from "components/common/Skeleton";
import Icon from "components/Icon";
import { NoVideosFound } from "components/Profile/AllVideos";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import {
	useAllPublicationsQuery,
	type Mirror,
	type Post,
	type Scalars,
} from "customTypes/generated";
import useAddWatchLater from "hooks/useAddToWatchLater";
import React from "react";
import { Button, FlatList, Share, View } from "react-native";
import { useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import Logger from "utils/logger";

const WatchLaterList = () => {
	const [pubId, setPubId] = React.useState("");
	const { allWatchLaters, setAllWatchLaters } = useWatchLater();
	const { currentProfile } = useProfile();
	const WatchLaterSheetRef = React.useRef<BottomSheetMethods>(null);
	Logger.Log("All pubs from Store", allWatchLaters);
	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);

	const {
		data: Publications,
		loading,
		error,
		refetch,
	} = useAllPublicationsQuery({
		variables: {
			request: {
				publicationIds: allWatchLaters,
			},
			reactionRequest: {
				profileId: currentProfile?.id,
			},
		},
	});
	React.useEffect(() => {
		refetch();
	}, [allWatchLaters]);

	const watchLaterList = Publications?.publications?.items;

	if (loading) {
		return (
			<Skeleton number={5}>
				<ProfileVideoCardSkeleton />
			</Skeleton>
		);
	}
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			{/* <Button
				title="Delete local"
				onPress={() => {
					AsyncStorage.removeItem("@watchLaters").then(() => {
						Logger.Success("Local deleted");
					});
				}}
			/> */}
			<FlashList
				data={watchLaterList}
				ListEmptyComponent={NoVideosFound}
				removeClippedSubviews={true}
				estimatedItemSize={110}
				onEndReachedThreshold={0.7}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }: { item: Post | Mirror }) => (
					<MyVideoCard
						publication={item}
						id={item.id}
						sheetRef={WatchLaterSheetRef}
						setPubId={handlePubId}
					/>
				)}
			/>
			<WatchLaterSheet sheetRef={WatchLaterSheetRef} pubId={pubId} />
		</View>
	);
};

export const WatchLaterSheet = ({
	sheetRef,
	pubId,
}: {
	sheetRef: React.RefObject<BottomSheetMethods>;
	pubId: Scalars["InternalPublicationId"];
}) => {
	const { remove } = useAddWatchLater();
	const actionList: actionListType[] = [
		{
			name: "Remove",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				remove(pubId);
			},
		},
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
	];

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[150]}
			enablePanDownToClose={true}
			enableOverDrag={true}
			bottomInset={32}
			style={CommonStyles.mx_8}
			detached={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			animationConfigs={{
				damping: 15,
			}}
		>
			<FlatList
				data={actionList}
				renderItem={({ item }) => {
					return (
						<Ripple
							onTap={() => {
								item.onPress(pubId);
								sheetRef?.current?.close();
							}}
						>
							<View
								style={{
									width: "100%",
									height: "auto",
									paddingVertical: 16,
									paddingHorizontal: 16,
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Icon name={item.icon} color={"white"} />
								<StyledText
									title={item.name}
									style={{
										fontSize: 16,
										marginHorizontal: 8,
										color: "white",
									}}
								/>
							</View>
						</Ripple>
					);
				}}
			/>
		</Sheet>
	);
};

export default WatchLaterList;
