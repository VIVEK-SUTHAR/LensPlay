import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ShotSkeleton from "components/Shots/ShotSkeleton";
import SingleShot from "components/Shots/SingleShot";
import {
	ExplorePublicationRequest,
	ExplorePublicationType,
	ExplorePublicationsOrderByType,
	LimitType,
	PrimaryPublication,
	PublicationMetadataMainFocusType,
	useExplorePublicationsQuery,
} from "customTypes/generated";
import { RootTabScreenProps } from "customTypes/navigation";
import React, { useCallback, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Platform,
	StyleSheet,
	View,
	ViewToken,
	useWindowDimensions,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useThemeStore } from "store/Store";

const isAndroid = Platform.OS === "android";

const Shots: React.FC<RootTabScreenProps<"Shots">> = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const { isGuest } = useGuestStore();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();
	const { height } = useWindowDimensions();

	const QueryRequest: ExplorePublicationRequest = {
		orderBy: ExplorePublicationsOrderByType.Latest,
		where: {
			metadata: {
				mainContentFocus: [
					PublicationMetadataMainFocusType.Video,
					PublicationMetadataMainFocusType.ShortVideo,
				],
			},
			publicationTypes: [ExplorePublicationType.Post],
		},
		limit: LimitType.Ten,
	};

	const {
		data: shotsData,
		loading,
		fetchMore,
	} = useExplorePublicationsQuery({
		variables: {
			request: QueryRequest,
		},
		context: {
			headers: {
				"x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
			},
		},
	});

	const pageInfo = shotsData?.explorePublications.pageInfo;

	const renderItem = useCallback(
		({ item, index }: { item: PrimaryPublication; index: number }) => {
			if (!item.isHidden) {
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
	const handleChangeIndexValue = ({ index }: { index: number }) => {
		setCurrentIndex(index);
	};
	const BottomTabHeight = useBottomTabBarHeight();
	const ITEM_HEIGHT = isAndroid ? height : height - BottomTabHeight;
	const getItemLayout = (_: any, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};

	const ListFooter = React.memo(() => {
		return <ActivityIndicator style={{ paddingVertical: 12 }} size="small" color={PRIMARY} />;
	});
	const keyExtractor = (item: PrimaryPublication) => item.id;

	if (loading) return <ShotSkeleton />;

	return (
		<View style={styles.container}>
			{/* <FlashList
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
			/> */}
			<SwiperFlatList
				vertical={true}
				keyExtractor={keyExtractor}
				onChangeIndex={handleChangeIndexValue}
				data={shotsData?.explorePublications?.items}
				renderItem={renderItem}
				ListFooterComponent={ListFooter}
				initialNumToRender={3}
				maxToRenderPerBatch={3}
				windowSize={3}
				onEndReachedThreshold={1}
				onEndReached={onEndCallBack}
				getItemLayout={getItemLayout}
				removeClippedSubviews={true}
			/>
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
