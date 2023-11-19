import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Sheet from "components/Bottom";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { black } from "constants/Colors";
import * as ImagePicker from "expo-image-picker";
import getFileSize from "utils/video/getFileSize";
import Logger from "utils/logger";
import canUploadedToIpfs from "utils/canUploadToIPFS";
import { useToast } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import { useNavigation } from "@react-navigation/native";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";

type Props = {
	uploadTypeSheetRef: React.RefObject<BottomSheetMethods>;
};

const UploadType = ({ uploadTypeSheetRef: uploadTypeRef }: Props) => {
	const [status, requestPermission] = ImagePicker.useCameraPermissions();
	const toast = useToast();
	const uploadStore = useUploadStore();
	const navigation = useNavigation();
	return (
		<Sheet
			ref={uploadTypeRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			snapPoints={[190]}
		>
			<View
				style={{
					maxWidth: "100%",
					height: "100%",
				}}
			>
				<Pressable
					android_ripple={{
						color: "rgba(0,0,0,0.2)",
					}}
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
					onPress={async () => {
						if (!status?.granted) {
							requestPermission();
						}
						if (status?.granted) {
							let camera = await ImagePicker.launchCameraAsync({
								mediaTypes: ImagePicker.MediaTypeOptions.Videos,
							});
							if (camera.canceled) {
								// ToastAndroid.show("No Video recorded", ToastAndroid.SHORT);
								uploadTypeRef.current?.close();
							}
							if (!camera.canceled) {
								const size = await getFileSize(camera.assets[0].uri);
								Logger.Success("ye size he", size);
								if (!canUploadedToIpfs(size)) {
									toast.error("Selected video is greater than 5GB");
									return;
								}
								uploadStore.setDuration(camera.assets[0].duration!);
								navigation.push("UploadVideo", {
									localUrl: camera.assets[0].uri,
									duration: camera.assets[0].duration,
								});
							}
						}
					}}
				>
					<View
						style={{
							padding: 16,
							backgroundColor: "black",
							borderRadius: 50,
						}}
					>
						<Icon name="record" size={24} />
					</View>
					<StyledText
						title={"Record a video"}
						style={{
							color: "white",
							fontSize: 20,
							marginHorizontal: 16,
						}}
					/>
				</Pressable>
				<Pressable
					android_ripple={{
						color: "rgba(0,0,0,0.2)",
					}}
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						paddingVertical: 8,
					}}
					onPress={async () => {
						let result = await ImagePicker.launchImageLibraryAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Videos,
							allowsEditing: true,
							quality: 1,
							base64: true,
						});
						if (result.canceled) {
							uploadTypeRef.current?.close();
						}
						if (!result.canceled) {
							const size = await getFileSize(result.assets[0].uri);
							Logger.Success("ye gallery size he", size);
							if (!canUploadedToIpfs(size)) {
								toast.error("Select video is greater than 100MB");
								return;
							}
							uploadStore.setDuration(result.assets[0].duration!);
							navigation.push("UploadVideo", {
								localUrl: result.assets[0].uri,
								duration: result.assets[0].duration,
							});
						}
					}}
				>
					<View
						style={{
							padding: 16,
							backgroundColor: "black",
							borderRadius: 50,
						}}
					>
						<Icon name="upload-file" size={24} />
					</View>
					<StyledText
						title={"Select from gallery"}
						style={{
							color: "white",
							fontSize: 20,
							marginHorizontal: 16,
						}}
					/>
				</Pressable>
			</View>
		</Sheet>
	);
};

export default UploadType;

const styles = StyleSheet.create({});
