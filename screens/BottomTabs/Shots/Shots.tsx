import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ShotSkeleton from "components/Shots/ShotSkeleton";
import SingleShot from "components/Shots/SingleShot";
import {
	ExplorePublicationRequest,
	PublicationMainFocus,
	PublicationSortCriteria,
	PublicationTypes,
	useExploreQuery,
} from "customTypes/generated";
import { ShotsPublication } from "customTypes/index";
import { RootTabScreenProps } from "customTypes/navigation";
import { Video } from "expo-av";
import React from "react";
import { Dimensions, Platform, StyleSheet, View, useWindowDimensions } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useProfile } from "store/Store";
import useShotsStore from "store/shotsStore";

const Shots = ({ navigation }: RootTabScreenProps<"Shots">) => {
	const ref = React.useRef<Video>(null);
	const { setCurrentIndex, setShotsRef, clearStore } = useShotsStore();
	const { currentProfile } = useProfile();
	const { isGuest, profileId } = useGuestStore();
	const { accessToken } = useAuthStore();
	const { height } = useWindowDimensions();

	navigation.addListener("blur", (e) => {
		ref.current?.pauseAsync();
		ref.current?.stopAsync();
		clearStore();
	});

	React.useEffect(() => {
		setShotsRef(ref);
	}, []);

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

	const data = shotsData?.explorePublications?.items as ShotsPublication[];

	const pageInfo = shotsData?.explorePublications.pageInfo;

	const handleChangeIndexValue = ({ index }: { index: number }) => {
		setCurrentIndex(index);
	};

	const renderItem = ({ item, index }: { item: ShotsPublication; index: number }) => {
		if (!item.hidden) {
			return (
				<View style={{ height: isAndroid ? height : "auto" }}>
					<SingleShot item={item} key={item.id} index={index} />
				</View>
			);
		}
		return <></>;
	};

	const keyExtractor = (item: ShotsPublication) => item.id.toString();

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

	const BottomTabHeight = useBottomTabBarHeight();

	const ITEM_HEIGHT = isAndroid ? height : height - BottomTabHeight;

	const getItemLayout = (_: any, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};

	if (loading) return <ShotSkeleton />;

	return (
		<View style={styles.container}>
			<SwiperFlatList
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
