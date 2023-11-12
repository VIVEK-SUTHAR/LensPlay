import * as React from "react";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import ErrorMessage from "../../../components/common/ErrorMesasge";
import { FlashList } from "@shopify/flash-list";
import StyledText from "components/UI/StyledText";
import VideoCardSkeleton from "components/UI/VideoCardSkeleton";
import VideoCard from "components/VideoCard";
import Skeleton from "components/common/Skeleton";
import { dark_primary } from "constants/Colors";
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
		Logger.Success("Request Aborted")
		abortController.current = new AbortController();
	};

	useEffect(() => {
		return () => {
			abortRequest();
		};
	}, []);

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

	const RenderItem = ({ item }) => {
		if (!item.isHidden) {
			return <VideoCard key={`${item.id}-${item.createdAt}`} publication={item} id={item.id} />;
		}
		return null;
	};

	if (error) {
		Logger.Error("Apolo Error", error);
		return <ErrorMessage message={"Looks like something went wrong"} />;
	}
	if (loading)
		return (
			<SafeAreaView style={styles.container}>
				<Skeleton number={10}>
					<VideoCardSkeleton />
				</Skeleton>
			</SafeAreaView>
		);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<ScrollView
				style={{
					height: 60,
					paddingVertical: 8,
					maxHeight: 60,
					marginLeft: 10,
				}}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{tags.map((item, index) => {
					return (
						<Pressable
							android_ripple={{
								color: "transparent",
							}}
							onTouchEndCapture={() => {
								setCurrentTag(tags[index]);
							}}
							key={index}
							style={{
								marginHorizontal: 4,
								backgroundColor: `${currentTag.name === item.name ? theme.PRIMARY : dark_primary}`,
								width: "auto",
								maxHeight: 34,
								paddingHorizontal: 12,
								paddingVertical: 6,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 8,
							}}
						>
							<StyledText
								title={item.name.replace(/_/g, " ")}
								style={{
									fontSize: 12,
									fontWeight: "600",
									color: `${currentTag.name === item.name ? "black" : "white"}`,
								}}
							/>
						</Pressable>
					);
				})}
			</ScrollView>
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
