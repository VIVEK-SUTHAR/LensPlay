import { Animated, AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import useNetworkStore from "store/NetworkStore";
import Constants from "expo-constants";
import StyledText from "components/UI/StyledText";
import NetInfo from "@react-native-community/netinfo";
import Logger from "utils/logger";

const NetworkStatus = () => {
	const { isOffline, setIsOffline } = useNetworkStore();
	const slideIn = useRef(new Animated.Value(-100)).current;

	React.useEffect(() => {
		NetInfo.fetch().then((data) => {
			if (data.isConnected) {
				setIsOffline(true);
			} else if (!data.isConnected) {
				setIsOffline(false);
			}
		});
		const unsubscribe = NetInfo.addEventListener((data) => {
			Logger.Success("Network State", data);
			if (data.isConnected) {
				setIsOffline(true);
			} else if (!data.isConnected) {
				setIsOffline(false);
			}
		});
		AppState.addEventListener("memoryWarning", (state) => {
			Logger.Error("Memory Warning ", state);
		});

		return () => {
			unsubscribe();
		};
	}, []);
	useEffect(() => {
		if (!isOffline) {
			Animated.spring(slideIn, {
				toValue: 0,
				useNativeDriver: true,
				damping: 14,
			}).start();
		}
	}, [isOffline]);
	return (
		<>
			{!isOffline && (
				<Animated.View
					style={[
						styles.NetworkStatusContainer,
						{
							transform: [
								{
									translateY: slideIn,
								},
							],
						},
					]}
				>
					<StyledText
						title={"Looks like you are offline"}
						style={{
							fontSize: 14,
							color: "black",
							fontWeight: "600",
						}}
					/>
				</Animated.View>
			)}
		</>
	);
};

export default NetworkStatus;

const styles = StyleSheet.create({
	NetworkStatusContainer: {
		position: "absolute",
		top: Constants.statusBarHeight,
		height: 30,
		backgroundColor: "red",
		width: "100%",
		zIndex: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
