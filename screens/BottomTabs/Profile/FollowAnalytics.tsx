import StyledText from "components/UI/StyledText";
import { white } from "constants/Colors";
import { RootStackScreenProps } from "customTypes/navigation";
import React, { useLayoutEffect, useState } from "react";
import { Dimensions, LayoutAnimation, SafeAreaView, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { useProfile } from "store/Store";
import getFollowesData from "utils/analytics/getFollowersCount";
import formatHandle from "utils/formatHandle";
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
				Logger.Success("Historic Data", res);
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
				title="Your Followers growth in last 7 days"
				style={{
					color: white[500],
					fontWeight: "600",
					fontSize: 18,
					marginHorizontal: 18,
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
					<StyledText
						style={{
							color: white[500],
							fontWeight: "600",
							fontSize: 18,
							marginHorizontal: 18,
							marginVertical: 24,
						}}
						title={`${
							Number(currentProfile?.stats?.totalFollowers) - followersCount.before7Days
						} new subscribers`}
					/>
				</View>
			) : null}
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
	chartConfig?: AbstractChartConfig;
};

const FollowersGrowthChart: React.FC<FollowersGrowthChartProps> = React.memo(
	({ data, labels, chartConfig }) => {
		const defaultChartConfig: AbstractChartConfig = {
			// Default chart configuration
			// backgroundColor: "#787878",
			// backgroundGradientFrom: "#161616",
			// backgroundGradientTo: "#151515",
			decimalPlaces: 0,
			color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			propsForDots: {
				r: "1",
				strokeWidth: "4",
				stroke: "#FFBF00",
			},
		};

		const mergedChartConfig = {
			...defaultChartConfig,
			...chartConfig,
		};

		return (
			<View>
				<LineChart
					data={{
						labels,
						datasets: [
							{
								data,
							},
						],
					}}
					withHorizontalLines={true}
					width={Dimensions.get("window").width}
					height={220}
					yAxisLabel=""
					yAxisSuffix=""
					segments={0}
					withInnerLines={false}
					chartConfig={mergedChartConfig}
					bezier
					style={{
						marginVertical: 16,
					}}
				/>
			</View>
		);
	}
);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
