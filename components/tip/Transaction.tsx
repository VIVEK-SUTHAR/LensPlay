import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "components/UI/Avatar";
import { dark_primary } from "constants/Colors";
import { useNavigation } from "@react-navigation/native";
import getRawurl from "utils/getRawUrl";
import StyledText from "components/UI/StyledText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";
import Heading from "components/UI/Heading";
import Matic from "assets/Icons/Matic";
import Eth from "assets/Icons/Eth";
import Usdc from "assets/Icons/Usdc";
import Dai from "assets/Icons/Dai";
import { useSupportStore } from "store/Store";

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
				paddingHorizontal: 12,
				paddingVertical: 12,
				// borderBottomWidth: 1,
				borderTopColor: dark_primary,
				// borderWidth:2,
				// borderColor:"red"
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
				>
					<View
						style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
					>
						<Image
							// source={require("../../assets/images/home.png")}
							source={{
								uri: "https://creatorspace.imgix.net/users/cliyb7e4u01d6ry01z06snm45/xEIcd55aBLMJ3oyj-nyoling.png?w=300&h=300",
							}}
							style={{ width: 48, height: 48, borderRadius: 50 }}
						/>
						<View style={{ flexDirection: "row" }}>
							<Pressable onPress={goToChannel}></Pressable>
							<View
								style={{ flexDirection: "column", alignItems: "flex-start", paddingHorizontal: 16 }}
							>
								{/* <StyledText
									title={
										"Vivek Suthar"
									}
									style={{ color: "white", fontWeight: "500",fontSize:20}}
								/> */}
								<View style={styles.textContainer}>
									<Heading title={"Vivek Suthar"} style={styles.heading} numberOfLines={1} />
								</View>
								<StyledText title={"22 Aug at 12:30 PM"} style={{ color: "gray", fontSize: 14 }} />
							</View>
						</View>
					</View>
					<View style={{ flexDirection: "row", paddingHorizontal: 4,gap:4 }}>
						<Matic height={24} width={24} />
						<StyledText
							title={"300 MATIC"}
							numberOfLines={2}
							style={{ color: "grey", fontSize: 18, fontWeight: "600" }}
						/>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default Transaction;

const styles = StyleSheet.create({
	textContainer: {
		maxWidth: Dimensions.get("window").width / 2.5,
	},
	heading: {
		color: "white",
		fontSize: 20,
		fontWeight: "500",
	},
});
