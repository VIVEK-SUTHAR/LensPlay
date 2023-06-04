import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import MyVideoCard, { type actionListType } from "components/common/MyVideoCard";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";
import Skeleton from "components/common/Skeleton";
import Icon from "components/Icon";
import { NoVideosFound } from "components/Profile/AllVideos";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import {
	useAllPublicationsLazyQuery,
	type Mirror,
	type Post,
	type Scalars,
	PublicationTypes,
	PublicationMainFocus,
} from "customTypes/generated";
import React from "react";
import { FlatList, Share, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { getColors } from "react-native-image-colors";
import { useProfile, useThemeStore } from "store/Store";
import CommonStyles from "styles/index";
import getImageProxyURL from "utils/getImageProxyURL";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import getWatchLaters from "utils/watchlater/getWatchLaters";

const WatchLaterList = () => {
	const [pubId, setPubId] = React.useState("");
	const [refreshing, setRefreshing] = React.useState<boolean>(false);
	const [data, setData] = React.useState(null);

	const WatchLaterSheetRef = React.useRef<BottomSheetMethods>(null);

	const { currentProfile } = useProfile();
	const { PRIMARY } = useThemeStore();

	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);

	const [getAllPublications, loading] = useAllPublicationsLazyQuery({
		onCompleted: (data) => {
			setData(data?.publications?.items);
		},
	});

	async function handleCoverGradient(watchLaterData: string[]) {
		const coverURL = getImageProxyURL({
			formattedLink: getIPFSLink(
				getRawurl(data?.publications?.items[0]?.metadata.cover.onChain.url)
			),
		});

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
						AsyncStorage.setItem(
							"@watchLater",
							JSON.stringify({
								watchLater: watchLaterData,
								pubId: watchLaterData[0],
								color: colors.average,
								cover: coverURL,
							})
						);
						break;
					case "ios":
						AsyncStorage.setItem(
							"@watchLater",
							JSON.stringify({
								watchLater: watchLaterData,
								pubId: watchLaterData[0],
								color: colors.background,
								cover: coverURL,
							})
						);
						break;
					default:
						AsyncStorage.setItem(
							"@watchLater",
							JSON.stringify({
								watchLater: watchLaterData,
								pubId: watchLaterData[0],
								color: "black",
								cover: coverURL,
							})
						);
				}
			})
			.catch((error) => {
				Logger.Error("Failed to fetch image for geting dominient color", error);
			});
	}

	async function getWatchLaterData() {
		const watchLater = await AsyncStorage.getItem("@watchLater");
		if (!watchLater) {
			const watchLaterData = await getWatchLaters(currentProfile?.id);
			if (watchLaterData.length > 0) {
				await getAllPublications({
					variables: {
						request: {
							publicationIds: watchLaterData,
							metadata: {
								mainContentFocus: [PublicationMainFocus.Video],
							},
						},
						reactionRequest: {
							profileId: currentProfile?.id,
						},
					},
				});
				await handleCoverGradient(watchLaterData);
			} else {
				setData(watchLaterData);
			}
		} else {
			const publicationIds = JSON.parse(watchLater).watchLater;
			if (publicationIds.length > 0) {
				getAllPublications({
					variables: {
						request: {
							publicationIds: publicationIds,
							metadata: {
								mainContentFocus: [PublicationMainFocus.Video],
							},
						},
						reactionRequest: {
							profileId: currentProfile?.id,
						},
					},
				});
			} else {
				setData(publicationIds);
			}
		}
	}

	React.useEffect(() => {
		getWatchLaterData();
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		try {
			getWatchLaterData();
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	}, []);

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			{!data ? (
				<View style={{ paddingHorizontal: 8, backgroundColor: "black" }}>
					<Skeleton number={10}>
						<ProfileVideoCardSkeleton />
					</Skeleton>
				</View>
			) : (
				<FlashList
					data={data}
					ListEmptyComponent={NoVideosFound}
					removeClippedSubviews={true}
					estimatedItemSize={110}
					refreshControl={_RefreshControl}
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
			)}
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
	const actionList: actionListType[] = [
		{
			name: "Remove",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {},
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

export default React.memo(WatchLaterList);
