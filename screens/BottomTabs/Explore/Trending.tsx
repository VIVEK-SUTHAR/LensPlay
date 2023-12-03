import * as React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import { FlashList } from "@shopify/flash-list";
import StyledText from "components/UI/StyledText";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import Skeleton from "components/common/Skeleton";
import { black, dark_primary } from "constants/Colors";
import {
	type ExplorePublicationRequest,
	ExplorePublicationType,
	ExplorePublicationsOrderByType,
	LimitType,
	type PrimaryPublication,
	PublicationMetadataMainFocusType,
	useExplorePublicationsQuery,
} from "customTypes/generated";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useThemeStore } from "store/Store";
import Logger from "utils/logger";
import Chip from "components/common/Chip";

type ExloreCategories = {
	name: ExplorePublicationsOrderByType;
	active: boolean;
};
const tags: ExloreCategories[] = [
	{
		name: ExplorePublicationsOrderByType.Latest,
		active: true,
	},
	{
		name: ExplorePublicationsOrderByType.TopCommented,
		active: false,
	},
	{
		name: ExplorePublicationsOrderByType.TopCollectedOpenAction,
		active: false,
	},
	{
		name: ExplorePublicationsOrderByType.TopMirrored,
		active: false,
	},
	{
		name: ExplorePublicationsOrderByType.LensCurated,
		active: false,
	},
];

export default function Trending() {
	const [currentTag, setCurrentTag] = useState<ExloreCategories>(tags[0]);
	const theme = useThemeStore();
	const { accessToken } = useAuthStore();
	const { isGuest } = useGuestStore();
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const abortController = React.useRef(new AbortController());
	const QueryRequest: ExplorePublicationRequest = {
		orderBy: currentTag.name,
		limit: LimitType.Ten,
		where: {
			metadata: {
				mainContentFocus: [
					PublicationMetadataMainFocusType.Video,
					PublicationMetadataMainFocusType.ShortVideo,
				],
			},
			publicationTypes: [ExplorePublicationType.Post],
		},
	};

	const {
		data: ExploreData,
		error,
		loading,
		refetch,
		fetchMore,
	} = useExplorePublicationsQuery({
		variables: {
			request: QueryRequest,
		},
		context: {
			headers: {
				"x-access-token": `${!isGuest ? `Bearer ${accessToken}` : ""}`,
			},
			fetchOptions: {
				signal: abortController.current.signal,
			},
		},
	});

	const abortRequest = () => {
		abortController.current.abort();
		Logger.Success("Request Aborted");
		abortController.current = new AbortController();
	};

	// useEffect(() => {
	// 	return () => {
	// 		abortRequest();
	// 	};
	// }, []);

	useEffect(() => {
		refetch({
			request: QueryRequest,
		});
	}, [currentTag]);

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

	const Refresh = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	const pageInfo = ExploreData?.explorePublications?.pageInfo;

	const keyExtractor = (item: PrimaryPublication) => item.id;

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

	const _MoreLoader = () => {
		return (
			<>
				{pageInfo?.next ? (
					<View
						style={{
							height: 100,
							width: Dimensions.get("screen").width,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size={"small"} color={theme.PRIMARY} />
					</View>
				) : (
					<ErrorMessage message="No more Videos to load" withImage={false} />
				)}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const RenderItem = ({ item }: { item: PrimaryPublication }) => {
		if (!item.isHidden) {
			return <VideoCard key={`${item.id}-${item.createdAt}`} publication={item} id={item.id} />;
		}
		return null;
	};

	const renderChips = ({ item, index }: { item: ExloreCategories; index: number }) => {
		const updateCategory = () => {
			setCurrentTag(tags[index]);
		};

		return (
			<TouchableOpacity onPress={updateCategory}>
				<Chip key={index} title={item.name} isActive={currentTag.name === item.name} />
			</TouchableOpacity>
		);
	};

	const CHIPS_HEIGHT = 34; //😜
	const chipsItemLayout = (_: any, index: number) => {
		return {
			length: CHIPS_HEIGHT,
			offset: CHIPS_HEIGHT * index,
			index,
		};
	};

	if (error) {
		Logger.Error("Apolo Error", error);
		return <ErrorMessage message={"Looks like something went wrong"} />;
	}
	if (loading)
		return (
			<SafeAreaView style={styles.container}>
				<View
					style={{
						paddingVertical: 8,
						backgroundColor: black[800],
					}}
				>
					<FlatList
						data={tags}
						horizontal={true}
						getItemLayout={chipsItemLayout}
						renderItem={renderChips}
						removeClippedSubviews={true}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				<Skeleton number={10}>
					<VideoCardSkeleton />
				</Skeleton>
			</SafeAreaView>
		);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<View
				style={{
					paddingVertical: 8,
					backgroundColor: black[800],
				}}
			>
				<FlatList
					data={tags}
					horizontal={true}
					getItemLayout={chipsItemLayout}
					renderItem={renderChips}
					removeClippedSubviews={true}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<FlashList
				data={ExploreData?.explorePublications.items as PrimaryPublication[]}
				keyExtractor={keyExtractor}
				estimatedItemSize={280}
				ListFooterComponent={<MoreLoader />}
				onEndReached={onEndCallBack}
				onEndReachedThreshold={0.5}
				refreshControl={Refresh}
				renderItem={RenderItem}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
