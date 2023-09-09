import { useNavigation } from "@react-navigation/native";
import Matic from "assets/Icons/Matic";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { dark_primary, primary, white } from "constants/Colors";
import { Tip } from "customTypes/Store";
import { Profile } from "customTypes/generated";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import convertDate from "utils/formateDate";
import getRawurl from "utils/getRawUrl";
type TransactionProps = {
	donorProfile: Profile;
	tip: Tip;
};

const Transaction = ({ donorProfile, tip }: TransactionProps) => {
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
				borderTopColor: dark_primary,
			}}
		>
			<View style={{ flex: 1 }}>
				<View
					style={{ flexDirection: "row", justifyContent: "space-between" }}
				>
					<View
						style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
					>
						<Avatar src={getRawurl(donorProfile?.picture)} height={40} width={40} />
						<View style={{ flexDirection: "row" }}>
							<Pressable onPress={goToChannel}></Pressable>
							<View
								style={{ flexDirection: "column", alignItems: "flex-start", paddingHorizontal: 10 }}
							>
								<View style={styles.textContainer}>
									<Heading
										title={donorProfile?.name || donorProfile?.handle}
										style={styles.heading}
										numberOfLines={1}
									/>
								</View>
								<StyledText
									title={convertDate(tip?.tippedAt)}
									style={{ color: "gray", fontSize: 12 }}
								/>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: "row", padding: 4, gap: 4 }}>
						{/* <Matic height={20} width={20} /> */}
						<StyledText
							title={ "+ " + tip?.amount }
							numberOfLines={2}
							style={{ color: primary, fontSize: 16, fontWeight: "600" }}
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
		fontSize: 16,
		fontWeight: "500",
	},
});
