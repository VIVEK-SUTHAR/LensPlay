import Icon from "components/Icon";
import { ToastType } from "customTypes/Store";
import Constants from "expo-constants";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useToast } from "store/Store";

const StatusBarHeight = Constants.statusBarHeight;

const Toast = () => {
	const toastStore = useToast();

	const slideIn = useRef(new Animated.Value(-100)).current;
	const scale = useRef(new Animated.Value(0.5)).current;

	useEffect(() => {
		if (toastStore.isVisible) {
			Animated.spring(slideIn, {
				toValue: 0,
				useNativeDriver: true,
				damping: 10,
			}).start();
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true,
				damping: 14,
			}).start();
			setTimeout(() => {
				toastStore.show("", ToastType.INFO, false);
			}, 5000);
		}
	}, [toastStore.message]);
	useEffect(() => {
		if (!toastStore.isVisible) {
			Animated.spring(slideIn, {
				toValue: -100,
				useNativeDriver: true,
				damping: 10,
			}).start();
			Animated.spring(scale, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		}
	}, [toastStore.isVisible]);

	return (
		<Animated.View
			style={[
				styles.conatiner,
				{
					display: toastStore.isVisible ? "flex" : "none",
					backgroundColor:
						toastStore.type === ToastType.ERROR
							? "#ff4d4d"
							: toastStore.type === ToastType.INFO
							? "#FFAA1D"
							: "#2AD95C",
					transform: [
						{
							translateY: slideIn,
						},
						{
							scale: scale,
						},
					],
				},
			]}
		>
			<Icon
				name={
					toastStore.type === ToastType.ERROR
						? "report"
						: toastStore.type === ToastType.INFO
						? "info"
						: "success"
				}
				color={toastStore.type === ToastType.INFO ? "#000000" : "#FFFFFF"}
				style={{ marginHorizontal: 2 }}
				size={16}
			/>
			<Text
				style={{
					fontSize: 16,
					color: `${toastStore.type === ToastType.INFO ? "#000000" : "#FFFFFF"}`,
					fontWeight: "600",
					textAlign: "center",
					marginHorizontal: 2,
				}}
			>
				{toastStore.message}
			</Text>
		</Animated.View>
	);
};

export default Toast;

const styles = StyleSheet.create({
	conatiner: {
		position: "absolute",
		flexDirection: "row",
		top: StatusBarHeight + 20,
		height: 40,
		width: "auto",
		alignSelf: "center",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		alignItems: "center",
		zIndex: 100,
		borderRadius: 100,
		backgroundColor: "black",
	},
});
