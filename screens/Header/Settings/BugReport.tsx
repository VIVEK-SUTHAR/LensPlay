import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Done from "assets/Icons/Done";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import Dropdown from "components/UI/Dropdown";
import Input from "components/UI/Input";
import StyledText from "components/UI/StyledText";
import TextArea from "components/UI/TextArea";
import { black, dark_primary } from "constants/Colors";
import type { RootStackScreenProps } from "customTypes/navigation";
import { ToastType } from "customTypes/Store";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { SetStateAction, useEffect, useState } from "react";
import {
	FlatList,
	Image,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useProfile, useThemeStore, useToast } from "store/Store";
import getImageBlobFromUri from "utils/getImageBlobFromUri";
import uploadImageToIPFS from "utils/uploadImageToIPFS";

export type BugCategory = {
	reason: string;
};

type BugSheetProps = {
	data: BugCategory[];
	bugSheetRef: React.RefObject<BottomSheetMethods>;
	activeReason: string;
	setActiveReason: React.Dispatch<SetStateAction<string>>;
};

const BugReport = ({ navigation }: RootStackScreenProps<"BugReport">) => {
	const toast = useToast();

	const { currentProfile } = useProfile();
	const bugSheetRef = React.useRef<BottomSheetMethods>(null);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [BugData, setBugData] = useState({
		bugType: "",
		description: "",
		email: "",
		imgLink: "",
		username: currentProfile?.handle,
	});
	const [image, setimage] = useState<string | null>(null);

	async function selectSS() {
		let coverresult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [1, 1],
			allowsEditing: true,
			quality: 1,
			base64: true,
		});
		if (!coverresult.canceled) {
			setimage(coverresult?.assets[0].uri);
		}
	}
	const [activeReason, setActiveReason] = React.useState("");

	useEffect(() => {
		setBugData({
			...BugData,
			bugType: activeReason,
		});
	}, [activeReason]);

	const reportData: BugCategory[] = [
		{
			reason: "UI",
		},
		{
			reason: "Feature",
		},
		{
			reason: "Other",
		},
	];

	async function sendReportData() {
		if (!BugData.bugType) {
			toast.show("Please select bug-type", ToastType.ERROR, true);
			return;
		}
		try {
			setIsUpdating(true);
			if (image) {
				const blob = await getImageBlobFromUri(image);
				const hash = await uploadImageToIPFS(blob);
				let bodyContent = JSON.stringify({
					...BugData,
					imgLink: `https://ipfs.io/ipfs/${hash}`,
				});
				let response = await fetch("https://lensplay-api.vercel.app/api/report", {
					method: "POST",
					body: bodyContent,
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					let data = await response.text();
					setIsUpdating(false);
					setBugData({
						bugType: "",
						description: "",
						email: "",
						imgLink: "",
						username: currentProfile?.handle,
					});
					setActiveReason("");
					if (image) {
						setimage(null);
					}
					toast.show("Thanks for reporting bug", ToastType.SUCCESS, true);
				}
			}
		} catch (error) {
		} finally {
			setIsUpdating(false);
		}
	}
	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar backgroundColor="black" style="auto" />
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ width: WINDOW_WIDTH, paddingHorizontal: 12, marginTop: 4 }}
			>
				<View>
					<StyledText
						title={"Bug Category"}
						style={{
							color: "white",
							fontSize: 18,
							alignSelf: "flex-start",
							marginVertical: 12,
							fontWeight: "700",
						}}
					/>
					<TouchableOpacity
						style={{
							marginVertical: 4,
							flexDirection: "row",
							alignItems: "center",
							backgroundColor: "#1d1d1d",
							height: 50,
							borderRadius: 8,
							paddingHorizontal: 16,
							justifyContent: "space-between",
						}}
						onPress={() => {
							bugSheetRef?.current?.snapToIndex(0);
						}}
					>
						<StyledText
							style={{ fontSize: 14, fontWeight: "600", color: "white" }}
							title={activeReason || "Bug Category"}
						/>
						<Icon name="arrowDown" size={16} />
					</TouchableOpacity>
				</View>
				<View style={{}}>
					{image && (
						<View>
							<Pressable
								onPress={() => setimage(null)}
								style={{ position: "absolute", zIndex: 1, right: 16, top: 14 }}
							>
								<Icon
									name="close"
									size={24}
									style={{
										color: "white",
									}}
								/>
							</Pressable>
							<Image source={{ uri: image }} style={styles.image} />
						</View>
					)}
					{!image && (
						<Pressable
							style={[
								styles.image,
								{
									backgroundColor: dark_primary,
									justifyContent: "center",
									width: "100%",
									marginTop: 8,
								},
							]}
							onPress={selectSS}
						>
							<StyledText
								title="Select Screenshot"
								style={{ color: "white", alignSelf: "center" }}
							/>
						</Pressable>
					)}
					<TextArea
						label="Bug Description"
						placeHolder={"Describe the bug you found"}
						value={BugData.description}
						onChange={(e) => {
							setBugData({
								...BugData,
								description: e.nativeEvent.text,
							});
						}}
					/>
					<Input
						label="Your email"
						placeHolder={"abc@gmail.com"}
						value={BugData.email}
						onChange={(e) => {
							setBugData({
								...BugData,
								email: e.nativeEvent.text,
							});
						}}
					/>
				</View>

				<Button
					title="Report a bug"
					width={"100%"}
					px={12}
					py={8}
					mt={12}
					borderRadius={8}
					textStyle={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "600",
					}}
					isLoading={isUpdating}
					onPress={sendReportData}
				/>
			</ScrollView>
			<BugSheet
				bugSheetRef={bugSheetRef}
				activeReason={activeReason}
				setActiveReason={setActiveReason}
				data={reportData}
			/>
		</KeyboardAvoidingView>
	);
};

function BugSheet({ data, bugSheetRef, activeReason, setActiveReason }: BugSheetProps) {
	const theme = useThemeStore();
	return (
		<Sheet
			ref={bugSheetRef}
			snapPoints={[280]}
			style={{
				height: "auto",
			}}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
		>
			<View style={{ padding: 16 }}>
				<StyledText
					title={"Select bug category"}
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginVertical: 4,
					}}
				/>
				<FlatList
					data={data}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								onPress={() => {
									setActiveReason(item?.reason);
									bugSheetRef.current?.close();
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "flex-start",
										alignItems: "center",
										gap: 16,
									}}
								>
									<StyledText
										title={item.reason}
										style={{
											color: "rgba(255,255,255,0.8)",
											fontSize: 18,
											fontWeight: "400",
											marginVertical: 16,
										}}
									/>
								</View>
								{activeReason === item.reason ? (
									<View
										style={{
											height: "auto",
											width: "auto",
											backgroundColor: theme.PRIMARY,
											borderRadius: 50,
											padding: 4,
											marginVertical: 16,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Done width={18} height={18} />
									</View>
								) : null}
							</Pressable>
						);
					}}
				/>
			</View>
		</Sheet>
	);
}

export default BugReport;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		// paddingHorizontal: 12
	},
	image: {
		width: "100%",
		borderRadius: 8,
		height: 280,
		marginTop: 8,
		alignSelf: "center",
		zIndex: 0,
	},
});
