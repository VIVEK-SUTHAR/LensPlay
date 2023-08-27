import Skeleton from "components/common/Skeleton";
import ProfileCard from "components/ProfileCard";
import Heading from "components/UI/Heading";
import ProfileCardSkeleton from "components/UI/ProfileCardSkeleton";
import StyledText from "components/UI/StyledText";
import { ErrorMessage } from "components/VideoPlayer/utils";
import { black, primary, white } from "constants/Colors";
import { Follower, FollowersRequest, useAllFollowersQuery } from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import React, { useLayoutEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	LayoutAnimation,
	SafeAreaView,
	StyleSheet,
	View
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { useProfile } from "store/Store";
import getFollowesData from "utils/analytics/getFollowersData";
import formatHandle from "utils/formatHandle";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
type FollowersCount = {
	before7Days: number;
	before14Days: number;
};
const FollowAnalytics: React.FC<RootStackScreenProps<"FollowAnalytics">> = ({ navigation }) => {
	const [followersCount, setFollowersCount] = useState<FollowersCount | null>(null);
	const { currentProfile } = useProfile();
	const fetchData = async () => {
		const followers1Promise = getFollowesData({
			handle: currentProfile?.handle,
			noOfDays: 7,
		});
		const followers2Promise = getFollowesData({
			handle: currentProfile?.handle,
			noOfDays: 14,
		});
		// Wait for both promises to resolve
		const [followers1, followers2] = await Promise.all([followers1Promise, followers2Promise]);
		return {
			before7Days: followers1,
			before14Days: followers2,
		};
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `${currentProfile?.name || formatHandle(currentProfile?.handle)}'s Channel`,
		});
	}, []);

	React.useEffect(() => {
		fetchData()
			.then((res) => {
				Logger.Success("Historic Followers Data", res);
				LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
				setFollowersCount({
					before14Days: res.before14Days,
					before7Days: res.before7Days,
				});
			})
			.catch((error) => {
				Logger.Error("Error in loading Followers count", error);
			});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StyledText
				title="Your Followers growth in last 14 days"
				style={{
					color: white[500],
					fontWeight: "600",
					fontSize: 18,
					marginVertical: 24,
				}}
			/>
			{followersCount ? (
				<View>
					<FollowersGrowthChart
						labels={["14 Days", "7 Days", "Today"]}
						data={[
							followersCount.before14Days,
							followersCount.before7Days,
							Number(currentProfile?.stats?.totalFollowers),
						]}
					/>
					<FollowerCountText
						before7={followersCount.before7Days}
						current={Number(currentProfile?.stats?.totalFollowers)}
					/>
					<RecentSubscribers />
				</View>
			) : (
				<ActivityIndicator color={"hotpink"} size="large" />
			)}
			<StyledText
				style={{
					position: "absolute",
					bottom: 0,
					color: "gray",
					opacity: 0.5,
					fontWeight: "600",
					fontSize: 8,
					textAlign: "center",
					marginHorizontal: 18,
					marginVertical: 24,
				}}
				title={"Note: This analytics are from on-chain data, the data can be behind 12 hours"}
			/>
		</SafeAreaView>
	);
};

export default FollowAnalytics;

type FollowersGrowthChartProps = {
	labels: Array<string>;
	data: Array<number>;
};

const FollowersGrowthChart: React.FC<FollowersGrowthChartProps> = React.memo(({ data }) => {
	//TO-DO add one utill that converts 7days back date in UNIX-timestamp
	const dataa = [
		{
			subs: "7 Days",
			value: data[0],
			timestamp: 1689618,
		},
		{
			subs: "14 Days",
			value: data[1],
			timestamp: 1689618,
		},
		{
			subs: "14 Days",
			value: data[2],
			timestamp: 1689618,
		},
	];
	return (
		<View style={styles.chartContainer}>
			<LineChart.Provider data={dataa}>
				<LineChart width={Dimensions.get("window").width - 20} height={220}>
					<LineChart.Path color={primary}>
						<LineChart.Gradient />
						<LineChart.Dot color={primary} at={2} hasPulse />
					</LineChart.Path>
					<LineChart.CursorCrosshair color={primary}>
						<LineChart.Tooltip textStyle={{ color: primary }} />
					</LineChart.CursorCrosshair>
				</LineChart>
			</LineChart.Provider>
		</View>
	);
});

const FollowerCountText = ({ current, before7 = 0 }: { current: number; before7: number }) => {
	const difference = Number(current - before7);
	return (
		<StyledText
			style={{
				color: difference > 0 ? primary : "red",
				fontWeight: "600",
				fontSize: 18,
				marginVertical: 24,
			}}
			title={`${difference} new subscribers`}
		/>
	);
};

const RecentSubscribers = React.memo(() => {
	const { currentProfile } = useProfile();

	const request: FollowersRequest = {
		profileId: currentProfile?.id,
		limit: 3,
	};
	const { data, loading, error } = useAllFollowersQuery({
		variables: {
			request,
		},
	});
	const renderItem = React.useCallback(({ item }: { item: Follower }) => {
		return (
			<ProfileCard
				key={item?.wallet?.address}
				profileIcon={getRawurl(item?.wallet?.defaultProfile?.picture)}
				profileName={item?.wallet?.defaultProfile?.name}
				handle={item?.wallet?.defaultProfile?.handle}
				profileId={item?.wallet?.defaultProfile?.id}
				owner={item?.wallet?.address}
				isFollowed={false}
			/>
		);
	}, []);
	const subscribers = data?.followers?.items as Follower[];
	const keyExtractor = (item: Follower) =>
		item?.wallet?.defaultProfile?.id || item?.wallet?.address;
	if (loading) return <Skeleton children={<ProfileCardSkeleton />} number={3} />;

	if (data?.followers?.items?.length === 0)
		return <ErrorMessage style={{}} message="Looks like you don't have any subscribers" />;
	return (
		<View style={{ backgroundColor: "black", padding: 8 }}>
			<Heading
				style={{
					color: white[500],
					fontWeight: "600",
					fontSize: 18,
				}}
				title="Your Recent Subscribers"
			/>
			<FlatList
				data={subscribers}
				keyExtractor={keyExtractor}
				removeClippedSubviews={true}
				renderItem={renderItem}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		paddingHorizontal: 8,
	},
	chartContainer: {
		borderColor: black[100],
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});
