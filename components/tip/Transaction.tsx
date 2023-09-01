import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import { dark_primary } from "constants/Colors";
import { useNavigation } from "@react-navigation/native";
import getRawurl from "utils/getRawUrl";
import StyledText from "components/UI/StyledText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";

type TransactionProps = {};

const Transaction = ({}: TransactionProps) => {
	const navigation = useNavigation();
	const goToChannel = () => {
		navigation.navigate("EditProfile");
	};
	return (
		<Pressable
			android_ripple={{
				borderless: false,
				color: "rgba(255,255,255,0.1)",
			}}
			style={{
				flexDirection: "row",
				padding: 12,
				borderBottomWidth: 1,
				borderBottomColor: dark_primary,
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
				>
					<View style={{ flexDirection: "row", paddingHorizontal: 4 }}>
						<Pressable onPress={goToChannel}>
							{/* <Avatar src={require('../../assets/images/circle.webp')} height={35} width={35} /> */}
						</Pressable>
						<View
							style={{ flexDirection: "column", alignItems: "flex-start", paddingHorizontal: 8 }}
						>
							<StyledText
								title={
									// notification?.profile?.handle?.split(".")[0] ||
									// formatAddress(notification?.profile?.ownedBy)
									"this and that"
								}
								style={{ color: "white", fontWeight: "500" }}
							/>
							<StyledText
								// title={` mirrored your ${
								// 	notification?.publication?.__typename == "Post"
								// 		? "post"
								// 		: notification?.publication?.__typename == "Comment"
								// 		? "comment"
								// 		: "mirrored post"
								// }`}
								title={"22 Aug at 12:30 PM"}
								style={{ color: "gray" }}
							/>
							{/* <StyledText
								// title={getDifference(notification?.createdAt)}
                                title={'aur ek'}
								style={{ fontSize: 10, color: "gray" }}
							/> */}
						</View>
					</View>
					<View style={{ flexDirection: "row", paddingHorizontal: 4 }}>
						<Image
							source={require("../../assets/images/error.png")}
							style={{ width: 24, height: 24, borderRadius: 50, marginHorizontal: 8 }}
						/>
						<StyledText
							title={"300 Matic"}
							numberOfLines={2}
							style={{ color: "grey", fontSize: 18 }}
						/>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default Transaction;

// const styles = StyleSheet.create({});
