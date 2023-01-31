import { FlatList, RefreshControl, SafeAreaView, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import { useQuery } from "@apollo/client";
const Navigation = ({ navigation }: { navigation: any }) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const authStore = useAuthStore();
	const theme = useThemeStore();
	const userStore = useProfile();

	const { data, error, loading, refetch } = useQuery(notificationsQuery, {
		variables: {
			pid: userStore.currentProfile?.id,
		},
		fetchPolicy: "cache-and-network",
		initialFetchPolicy: "network-only",
		refetchWritePolicy: "merge",
		pollInterval: 600000,
		context: {
			headers: {
				"x-access-token": `Bearer ${authStore.accessToken}`,
			},
		},
	});

	if (error) {
		console.log(error);
	}
	if (loading) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
				<Skleton />
			</SafeAreaView>
		);
	}
	if (data) {
		if (!data.result.items.length) {
			return (
				<View
					style={{
						height: 500,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AnimatedLottieView
						autoPlay
						style={{
							height: "auto",
						}}
						source={require("../assets/notifications.json")}
					/>
					<View
						style={{
							alignItems: "center",
						}}
					>
						<Heading
							title="No new notifications"
							style={{
								fontSize: 16,
								color: "white",
								marginVertical: 5,
								marginHorizontal: 15,
								fontWeight: "600",
								alignSelf: "flex-start",
							}}
						/>
					</View>
				</View>
			);
		}
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "black",
				}}
			>
				<FlatList
					data={data.result.items}
					keyExtractor={(_, index) => index.toString()}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true);
								refetch({
									pid: userStore.currentProfile?.id,
								}).then(() => setRefreshing(false));
							}}
							colors={[theme.PRIMARY]}
							progressBackgroundColor={"black"}
						/>
					}
					renderItem={({ item }) => (
						<NotificationCard navigation={navigation} notification={item} />
					)}
				/>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		></SafeAreaView>
	);
};

export default Navigation;
