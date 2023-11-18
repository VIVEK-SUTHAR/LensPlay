import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
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
import {
	Mirror,
	Post,
	PrimaryPublication,
	PublicationMetadataMainFocusType,
	PublicationsRequest,
	PublicationType,
	Scalars,
	usePublicationsQuery,
} from "customTypes/generated";
import useAddWatchLater from "hooks/useAddToWatchLater";
import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, Share, View } from "react-native";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import CommonStyles from "styles/index";
import { NoVideosFound } from "./AllVideos";
import Logger from "utils/logger";

type MirroredVideosProps = {
	channelId?: string;
};

const keyExtractor = (item: PrimaryPublication) => item.id;

const MirroredVideos: React.FC<MirroredVideosProps> = ({ channelId }) => {
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { currentProfile } = useProfile();
	const MirroredVideoSheetRef = React.useRef<BottomSheetMethods>(null);
	const [publication, setPublication] = React.useState<Post | Mirror | null>(null);
	const [refreshing, setRefreshing] = React.useState<boolean>(false);

	const handlePublication = React.useCallback((publication: Post | Mirror) => {
		setPublication(publication);
	}, []);
	const QueryRequest: PublicationsRequest = {
		where: {
			publicationTypes: [PublicationType.Mirror],
			from: channelId ? channelId : currentProfile?.id,
			metadata: {
				mainContentFocus: [
					PublicationMetadataMainFocusType.Video,
					PublicationMetadataMainFocusType.ShortVideo,
				],
				publishedOn: [SOURCES],
			},
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
		onError:(e)=>{
			Logger.Error("Errr in Mirror Videos",e)
		}
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
	}, [channelId]);

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
				data={AllMirrorVideos as PrimaryPublication[]}
				keyExtractor={keyExtractor}
				ListEmptyComponent={NoVideosFound}
				removeClippedSubviews={true}
				estimatedItemSize={110}
				refreshControl={_RefreshControl}
				ListFooterComponent={<MoreLoader />}
				onEndReachedThreshold={0.7}
				onEndReached={onEndCallBack}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }: { item: PrimaryPublication }) => (
					<MyVideoCard
						publication={item}
						id={item.id}
						sheetRef={MirroredVideoSheetRef}
						setPublication={handlePublication}
					/>
				)}
			/>
			<MirroredVideoSheet
				sheetRef={MirroredVideoSheetRef}
				publication={publication}
				profileId={channelId}
			/>
		</View>
	);
};

export const MirroredVideoSheet = ({ sheetRef, publication, profileId }: SheetProps) => {
	const { currentProfile } = useProfile();
	const { add, remove } = useAddWatchLater();
	const deleteRef = React.useRef<BottomSheetMethods>(null);
	const isChannel = currentProfile?.id !== profileId;

	const actionList: actionListType[] = [
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["PublicationId"]) => {
				void Share.share({
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
			name: publication?.operations?.hasBookmarked
				? "Remove from watch later"
				: "Add to watch later",
			icon: publication?.operations?.hasBookmarked ? "delete" : "clock",
			onPress: (publication) => {
				if (publication?.operations?.hasBookmarked) {
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
				snapPoints={[150]}
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
			<DeleteVideo sheetRef={deleteRef} publication={publication} />
		</>
	);
};

export default React.memo(MirroredVideos);
