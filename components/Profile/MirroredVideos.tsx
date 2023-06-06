import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import ErrorMesasge from "components/common/ErrorMesasge";
import MyVideoCard, { actionListType, SheetProps } from "components/common/MyVideoCard";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";
import Skeleton from "components/common/Skeleton";
import Icon from "components/Icon";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import DeleteVideo from "components/VIdeo/DeleteVideo";
import { black } from "constants/Colors";
import { SOURCES } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import {
	Mirror,
	PublicationMainFocus,
	PublicationsQueryRequest,
	PublicationTypes,
	Scalars,
	useAllPublicationsLazyQuery,
	useProfileMirrorsQuery,
} from "customTypes/generated";
import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, Share, View } from "react-native";
import { useAuthStore, useProfile, useThemeStore, useToast } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import Logger from "utils/logger";
import TrackAction from "utils/Track";
import addToWatchLater from "utils/watchlater/addToWatchLater";
import { NoVideosFound } from "./AllVideos";

type MirroredVideosProps = {
	channelId?: string;
};

const keyExtractor = (item: Mirror) => item.id;

const MirroredVideos: React.FC<MirroredVideosProps> = ({ channelId }) => {
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { currentProfile } = useProfile();
	const MirroredVideoSheetRef = React.useRef<BottomSheetMethods>(null);
	const [pubId, setPubId] = React.useState("");
	const [refreshing, setRefreshing] = React.useState<boolean>(false);

	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);

	const QueryRequest: PublicationsQueryRequest = {
		profileId: channelId ? channelId : currentProfile?.id,
		publicationTypes: [PublicationTypes.Mirror],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: SOURCES,
		limit: 10,
	};

	const { data, error, loading, refetch, fetchMore } = useProfileMirrorsQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const AllMirrorVideos = data?.publications?.items;
	const pageInfo = data?.publications?.pageInfo;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		try {
			refetch({
				request: QueryRequest,
			})
				.then(() => {
					setRefreshing(false);
				})
				.catch((err) => {});
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	}, []);

	const _MoreLoader = () => {
		return (
			<>
				{pageInfo?.next ? (
					<View
						style={{
							height: 200,
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"large"} color={PRIMARY} />
					</View>
				) : null}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	const onEndCallBack = React.useCallback(() => {
		if (!pageInfo?.next) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					...QueryRequest,
					cursor: pageInfo?.next,
				},
			},
		}).catch((err) => {});
	}, [pageInfo?.next]);

	if (loading)
		return (
			<View style={{ paddingHorizontal: 8, backgroundColor: "black" }}>
				<Skeleton number={10}>
					<ProfileVideoCardSkeleton />
				</Skeleton>
			</View>
		);
	if (error) {
		return (
			<ErrorMesasge
				message="Looks like sommething went wrong"
				retryMethod={onRefresh}
				withButton={true}
				withImage
			/>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
				paddingVertical: 8,
			}}
		>
			<FlashList
				data={AllMirrorVideos as Mirror[]}
				keyExtractor={keyExtractor}
				ListEmptyComponent={NoVideosFound}
				removeClippedSubviews={true}
				estimatedItemSize={110}
				refreshControl={_RefreshControl}
				ListFooterComponent={<MoreLoader />}
				onEndReachedThreshold={0.7}
				onEndReached={onEndCallBack}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<MyVideoCard
						publication={item}
						id={item.id}
						sheetRef={MirroredVideoSheetRef}
						setPubId={handlePubId}
					/>
				)}
			/>
			<MirroredVideoSheet sheetRef={MirroredVideoSheetRef} pubId={pubId} profileId={channelId} />
		</View>
	);
};

export const MirroredVideoSheet = ({ sheetRef, pubId, profileId }: SheetProps) => {
	const deleteRef = React.useRef<BottomSheetMethods>(null);
	const toast = useToast();
	const [getOnePub] = useAllPublicationsLazyQuery();
	const { setAllWatchLaters } = useWatchLater();
	const { currentProfile } = useProfile();
	const actionList: actionListType[] = [
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				void Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
		{
			name: "Delete",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				sheetRef.current?.close();
				deleteRef.current?.snapToIndex(0);
			},
		},
	];

	const channelActionList: actionListType[] = [
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
		{
			name: "Add To Watch Later",
			icon: "images",
			onPress: async (pubid: Scalars["InternalPublicationId"]) => {
				const watchLater = await AsyncStorage.getItem("@watchLaters");
				if (watchLater) {
					let parsed = JSON.parse(watchLater);
					parsed.push(pubid);
					Logger.Warn("Added to Local", parsed);
					await AsyncStorage.setItem("@watchLaters", JSON.stringify(parsed));
					toast.success("Added to watch later !");
					addToWatchLater(currentProfile?.id, pubId).catch(() => {
						//Retry again here
					});
					setAllWatchLaters(parsed);
					TrackAction(PUBLICATION.ADD_WATCH_LATER);
				} else {
					const pubIds = [pubId];
					await AsyncStorage.setItem("@watchLaters", JSON.stringify(pubIds));
					toast.success("Added to watch later !");
					setAllWatchLaters(pubIds);
					addToWatchLater(currentProfile?.id, pubId).catch(() => {
						//Retry again here
					});
					TrackAction(PUBLICATION.ADD_WATCH_LATER);
				}
			},
		},
	];

	return (
		<>
			<Sheet
				ref={sheetRef}
				snapPoints={[profileId ? 150 : 150]}
				enablePanDownToClose={true}
				enableOverDrag={true}
				bottomInset={32}
				style={CommonStyles.mx_8}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				detached={true}
			>
				<FlatList
					data={profileId ? channelActionList : actionList}
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
			<DeleteVideo sheetRef={deleteRef} pubId={pubId} />
		</>
	);
};

export default React.memo(MirroredVideos);
