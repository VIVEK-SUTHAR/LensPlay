import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Button from "components/UI/Button";
import StyledText from "components/UI/StyledText";
import TextArea from "components/UI/TextArea";
import { black, dark_primary } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import { PublicationReportingReason, useReportPublicationMutation } from "customTypes/generated";
import { RootStackScreenProps } from "customTypes/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
	BackHandler,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useAuthStore, useThemeStore, useToast } from "store/Store";
import TrackAction from "utils/Track";

type subreason = {
	reason: string;
};

export type RESONTYPEDATA = {
	reason: PublicationReportingReason;
	subReason: subreason[];
};

const ReportPublication = ({ navigation, route }: RootStackScreenProps<"ReportPublication">) => {
	const handleBack = () => {
		navigation.goBack();
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBack);
	}, []);

	const reportData: RESONTYPEDATA[] = [
		{
			reason: PublicationReportingReason.Sensitive,
			subReason: [{ reason: "NSFW" }, { reason: "OFFENSIVE" }],
		},
		{
			reason: PublicationReportingReason.Illegal,
			subReason: [{ reason: "ANIMAL_ABUSE" }, { reason: "HUMAN_ABUSE" }],
		},
		{
			reason: PublicationReportingReason.Fraud,
			subReason: [{ reason: "SCAM" }, { reason: "IMPERSONATION" }],
		},
	];

	const [activeReason, setActiveReason] = useState<RESONTYPEDATA>(reportData[0]);
	const [activeSubReason, setActiveSubReason] = useState<string>(activeReason.subReason[0].reason);
	const [addiText, setAddiText] = useState<string>("");
	const theme = useThemeStore();
	const toast = useToast();
	const { accessToken } = useAuthStore();
	const { isGuest } = useGuestStore();
	const reportRef = useRef<BottomSheetMethods>(null);
	const subReasonRef = useRef<BottomSheetMethods>(null);

	const handleReasonChange = React.useCallback((type: RESONTYPEDATA) => {
		setActiveReason(type);
	}, []);

	const handleSubReasonChange = React.useCallback((subreason: string) => {
		setActiveSubReason(subreason);
	}, []);

	const getReasonType = (type: string) => {
		if (type === "ILLEGAL") {
			return "illegalReason";
		}
		if (type === "FRAUD") {
			return "fraudReason";
		}
		if (type === "SENSITIVE") {
			return "sensitiveReason";
		}
		return "illegalReason";
	};

	const [createReport] = useReportPublicationMutation({
		onError: () => {
			toast.show("Something went wrong!", ToastType.ERROR, true);
		},
		onCompleted: () => {
			toast.show("Thanks for reporting", ToastType.SUCCESS, true);
		},
	});

	const handleReport = async () => {
		if (!activeReason?.reason || !activeSubReason) {
			toast.show("Please select type and reason", ToastType.ERROR, true);
			return;
		}
		if (isGuest) {
			toast.show("Please Login", ToastType.ERROR, true);
			return;
		}
		try {
			createReport({
				variables: {
					request: {
						publicationId: route.params.publicationId,
						reason: {
							[getReasonType(activeReason.reason)]: {
								reason: activeReason.reason,
								subreason: activeSubReason,
							},
						},
						additionalComments: addiText ? addiText : null,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
					},
				},
			});
			TrackAction(PUBLICATION.REPORT);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
			}
		} finally {
			setAddiText("");
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<ScrollView
				style={{ width: "100%", flex: 1 }}
				contentContainerStyle={{
					alignItems: "center",
				}}
			>
				<StyledText
					title={"Select Reason"}
					style={{
						color: "white",
						fontSize: 16,
						fontWeight: "600",
						alignSelf: "flex-start",
						paddingHorizontal: 16,
					}}
				/>

				<Pressable
					style={{
						paddingHorizontal: 16,
						paddingVertical: 16,
						marginHorizontal: 8,
						borderRadius: 8,
						backgroundColor: dark_primary,
						marginVertical: 16,
						width: "90%",
					}}
					onPress={(e) => {
						reportRef?.current?.snapToIndex(0);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<StyledText
							title={activeReason.reason}
							style={{
								color: "white",
								fontSize: 16,
								fontWeight: "500",
								maxWidth: "75%",
							}}
						/>
						<Icon name="arrowForward" size={16} />
					</View>
				</Pressable>
				<StyledText
					title={"Select Type"}
					style={{
						color: "white",
						fontSize: 16,
						fontWeight: "600",
						alignSelf: "flex-start",
						paddingHorizontal: 16,
					}}
				/>

				<Pressable
					style={{
						paddingHorizontal: 16,
						paddingVertical: 16,
						marginHorizontal: 8,
						borderRadius: 8,
						backgroundColor: dark_primary,
						marginVertical: 16,
						width: "90%",
					}}
					onPress={(e) => {
						subReasonRef?.current?.snapToIndex(0);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<StyledText
							title={activeSubReason.replace("_", " ")}
							style={{
								color: "white",
								fontSize: 16,
								fontWeight: "500",
								maxWidth: "75%",
							}}
						/>
						<Icon name="arrowForward" size={16} />
					</View>
				</Pressable>
				<View style={styles.inputContainer}>
					<TextArea
						rows={6}
						placeHolder={""}
						label="Additional"
						value={addiText}
						onChange={(e) => {
							e.preventDefault();
							setAddiText(e.nativeEvent.text);
						}}
					/>
				</View>
			</ScrollView>
			<View
				style={[
					styles.inputContainer,
					{ position: "absolute", bottom: Platform.OS === "ios" ? 32 : 16 },
				]}
			>
				<Button
					title="Report now"
					width={"100%"}
					py={12}
					px={16}
					bg="#DC0000"
					borderRadius={8}
					disabled={!activeReason.reason || !activeSubReason}
					textStyle={{
						textAlign: "center",
						fontSize: 16,
						fontWeight: "600",
						color: "white",
					}}
					onPress={handleReport}
				/>
			</View>
			<ReportTypeSheet
				reportRef={reportRef}
				reasonData={reportData}
				activeReason={activeReason}
				setActiveReason={handleReasonChange}
				setActiveSubReason={handleSubReasonChange}
			/>
			<ReportSubReasonSheet
				subReasonRef={subReasonRef}
				subreasonData={activeReason.subReason}
				activeSubReason={activeSubReason}
				setActiveSubReason={handleSubReasonChange}
			/>
		</KeyboardAvoidingView>
	);
};

function ReportTypeSheet({
	reportRef,
	reasonData,
	activeReason,
	setActiveReason,
	setActiveSubReason,
}: {
	reportRef: React.RefObject<BottomSheetMethods>;
	reasonData: RESONTYPEDATA[];
	activeReason: RESONTYPEDATA;
	setActiveReason: (reason: RESONTYPEDATA) => void;
	setActiveSubReason: (subreason: string) => void;
}) {
	const theme = useThemeStore();
	return (
		<Sheet
			ref={reportRef}
			snapPoints={[290]}
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
					title={"Select the type of report"}
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginVertical: 8,
					}}
				/>
				<FlatList
					data={reasonData}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								onPress={() => {
									setActiveReason(item);
									setActiveSubReason(item.subReason[0].reason);
									reportRef.current?.close();
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
								{activeReason.reason === item.reason ? (
									<View
										style={{
											height: "auto",
											width: "auto",
											backgroundColor:
												activeReason.reason === item.reason ? theme.PRIMARY : "black",
											borderRadius: 50,
											padding: 4,
											marginVertical: 16,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Icon
											name={"done"}
											color={activeReason.reason === item.reason ? "black" : "white"}
											size={18}
										/>
									</View>
								) : (
									<></>
								)}
							</Pressable>
						);
					}}
				/>
			</View>
		</Sheet>
	);
}

function ReportSubReasonSheet({
	subReasonRef,
	subreasonData,
	activeSubReason,
	setActiveSubReason,
}: {
	subReasonRef: React.RefObject<BottomSheetMethods>;
	subreasonData: subreason[];
	activeSubReason: string;
	setActiveSubReason: (subreason: string) => void;
}) {
	const theme = useThemeStore();
	return (
		<Sheet
			ref={subReasonRef}
			snapPoints={[210]}
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
					title={"Select the type of report"}
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginVertical: 8,
					}}
				/>
				<FlatList
					data={subreasonData}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								onPress={() => {
									setActiveSubReason(item.reason);
									subReasonRef.current?.close();
								}}
							>
								<StyledText
									title={item.reason.replace("_", " ")}
									style={{
										color: "rgba(255,255,255,0.8)",
										fontSize: 18,
										fontWeight: "400",
										marginVertical: 16,
									}}
								/>
								{activeSubReason === item.reason ? (
									<View
										style={{
											height: "auto",
											width: "auto",
											backgroundColor: activeSubReason === item.reason ? theme.PRIMARY : "black",
											borderRadius: 50,
											padding: 4,
											marginVertical: 16,
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Icon
											name={"done"}
											color={activeSubReason === item.reason ? "black" : "white"}
											size={18}
										/>
									</View>
								) : (
									<></>
								)}
							</Pressable>
						);
					}}
				/>
			</View>
		</Sheet>
	);
}

export default ReportPublication;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		paddingVertical: 16,
	},
	textStyle: {
		color: "white",
		fontWeight: "700",
		marginBottom: 4,
		fontSize: 16,
	},
	inputContainer: {
		width: "90%",
		marginVertical: 12,
	},
	input: {
		backgroundColor: dark_primary,
		color: "white",
		borderWidth: 1,
		marginTop: 18,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
});
