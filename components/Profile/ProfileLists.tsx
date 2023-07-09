import { useNavigation } from "@react-navigation/native";
import Clock from "assets/Icons/Clock";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import React, { FC } from "react";
import { View, StyleSheet, Pressable } from "react-native";

type ProfileListItemProps = {
	label: string;
	icon: JSX.Element;
	onPress: () => void;
};

export default function ProfileLists() {
	const navigation = useNavigation();

	const ProfileLists = [
		{
			icon: <Icon name="clock" size={16}  />,
			label: "Watch Later",
			onPress: () => {
				navigation.navigate("WatchLater");
			},
		},
		// {
		// 	icon: <Icon name="images" size={16} />,
		// 	label: "PlayLists",
		// 	onPress: () => {
		// 		navigation.navigate("WatchLater");
		// 	},
		// },
	];

	return (
		<View
			style={{
				marginVertical: 24,
			}}
		>
			<Heading
				title={"Lists"}
				style={{
					fontSize: 24,
					fontWeight: "600",
					color: white[500],
				}}
			/>
			<View
				style={{
					backgroundColor: black[700],
					marginTop: 16,
					borderRadius: 12,
				}}
			>
				{ProfileLists.map((item, index) => {
					return (
						<ProfileListItem
							key={index}
							icon={item.icon}
							label={item.label}
							onPress={item.onPress}
						/>
					);
				})}
			</View>
		</View>
	);
}

export const Item: FC<ProfileListItemProps> = (item: ProfileListItemProps) => {
	return (
		<Pressable
			android_ripple={{
				color: black[200],
			}}
			style={styles.itemContainer}
			onPress={item.onPress}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				{item.icon}
				<StyledText title={item.label} style={styles.itemText} />
			</View>
			<Icon name="rightArrow" size={16} />
		</Pressable>
	);
};

const ProfileListItem = React.memo(Item);

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
	},
	itemText: {
		color: "white",
		fontSize: 16,
		paddingVertical: 24,
		paddingHorizontal: 12,
	},
});
