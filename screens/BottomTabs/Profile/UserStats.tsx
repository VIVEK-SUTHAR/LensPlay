import React, { useLayoutEffect, useMemo } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";

import ProfileCard from "components/ProfileCard";
import ProfileCardSkeleton from "components/UI/ProfileCardSkeleton";
import Tabs, { Tab } from "components/UI/Tabs";
import ErrorMessage from "components/common/ErrorMesasge";
import Skeleton from "components/common/Skeleton";
import {
	FollowersRequest,
	FollowingRequest,
	HandleInfo,
	LimitType,
	Profile,
	Scalars,
	useFollowersQuery,
	useFollowingQuery,
} from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import { useAuthStore, useProfile, useThemeStore } from "store/Store";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import getIPFSLink from "utils/getIPFSLink";

const UserStats = ({ navigation, route }: RootStackScreenProps<"UserStats">) => {
	const { currentProfile } = useProfile();

	const isFromChannel = useMemo(() => route.params.profileId, [navigation]);

	const getScreenTitle = React.useCallback(() => {
		if (isFromChannel) {
			return "Stats";
		} else {
			return (
				currentProfile?.metadata?.displayName || formatHandle(currentProfile?.handle as HandleInfo)
			);
		}
	}, [navigation]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: getScreenTitle(),
		});
	}, [navigation, currentProfile]);
	return (
		<SafeAreaView style={styles.container}>
			<Tabs>
				<Tab.Screen
					name="Subscribers"
					children={() => <SuscriberList profileId={route.params.profileId} />}
					options={{
						tabBarLabel: "Subscribers",
					}}
				/>
				<Tab.Screen
					name="Subscriptions"
					children={() => <SubscriptionsList profileId={route.params.profileId} />}
					options={{
						tabBarLabel: "Subscriptions",
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
};

const ITEM_HEIGHT = 64;

const getItemLayout = (_: any, index: number) => {
	return {
		length: ITEM_HEIGHT,
		offset: ITEM_HEIGHT * index,
		index,
	};
};

const Suscribers = ({ profileId }: { profileId: Scalars["ProfileId"] }) => {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();

	const request: FollowersRequest = {
		of: profileId,
		limit: LimitType.TwentyFive,
	};

	const { data, error, loading, fetchMore } = useFollowersQuery({
		variables: {
			request,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const subscribers = data?.followers?.items as Profile[];

	const pageInfo = data?.followers?.pageInfo;

	const keyExtractor = (item: Profile) => item?.id;

	const onEndCallBack = React.useCallback(() => {
		if (!pageInfo?.next) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					...request,
					cursor: pageInfo?.next,
				},
			},
		}).catch((err) => {});
	}, [pageInfo?.next]);

	const _MoreLoader = () => {
		return pageInfo?.next ? (
			<View
				style={{
					height: ITEM_HEIGHT,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size={"small"} color={PRIMARY} />
			</View>
		) : (
			<></>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const renderItem = React.useCallback(({ item }: { item: Profile }) => {
		return (
			<ProfileCard
				key={item?.handle?.ownedBy}
				profileIcon={getIPFSLink(getRawurl(item?.metadata?.picture))}
				profileName={item?.metadata?.displayName ?? ""}
				handle={item?.handle?.fullHandle}
				profileId={item?.id}
				owner={item?.handle?.ownedBy}
				isFollowed={item?.operations?.isFollowedByMe?.value}
			/>
		);
	}, []);

	if (loading) return <Skeleton children={<ProfileCardSkeleton />} number={10} />;

	if (data?.followers?.items?.length === 0)
		return <ErrorMessage message="Looks like you don't have any subscribers" withImage />;

	if (data) {
		return (
			<View style={{ backgroundColor: "black", minHeight: "100%", padding: 8 }}>
				<FlatList
					data={subscribers}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					ListFooterComponent={<MoreLoader />}
					onEndReached={onEndCallBack}
					onEndReachedThreshold={0.1}
					initialNumToRender={12}
					removeClippedSubviews={true}
					renderItem={renderItem}
				/>
			</View>
		);
	}
	return null;
};

const SuscriberList = React.memo(Suscribers);

const Subscriptions = ({ profileId }: { profileId: Scalars["ProfileId"] }) => {
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { PRIMARY } = useThemeStore();

	const request: FollowingRequest = {
		for: profileId,
		limit: LimitType.TwentyFive,
	};

	const { data, error, loading, fetchMore } = useFollowingQuery({
		variables: {
			request,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const subscriptions = data?.following?.items as Profile[];

	const pageInfo = data?.following?.pageInfo;

	const keyExtractor = (item: Profile) => item?.id;

	const onEndCallBack = React.useCallback(() => {
		if (!pageInfo?.next) {
			return;
		}
		fetchMore({
			variables: {
				request: {
					...request,
					cursor: pageInfo?.next,
				},
			},
		}).catch((err) => {});
	}, [pageInfo?.next]);

	const _MoreLoader = () => {
		return pageInfo?.next ? (
			<View
				style={{
					height: ITEM_HEIGHT,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size={"small"} color={PRIMARY} />
			</View>
		) : (
			<></>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const renderItem = ({ item }: { item: Profile }) => {
		return (
			<ProfileCard
				key={item?.handle?.ownedBy}
				profileIcon={getRawurl(item?.metadata?.picture)}
				profileName={item?.metadata?.displayName ?? ""}
				handle={item.handle?.fullHandle}
				profileId={item?.id}
				owner={item?.handle?.ownedBy}
				isFollowed={item?.operations?.isFollowedByMe?.value}
			/>
		);
	};

	if (loading) return <Skeleton children={<ProfileCardSkeleton />} number={10} />;

	if (data?.following?.items?.length === 0)
		return (
			<ErrorMessage message="Looks like you don't have subscribed to any channels" withImage />
		);

	if (data) {
		return (
			<View style={{ backgroundColor: "black", minHeight: "100%", padding: 8 }}>
				<FlatList
					data={subscriptions}
					keyExtractor={keyExtractor}
					getItemLayout={getItemLayout}
					ListFooterComponent={<MoreLoader />}
					onEndReached={onEndCallBack}
					onEndReachedThreshold={0.1}
					removeClippedSubviews={true}
					renderItem={renderItem}
				/>
			</View>
		);
	}
	return null;
};

const SubscriptionsList = React.memo(Subscriptions);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	topBarTab: {
		height: Dimensions.get("window").height * 0.05,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	tab: {
		justifyContent: "center",
		alignItems: "center",
		flex: 0.5,
	},
	SkletonContainer: {
		backgroundColor: "black",
		borderRadius: 16,
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		marginVertical: 4,
	},
	SkletonAvatar: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "#232323",
	},
	SkletonText: {
		marginLeft: 8,
		width: "40%",
		height: 16,
		borderRadius: 3,
		backgroundColor: "#232323",
	},
});
export default UserStats;
