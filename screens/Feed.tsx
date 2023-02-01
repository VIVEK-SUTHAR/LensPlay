import React from "react";
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { useThemeStore } from "../store/Store";
import { RootTabScreenProps } from "../types/navigation/types";
import VideoCardSkeleton from "../components/UI/VideoCardSkeleton";
import AnimatedLottieView from "lottie-react-native";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import { useFeed } from "../hooks/useFeed";

const Feed = ({ navigation }: RootTabScreenProps<"Home">) => {
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const theme = useThemeStore();

	const { data: Feeddata, error, loading } = useFeed();

	if (error) return <NotFound navigation={navigation} />;

	if (loading) return <Loader />;

	if (!Feeddata) return <NotFound navigation={navigation} />;

	if (Feeddata) {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={Feeddata.feed.items}
					keyExtractor={(item) => item.root.id.toString()}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {}}
							colors={[theme.PRIMARY]}
							progressBackgroundColor={"black"}
						/>
					}
					renderItem={({ item }) => (
						<VideoCard
							id={item?.root?.id}
							title={item?.root?.metadata?.name}
							date={item.root.createdAt}
							playbackId={item?.root?.metadata?.media[0]?.original?.url}
							banner={item?.root?.metadata?.cover}
							avatar={item?.root?.profile?.picture?.original?.url}
							uploadedBy={item?.root?.profile?.name || item.root.profile.handle}
							stats={item?.root?.stats}
							isFollowdByMe={item.root.profile.isFollowedByMe}
							profileId={item?.root?.profile?.id}
							reaction={item?.root?.reaction}
							description={item?.root?.metadata?.description}
							attributes={item?.root?.metadata?.attributes}
							ethAddress={item?.root?.profile?.ownedBy}
						/>
					)}
				/>
			</SafeAreaView>
		);
	}
};
export default Feed;

const NotFound = ({ navigation }: { navigation: any }) => {
	const theme = useThemeStore();
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flex: 1,
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
						title="Looks like you just landed,follow some profile to view your feed"
						style={{
							fontSize: 16,
							color: "white",
							marginVertical: 5,
							marginHorizontal: 15,
							fontWeight: "600",
							alignSelf: "flex-start",
							textAlign: "center",
						}}
					/>
					<Button
						title="Explore Feed"
						width={"auto"}
						type="outline"
						borderColor={theme.PRIMARY}
						px={16}
						my={8}
						textStyle={{
							color: "white",
							fontSize: 20,
							fontWeight: "600",
						}}
						onPress={() => {
							navigation.navigate("Trending");
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const Loader = () => (
	<SafeAreaView style={styles.container}>
		<VideoCardSkeleton />
		<VideoCardSkeleton />
		<VideoCardSkeleton />
		<VideoCardSkeleton />
		<VideoCardSkeleton />
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
});
