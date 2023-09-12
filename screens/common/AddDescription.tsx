import { useFocusEffect } from "@react-navigation/native";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import { RootStackScreenProps } from "customTypes/navigation";
import React, { useCallback } from "react";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, TextInput, View } from "react-native";
import { AvoidSoftInput, useSoftInputHeightChanged } from "react-native-avoid-softinput";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useThemeStore, useToast } from "store/Store";
import { useUploadStore } from "store/UploadStore";

export default function AddDescription({ navigation }: RootStackScreenProps<"AddDescription">) {
	const theme = useThemeStore();
	const { description, setDescription } = useUploadStore();
	const toast = useToast();
	const windowHeight = Dimensions.get("window").height;

	const handleDescription = () => {
		if (!description?.trim()) return toast.error("Please enter description");
		if (description.trim().length > 1000) return toast.info("Description length exceeded");
		navigation.replace("AddDetails");
	};

	const buttonContainerPaddingValue = useSharedValue(0);

	const buttonContainerAnimatedStyle = useAnimatedStyle(() => {
		return {
			paddingBottom: buttonContainerPaddingValue.value,
		};
	});

	const onFocusEffect = React.useCallback(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);

		return () => {
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useFocusEffect(onFocusEffect);

	useSoftInputHeightChanged(({ softInputHeight }) => {
		buttonContainerPaddingValue.value = withTiming(softInputHeight);
	});

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<KeyboardAvoidingView
				style={{
					flex: 1,
				}}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<TextInput
						placeholder="Add description for your video"
						placeholderTextColor={"gray"}
						selectionColor={theme.PRIMARY}
						textAlignVertical="top"
						multiline={true}
						value={description ? description : ""}
						style={{
							paddingHorizontal: 16,
							paddingVertical: 24,
							fontSize: 20,
							height: "100%",
							color: "white",
						}}
						autoFocus={true}
						onChange={useCallback((e: { nativeEvent: { text: string } }) => {
							setDescription(e.nativeEvent.text);
						}, [])}
					/>
				</View>
			</KeyboardAvoidingView>
			<Animated.View style={[buttonContainerAnimatedStyle]}>
				<View
					style={{
						paddingHorizontal: 28,
						paddingVertical: windowHeight / 18,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<StyledText
						title={`${description ? description.length : 0}/1000`}
						style={{ color: "gray", fontSize: 16, fontWeight: "600" }}
					/>
					<Button
						title={"Save"}
						py={8}
						width={"30%"}
						textStyle={{
							justifyContent: "center",
							alignItems: "center",
							fontSize: 16,
							fontWeight: "600",
						}}
						onPress={handleDescription}
						bg={"white"}
					/>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}
