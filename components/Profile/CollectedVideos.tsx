import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import MyVideoCard, { type actionListType } from "components/common/MyVideoCard";
import Icon from "components/Icon";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { SOURCES } from "constants/index";
import {
	type Mirror,
	type Post,
	PublicationMainFocus,
	type PublicationsQueryRequest,
	PublicationTypes,
	type Scalars,
	useProfileCollectsQuery,
} from "customTypes/generated";
import React from "react";
import { ActivityIndicator, FlatList, Share, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import CommonStyles from "styles/index";
import { NoVideosFound } from "./AllVideos";
import Skeleton from "components/common/Skeleton";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";

type CollectedVideosProps = {
	ethAddress?: string;
};

type CollectedPublication = Post | Mirror;

const keyExtractor = (item: CollectedPublication) => item.id;

const CollectedVideos: React.FC<CollectedVideosProps> = ({ ethAddress }) => {
	const [pubId, setPubId] = React.useState("");
	const [refreshing, setRefreshing] = React.useState<boolean>(false);

	const CollectedVideoSheetRef = React.useRef<BottomSheetMethods>(null);

	const { accessToken } = useAuthStore();
	const { currentProfile } = useProfile();
	const { PRIMARY } = useThemeStore();

	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);

	const QueryRequest: PublicationsQueryRequest = {
		collectedBy: ethAddress ? ethAddress : currentProfile?.ownedBy,
		publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: SOURCES,
		limit: 10,
	};

	const { data, error, loading, refetch, fetchMore } = useProfileCollectsQuery({
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

	const collectVideos = data?.publications?.items;
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
				.catch(() => {});
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
		}).catch(() => {});
	}, [pageInfo?.next]);

	if (error) return <></>;

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
					data={collectVideos as CollectedPublication[]}
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
							sheetRef={CollectedVideoSheetRef}
							setPubId={handlePubId}
						/>
					)}
				/>
			)}
			<CollectedVideoSheet sheetRef={CollectedVideoSheetRef} pubId={pubId} />
		</View>
	);
};

export const CollectedVideoSheet = ({
	sheetRef,
	pubId,
}: {
	sheetRef: React.RefObject<BottomSheetMethods>;
	pubId: Scalars["InternalPublicationId"];
}) => {
	const actionList: actionListType[] = [
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

export default React.memo(CollectedVideos);
