import Icon from "components/Icon";
import { white } from "constants/Colors";
import React from "react";
import { Pressable, View } from "react-native";
import { useCreateShotStore } from "store/CreateShotStore";

export default function ShotControllers() {
	const { isBackCamera, isFlashOn, isMute, setIsBackCamera, setIsFlashOn, setIsMute } =
		useCreateShotStore();
	return (
		<View
			style={{
				backgroundColor: "rgba(0,0,0,0.4)",
				paddingHorizontal: 8,
				paddingVertical: 16,
				borderRadius: 16,
				gap: 16,
			}}
		>
			<Pressable
				onPress={() => {
					setIsBackCamera(!isBackCamera);
				}}
			>
				<Icon name="arrowDown" size={24} color={white[400]} />
			</Pressable>
			<Pressable
				onPress={() => {
					setIsFlashOn(!isFlashOn);
				}}
			>
				<Icon name="create" size={24} color={white[400]} />
			</Pressable>
			<Pressable
				onPress={() => {
					setIsMute(!isMute);
				}}
			>
				<Icon name="discord" size={24} color={white[400]} />
			</Pressable>
		</View>
	);
}
