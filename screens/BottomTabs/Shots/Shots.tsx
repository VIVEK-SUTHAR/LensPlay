import { FlashList } from "@shopify/flash-list";
import ShotSkeleton from "components/Shots/ShotSkeleton";
import SingleShot from "components/Shots/SingleShot";
import {
	ExplorePublicationRequest,
	Mirror,
	Post,
	PublicationMainFocus,
	PublicationSortCriteria,
	PublicationTypes,
	useExploreQuery,
} from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import React, { useCallback, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Platform,
	StyleSheet,
	useWindowDimensions,
	View,
	ViewToken,
} from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";

type ShotPublication = Post | Mirror;

const Shots: React.FC<RootTabScreenProps<"Shots">> = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const { currentProfile } = useProfile();
	const { isGuest, profileId } = useGuestStore();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { height } = useWindowDimensions();

	const isAndroid = Platform.OS === "android";

	const QueryRequest: ExplorePublicationRequest = {
		sortCriteria: PublicationSortCriteria.Latest,
		publicationTypes: [PublicationTypes.Post],
		metadata: {
			mainContentFocus: [PublicationMainFocus.Video],
		},
		sources: ["lensplay", "lenstube-bytes"],
		limit: 3,
	};

	const {
		data: shotsData,
		error,
		loading,
		refetch,
		fetchMore,
	} = useExploreQuery({
		variables: {
			request: QueryRequest,
			reactionRequest: {
				profileId: isGuest ? profileId : currentProfile?.id,
			},
		},
		context: {
			headers: {
				"x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
			},
		},
	});

	const data = shotsData?.explorePublications?.items as ShotPublication[];

	const pageInfo = shotsData?.explorePublications.pageInfo;

	const renderItem = useCallback(
		({ item, index }: { item: Post | Mirror; index: number }) => {
			if (!item.hidden) {
				return (
					<View style={{ height: isAndroid ? height : "auto" }}>
						<SingleShot item={item} isActive={currentIndex === index} />
					</View>
				);
			}
			return null;
		},
		[currentIndex]
	);

	const onEndCallBack = () => {
		if (!pageInfo?.next) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					cursor: pageInfo?.next,
					...QueryRequest,
				},
			},
		}).catch((err) => {});
	};

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			let viewableItem = viewableItems[0];
			if (viewableItems.length > 4) {
				viewableItem = viewableItems[Math.floor(viewableItems.length) / 2];
			}
			if (viewableItem) {
				const visibleIndex = Number(viewableItem.index);
				setCurrentIndex(visibleIndex);
			}
		},
		[]
	);

	const ListFooter = React.memo(() => {
		return <ActivityIndicator style={{ paddingVertical: 12 }} size="small" color={PRIMARY} />;
	});

	if (loading) return <ShotSkeleton />;

	return (
		<View style={styles.container}>
			<FlashList
				data={data}
				pagingEnabled={true}
				renderItem={renderItem}
				estimatedItemSize={646}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, i) => `${item.id}_${i}`}
				onEndReached={onEndCallBack}
				extraData={currentIndex}
				onViewableItemsChanged={onViewableItemsChanged}
				onEndReachedThreshold={0.8}
				removeClippedSubviews={true}
				ListFooterComponent={ListFooter}
			/>
			{/* <SwiperFlatList
				vertical={true}
				keyExtractor={keyExtractor}
				onChangeIndex={handleChangeIndexValue}
				data={data}
				renderItem={renderItem}
				initialNumToRender={3}
				maxToRenderPerBatch={3}
				windowSize={3}
				onEndReachedThreshold={1}
				onEndReached={onEndCallBack}
				getItemLayout={getItemLayout}
				removeClippedSubviews={true}
			/> */}
		</View>
	);
};
export default Shots;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
		...Platform.select({
			ios: {
				flex: 1,
			},
			android: { height: Dimensions.get("window").height, width: Dimensions.get("window").width },
		}),
	},
});
