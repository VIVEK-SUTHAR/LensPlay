import Icon from "components/Icon";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import Input from "components/UI/Input";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { black } from "constants/Colors";
import { LiveStreamQuality } from "customTypes/Store";
import { RootStackScreenProps } from "customTypes/navigation";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	PermissionsAndroid,
	Platform,
	Pressable,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useLiveStreamStore from "store/LiveStreamStore";
import { useProfile, useThemeStore, useToast } from "store/Store";
import createStream from "utils/liveStream/createStream";

type SettingsType = {
	title: string;
	value: boolean;
	onPress: () => void;
};

export default function LiveStreamSettings({
	navigation,
}: RootStackScreenProps<"LiveStreamSettings">) {
	const {
		recordStream,
		isFrontCamera,
		streamTitle,
		streamQuality,
		setIsFrontCamera,
		setRecordStream,
		setStreamQuality,
		setStreamTitle,
		setStreamKey,
	} = useLiveStreamStore();
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { currentProfile } = useProfile();

	const settings: SettingsType[] = [
		{
			title: "Want to record a stream?",
			value: recordStream,
			onPress: () => {
				setRecordStream(!recordStream);
			},
		},
		{
			title: "Want to stream through front camera?",
			value: isFrontCamera,
			onPress: () => {
				setIsFrontCamera(!isFrontCamera);
			},
		},
	];

	const LiveStreamQuality: LiveStreamQuality[] = ["High", "Medium", "Low"];

	const handleTitle = React.useCallback((e: { nativeEvent: { text: string } }) => {
		setStreamTitle(e.nativeEvent.text);
	}, []);

	const requestCameraPermissionForAndorid = async () => {
		try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			]);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const handleSubmit = async () => {
		if (streamTitle.trim().length === 0) {
			toast.error("Please enter title");
			return;
		}

		if (Platform.OS === "android") {
			const hasPermission = await requestCameraPermissionForAndorid();
			if (hasPermission) {
				const data = await createStream(streamTitle, currentProfile?.ownedBy, recordStream);
				if (data) {
					setStreamKey(data.streamKey);
					navigation.replace("GoLive");
				} else {
					toast.error("something went wrong");
				}
			} else {
				toast.error("permission denied");
			}
		} else {
			navigation.replace("GoLive");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />
			<ScrollView
				style={{
					padding: 16,
				}}
			>
				{settings.map((setting, index) => (
					<View
						key={index}
						style={{
							paddingVertical: 16,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<StyledText
							title={setting.title}
							style={{
								color: "white",
								fontWeight: "600",
								fontSize: 20,
								maxWidth: "80%",
							}}
						/>
						<Switch handleOnPress={setting.onPress} value={setting.value} />
					</View>
				))}
				<Input
					placeHolder="Enter title"
					onChange={(e) => handleTitle(e)}
					label={"Livestream Title"}
					value={streamTitle}
				/>
				<View
					style={{
						marginVertical: 16,
					}}
				>
					<Heading
						title={"Choose stream quality"}
						style={{
							color: "white",
							fontWeight: "600",
							fontSize: 20,
							maxWidth: "80%",
						}}
					/>
					<View
						style={{
							backgroundColor: black[600],
							marginTop: 16,
							borderRadius: 12,
						}}
					>
						{LiveStreamQuality.map((quality, index) => (
							<Pressable
								key={index}
								android_ripple={{
									color: "white",
								}}
								style={styles.itemContainer}
								onPress={() => {
									setStreamQuality(quality);
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<StyledText title={quality} style={styles.itemText} />
								</View>
								{streamQuality === quality ? (
									<Icon name="success" size={16} color={PRIMARY} />
								) : null}
							</Pressable>
						))}
					</View>
				</View>
			</ScrollView>
			<View
				style={{
					padding: 16,
					backgroundColor: "black",
				}}
			>
				<Button
					title="Go Live"
					width={"100%"}
					py={16}
					textStyle={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "600",
					}}
					onPress={handleSubmit}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.4)",
	},
	itemText: {
		color: "white",
		fontSize: 16,
		paddingVertical: 20,
		paddingHorizontal: 8,
		fontWeight: "500",
	},
});
