import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { black, white } from "constants/Colors";
import React, { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { color } from "react-native-reanimated";

export const Tab = createMaterialTopTabNavigator();

export default function Tabs({ children }: { children: ReactNode }) {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarScrollEnabled: true,
				tabBarLabelStyle: {
					fontSize: 16,
					fontWeight: "600",
					textTransform: "capitalize",
					fontFamily: "OpenSans_SemiBold",
				},
				tabBarItemStyle: {
					width: "auto",
					height: "auto",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: {
					backgroundColor: "black",
					borderBottomWidth: 1,
					borderBottomColor: black[600],
				},
				tabBarIndicatorStyle: {
					display: "none",
				},
				lazy: true,
				lazyPlaceholder: () => <LazyTabPlaceHolder />,
			}}
		>
			{children}
		</Tab.Navigator>
	);
}
const LazyTabPlaceHolder = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: black[800],
			}}
		>
			<ActivityIndicator size={"small"} color={white[500]} />
		</View>
	);
};
