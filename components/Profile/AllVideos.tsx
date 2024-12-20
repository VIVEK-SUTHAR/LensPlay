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
// import PlaylistSheet from "components/VIdeo/PlaylistSheet";
import { black } from "constants/Colors";
import { LENSPLAY_SITE, SOURCES } from "constants/index";
import { PUBLICATION } from "constants/tracking";
import {
	LimitType,
	MarketplaceMetadataAttributeDisplayType,
	Mirror,
	Post,
	PublicationMetadataMainFocusType,
	PublicationsRequest,
	PublicationType,
	Scalars,
	usePublicationsQuery,
	useSetProfileMetadataMutation,
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

	const QueryRequest: PublicationsRequest = {
		limit: LimitType.Ten,
		where: {
			from: [profileId],
			metadata: {
				mainContentFocus: [PublicationMetadataMainFocusType.Video],
				publishedOn: SOURCES,
			},
			publicationTypes: [PublicationType.Post],
		},
	};

	const { data, error, loading, refetch, fetchMore } = usePublicationsQuery({
		variables: {
			request: QueryRequest,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});
	const AllVideos = data?.publications?.items as Post[];

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
	}, [profileId]);

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
	const isChannel = currentProfile?.id !== profileId;

	const deleteRef = React.useRef<BottomSheetMethods>(null);
	// const PlaylistSheetRef = React.useRef<BottomSheetMethods>(null);

	const pinStore = usePinStore();
	const [SetProfileMetadataMutation] = useSetProfileMetadataMutation({
		onCompleted: () => {
			toast.success("Video pinned successfully");
			void TrackAction(PUBLICATION.PIN_PUBLICATION);
		},
		onError: () => {
			toast.error("Some error occured please try again");
		},
	});

	const pinPublication = async () => {
		const attr = currentProfile?.metadata?.attributes;
		let attrs;
		const isAlreadyPinned = attr?.find((attr) => attr.key === "pinnedPublicationId");
		if (!isAlreadyPinned) {
			const newAttribute = {
				__typename: "Attribute",
				displayType: MarketplaceMetadataAttributeDisplayType.String,
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
			name: currentProfile?.metadata?.displayName || "",
			bio: currentProfile?.metadata?.bio || "",
			cover_picture: getRawurl(currentProfile?.metadata?.coverPicture),
			attributes: isAlreadyPinned ? attr : (attrs as Attribute[]),
		};
		pinStore.setHasPinned(true);
		pinStore.setPinnedPubId(publication?.id);
		const hash = await uploadToArweave(newMetaData);
		SetProfileMetadataMutation({
			variables: {
				request: {
					metadataURI: `ar://${hash}`,
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
			onPress: (pubid: Scalars["PublicationId"]) => {
				pinPublication();
			},
		},
		// {
		// 	name: "Add to Playlist",
		// 	icon: "create",
		// 	onPress: (pubid: Scalars["InternalPublicationId"]) => {
		// 		PlaylistSheetRef.current?.snapToIndex(0);
		// 	},
		// },
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["PublicationId"]) => {
				Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
		{
			name: "Delete",
			icon: "delete",
			onPress: (pubid: Scalars["PublicationId"]) => {
				sheetRef.current?.close();
				deleteRef.current?.snapToIndex(0);
			},
		},
	];

	const channelActionList: actionListType[] = [
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["PublicationId"]) => {
				Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
		{
			name:
				publication?.__typename === "Post"
					? publication?.operations?.hasBookmarked
						? "Remove from watch later"
						: "Add to watch later"
					: "clock",
			icon:
				publication?.__typename === "Post"
					? publication?.operations?.hasBookmarked
						? "delete"
						: "clock"
					: "clock",
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
				snapPoints={[isChannel ? 150 : 200]}
				enablePanDownToClose={true}
				enableOverDrag={true}
				bottomInset={16}
				style={{
					marginHorizontal: 8,
				}}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				detached={true}
			>
				<FlatList
					data={isChannel ? channelActionList : actionList}
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
			{/* <PlaylistSheet sheetRef={PlaylistSheetRef} publication={publication} /> */}
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
