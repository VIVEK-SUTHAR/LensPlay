import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import MyVideoCard, { actionListType, SheetProps } from "components/common/MyVideoCard";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";
import Skeleton from "components/common/Skeleton";
import Icon from "components/Icon";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import DeleteVideo from "components/VIdeo/DeleteVideo";
import PlaylistSheet from "components/Playlist/PlaylistSheet";
import { black } from "constants/Colors";
import { LENSPLAY_SITE, SOURCES } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import {
	Attribute,
	Mirror,
	Post,
	Publication,
	PublicationMainFocus,
	PublicationMetadataDisplayTypes,
	PublicationsQueryRequest,
	PublicationTypes,
	Scalars,
	useCreateSetProfileMetadataViaDispatcherMutation,
	useProfilePostsQuery,
} from "customTypes/generated";
import type { ProfileMetaDataV1nput } from "customTypes/index";
import useAddWatchLater from "hooks/useAddToWatchLater";
import React from "react";
import { ActivityIndicator, Share, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import usePinStore from "store/pinStore";
import { useAuthStore, useProfile, useThemeStore, useToast } from "store/Store";
import getRawurl from "utils/getRawUrl";
import TrackAction from "utils/Track";
import uploadToArweave from "utils/uploadToArweave";
import { v4 as uuidV4 } from "uuid";

type AllVideosProps = {
	profileId?: string;
	ethAddress?: string;
};

const AllVideos: React.FC<AllVideosProps> = ({ ethAddress, profileId }) => {
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { currentProfile } = useProfile();
	const AllVideoSheetRef = React.useRef<BottomSheetMethods>(null);
	const [publication, setPublication] = React.useState<Post | Mirror | null>(null);
	const [refreshing, setRefreshing] = React.useState<boolean>(false);

	const handlePublication = React.useCallback((publication: Post | Mirror) => {
		setPublication(publication);
	}, []);

	const QueryRequest: PublicationsQueryRequest = {
		profileId: profileId ? profileId : currentProfile?.id,
		publicationTypes: [PublicationTypes.Post],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: SOURCES,
		limit: 10,
	};

	const { data, error, loading, refetch, fetchMore } = useProfilePostsQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: currentProfile?.id,
			},
			channelId: currentProfile?.id,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const AllVideos = data?.publications?.items;

	const pageInfo = data?.publications?.pageInfo;

	const keyExtractor = (item: Post) => item.id;

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
				) : (
					<></>
				)}
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

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
				paddingVertical: 8,
			}}
		>
			{loading ? (
				<View style={{ paddingHorizontal: 8, backgroundColor: "black" }}>
					<Skeleton number={10}>
						<ProfileVideoCardSkeleton />
					</Skeleton>
				</View>
			) : (
				<FlashList
					data={AllVideos as Post[]}
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
							sheetRef={AllVideoSheetRef}
							setPublication={handlePublication}
						/>
					)}
				/>
			)}
			<AllVideoSheet sheetRef={AllVideoSheetRef} publication={publication} profileId={profileId} />
		</View>
	);
};



export const AllVideoSheet = ({ sheetRef, publication, profileId }: SheetProps) => {
	const toast = useToast();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { add, remove } = useAddWatchLater();

	const deleteRef = React.useRef<BottomSheetMethods>(null);
	const PlaylistSheetRef = React.useRef<BottomSheetMethods>(null);

	const pinStore = usePinStore();
	const [createSetProfileMetadataViaDispatcherMutation] =
		useCreateSetProfileMetadataViaDispatcherMutation({
			onCompleted: () => {
				toast.success("Video pinned successfully !");
				void TrackAction(PUBLICATION.PIN_PUBLICATION);
			},
			onError: () => {
				toast.error("Some error occured please try again");
			},
		});

	const pinPublication = async () => {
		const attr = currentProfile?.attributes;
		let attrs;
		const isAlreadyPinned = attr?.find(
			(attr) => attr.traitType === "pinnedPublicationId" || attr.key === "pinnedPublicationId"
		);
		if (!isAlreadyPinned) {
			const newAttribute = {
				__typename: "Attribute",
				displayType: PublicationMetadataDisplayTypes.String,
				traitType: "pinnedPublicationId",
			key: "pinnedPublicationId",
				value: publication?.id,
			};
			attrs = [...attr!, newAttribute];
		}
		if (isAlreadyPinned) {
			isAlreadyPinned.value = publication?.id;
		}

		const newMetaData: ProfileMetaDataV1nput = {
			version: "1.0.0",
			metadata_id: uuidV4(),
			name: currentProfile?.name || "",
			bio: currentProfile?.bio || "",
			cover_picture: getRawurl(currentProfile?.coverPicture),
			attributes: isAlreadyPinned ? attr : (attrs as Attribute[]),
		};
		pinStore.setHasPinned(true);
		pinStore.setPinnedPubId(publication?.id);
		const hash = await uploadToArweave(newMetaData);
		createSetProfileMetadataViaDispatcherMutation({
			variables: {
				request: {
					metadata: `ar://${hash}`,
					profileId: currentProfile?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
					"origin": LENSPLAY_SITE,
				},
			},
		});
	};

	const actionList: actionListType[] = [
		{
			name: "Pin this video to your channel",
			icon: "pin",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				pinPublication();
			},
		},
		{
			name: "Add to Playlist",
			icon: "create",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				PlaylistSheetRef.current?.snapToIndex(0);
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
			name: publication?.bookmarked ? "Remove from watch later" : "Add to watch later",
			icon: publication?.bookmarked ? "delete" : "clock",
			onPress: (publication) => {
				if (publication?.bookmarked) {
					remove(publication);
				} else {
					add(publication);
				}
			},
		},
	];

	return (
		<>
			<Sheet
				ref={sheetRef}
				snapPoints={[profileId ? 150 : 270]}
				enablePanDownToClose={true}
				enableOverDrag={true}
				bottomInset={32}
				style={{
					marginHorizontal: 8,
				}}
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
									item.onPress(publication);
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
											marginHorizontal: 12,
											color: "white",
										}}
									/>
								</View>
							</Ripple>
						);
					}}
				/>
			</Sheet>
			<DeleteVideo sheetRef={deleteRef} publication={publication} />
			<PlaylistSheet sheetRef={PlaylistSheetRef} publication={publication} />
		</>
	);
};

const _NoVideosFound = () => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 32,
				paddingHorizontal: 16,
			}}
		>
			<StyledText
				title={"No videos found"}
				style={{
					color: black[100],
					fontSize: 16,
					fontWeight: "500",
				}}
			/>
		</View>
	);
};

export const NoVideosFound = React.memo(_NoVideosFound);

export default React.memo(AllVideos);
