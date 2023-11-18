import React, { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import { NOTIFICATION } from "../../../constants/tracking";
import { useGuestStore } from "../../../store/GuestStore";
import { useAuthStore, useThemeStore } from "../../../store/Store";
import {
	FollowNotification as NewFollowerNotification, NotificationRequest,
	NotificationType,
	useNotificationsQuery
} from "../../../types/generated";
import TrackAction from "../../../utils/Track";
import PleaseLogin from "../../PleaseLogin";
import ErrorMessage from "../../common/ErrorMesasge";
import Skeleton from "../../common/Skeleton";
import FollowNotification from "../FollowNotification";
import Skleton from "../Skleton";

function FollowNotifications() {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const theme = useThemeStore();
	const { accessToken } = useAuthStore();
	const { isGuest } = useGuestStore();

	const LensNotificationTypes = [NotificationType.Followed];

	const QueryRequest: NotificationRequest = {
		where: {
			highSignalFilter: false,
			notificationTypes: LensNotificationTypes,
		},
	};

	const { data, error, loading, refetch, fetchMore } = useNotificationsQuery({
		variables: {
			request: QueryRequest,
		},
		fetchPolicy: "network-only",
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const notifications = data?.notifications?.items as NewFollowerNotification[];
	const ITEM_HEIGHT = 35;

	const getItemLayout = (_: any, index: number) => {
		return {
			length: ITEM_HEIGHT,
			offset: ITEM_HEIGHT * index,
			index,
		};
	};
	const pageInfo = data?.notifications?.pageInfo;
	const onEndCallBack = () => {
		console.log(pageInfo?.next);
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
							height: 80,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{pageInfo?.next ? <ActivityIndicator size={"small"} color={theme.PRIMARY} /> : null}
					</View>
				) : (
					<></>
				)}
			</>
		);
	};

	const MoreLoader = React.memo(_MoreLoader);

	const onRefresh = () => {
		setRefreshing(true);
		refetch({
			request: QueryRequest,
		}).then(() => setRefreshing(false));
	};

	const _RefreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={onRefresh}
			colors={[theme.PRIMARY]}
			progressBackgroundColor={"black"}
		/>
	);

	const keyExtractor = (item: NewFollowerNotification, index: any) => `${item?.id}-${index}`;

	TrackAction(NOTIFICATION.NOTIFICATIONS);

	const renderItem = ({ item }: { item: NewFollowerNotification }) => {
		return <FollowNotification notification={item} />;
	};

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<Skeleton children={<Skleton />} number={10} />
			</SafeAreaView>
		);
	}
	if (isGuest) return <PleaseLogin />;
	if (error) {
		return (
			<ErrorMessage
				message={"Oh no,LensPlay encounterd some error while loading your notifications,😞😞"}
			/>
		);
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={notifications}
				keyExtractor={keyExtractor}
				ListEmptyComponent={() => {
					return (
						<ErrorMessage message="Looks like you don't have any notifications,interact with profiles to get notifications" />
					);
				}}
				getItemLayout={getItemLayout}
				ListFooterComponent={<MoreLoader />}
				onEndReached={onEndCallBack}
				onEndReachedThreshold={0.2}
				refreshControl={_RefreshControl}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});

export default React.memo(FollowNotifications);
