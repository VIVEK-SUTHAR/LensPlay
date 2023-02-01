import { View, Text, SafeAreaView, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { RootStackScreenProps } from "../types/navigation/types";
import { useThemeStore } from "../store/Store";

const UserStats = ({ navigation, route }: RootStackScreenProps<"UserStats">) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Your " + headerTitle,
		});
	});
	const theme = useThemeStore();

	const [headerTitle, setHeaderTitle] = useState<string>("Subscribers");
	const [isSubscribers, setIsSubscribers] = useState<boolean>(true);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBarTab}>
				<Pressable
					android_ripple={{
						radius: 10,
						color: "gray",
					}}
					style={[
						styles.tab,
						{
							borderBottomWidth: isSubscribers ? 1 : 0,

							borderBottomColor: isSubscribers ? theme.PRIMARY : "red",
						},
					]}
					onPress={() => {
						setIsSubscribers(true);
						setHeaderTitle("Subscribers");
					}}
				>
					<Text
						style={{
							color: isSubscribers ? theme.PRIMARY : "white",

							fontWeight: isSubscribers ? "700" : "400",
						}}
					>
						Subscribers
					</Text>
				</Pressable>
				<Pressable
					android_ripple={{
						radius: 10,
						color: "gray",
					}}
					style={[
						styles.tab,
						{
							borderBottomWidth: !isSubscribers ? 1 : 0,
							borderBottomColor: !isSubscribers ? theme.PRIMARY : "transparent",
						},
					]}
					onPress={() => {
						setIsSubscribers(false);
						setHeaderTitle("Subscriptions");
					}}
				>
					<Text
						style={{
							color: !isSubscribers ? theme.PRIMARY : "white",
							fontWeight: !isSubscribers ? "700" : "400",
						}}
					>
						Subscriptions
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

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
});

export default UserStats;
