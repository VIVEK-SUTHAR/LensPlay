import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import NotificationCard from "../components/Notifications";
import Skleton from "../components/Notifications/Skleton";
import { useAuthStore, useProfile, useThemeStore } from "../store/Store";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import { useQuery } from "@apollo/client";
import { RootTabScreenProps } from "../types/navigation/types";
import { INotifications, Item } from "../components/Notifications/index.d";

const Navigation = ({ navigation }: RootTabScreenProps<"Notifications">) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const authStore = useAuthStore();
	const theme = useThemeStore();
	const userStore = useProfile();

	const { data, error, loading, refetch } = useQuery<INotifications>(notificationsQuery, {
		variables: {
			pid: userStore.currentProfile?.id,
		},
		fetchPolicy: "cache-and-network",
		initialFetchPolicy: "network-only",
		refetchWritePolicy: "merge",
		pollInterval: 5000,
		context: {
			headers: {
				"x-access-token": `Bearer ${authStore.accessToken}`,
			},
		},
	});
	if (error) console.log(error);

	if (loading) return <Loader />;

	if (!data) return <NotFound />;

	if (data) {
		return (
			<SafeAreaView style={styles.container}>
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
};

export default Navigation;

const Loader = () => {
	return (
		<SafeAreaView style={styles.container}>
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
};

const NotFound = () => {
	return (
		<View
			style={{
				height: '100%',
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "black"
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
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
