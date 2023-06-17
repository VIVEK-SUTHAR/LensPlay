import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Dai from "assets/Icons/Dai";
import Eth from "assets/Icons/Eth";
import Matic from "assets/Icons/Matic";
import Percent from "assets/Icons/Percent";
import Usdc from "assets/Icons/Usdc";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Input from "components/UI/Input";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { black, dark_primary, primary } from "constants/Colors";
import React from "react";
import { FlatList, Platform, ScrollView } from "react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";

const TokenList: TokenListItem[] = [
	{
		name: "WMATIC",
		contract: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
		icon: <Matic height={40} width={40} />,
	},
	{
		name: "WETH",
		contract: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		icon: <Eth height={40} width={40} />,
	},
	{
		name: "USDC",
		contract: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		icon: <Usdc height={40} width={40} />,
	},
	{
		name: "DAI",
		contract: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
		icon: <Dai height={40} width={40} />,
	},
];

type TokenSheetProps = {
	tokenSheetRef: React.RefObject<BottomSheetMethods>;
	TokenList: TokenListItem[];
	activeToken: String;
};

export type TokenListItem = {
	name: string;
	contract: string;
	icon: JSX.Element;
};

export default function SelectCollectModule() {
	const { collectModule, setCollectModule, setDisableCollect } = useUploadStore();
	const theme = useThemeStore();
	const tokemSheetRef = React.useRef<BottomSheetMethods>(null);
	console.log(collectModule);

	return (
		<>
			<ScrollView style={styles.container}>
				<View style={styles.itemsContainer}>
					<View style={styles.itemContainer}>
						<View
							style={{
								width: "85%",
							}}
						>
							<StyledText title={"Make this Video collectible"} style={styles.itemText} />
							<StyledText
								title={"By enabling this, your video will be collectible by others as NFT"}
								style={{
									color: "gray",
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
						</View>
						<Switch
							value={!collectModule.isRevertCollect}
							handleOnPress={() => {
								console.log(collectModule.isRevertCollect ? "collect disabled" : "collect enabled");

								if (!collectModule.isRevertCollect) {
									setDisableCollect();
								} else {
									setCollectModule({
										...collectModule,
										type: "freeCollectModule",
										isFreeCollect: true,
										isRevertCollect: false,
									});
								}
							}}
							activeTrackColor={primary}
							inActiveTrackColor="rgba(255,255,255,0.2)"
							thumbColor="white"
						/>
					</View>
					{!collectModule?.isRevertCollect ? (
						<View style={styles.itemContainer}>
							<View
								style={{
									width: "85%",
								}}
							>
								<StyledText title={"Followers only"} style={styles.itemText} />
								<StyledText
									title={"By enabling this, Only your followers will be able to collect this video"}
									style={{
										color: "gray",
										fontSize: 14,
										fontWeight: "500",
									}}
								/>
							</View>
							<Switch
								value={collectModule.followerOnlyCollect!}
								handleOnPress={() => {
									console.log(
										collectModule.isRevertCollect ? "collect disabled" : "collect enabled"
									);

									if (!collectModule.followerOnlyCollect) {
										setCollectModule({
											...collectModule,
											followerOnlyCollect: true,
										});
									} else {
										setCollectModule({
											...collectModule,
											followerOnlyCollect: false,
										});
									}
								}}
								activeTrackColor={primary}
								inActiveTrackColor="rgba(255,255,255,0.2)"
								thumbColor="white"
							/>
						</View>
					) : null}
					{!collectModule?.isRevertCollect ? (
						<View style={styles.itemContainer}>
							<View
								style={{
									width: "85%",
								}}
							>
								<StyledText title={"Paid Collect"} style={styles.itemText} />
								<StyledText
									title={"By enabling this, You will get paid when someone collect's your post"}
									style={{
										color: "gray",
										fontSize: 14,
										fontWeight: "500",
									}}
								/>
							</View>
							<Switch
								value={collectModule.isPaidCollect!}
								handleOnPress={() => {
									if (!collectModule.isPaidCollect) {
										if (collectModule.isTimedCollect && collectModule.isLimitedCollect){
											setCollectModule({
												...collectModule,
												type: "limitedTimedFeeCollectModule",
												isPaidCollect: true,
											});
										}
										else if (collectModule.isTimedCollect){
											setCollectModule({
												...collectModule,
												type: "timedFeeCollectModule",
												isPaidCollect: true,
											});
										}
										else if (collectModule.isLimitedCollect){
											setCollectModule({
												...collectModule,
												type: "limitedFeeCollectModule",
												isPaidCollect: true,
											});
										}
										else {
											setCollectModule({
												...collectModule,
												type: "feeCollectModule",
												isPaidCollect: true,
											});
										}
									} else {
										setCollectModule({
											...collectModule,
											type: "freCollectModule",
											isPaidCollect: false,
										});
									}
								}}
								activeTrackColor={primary}
								inActiveTrackColor="rgba(255,255,255,0.2)"
								thumbColor="white"
							/>
						</View>
					) : null}

					{collectModule?.isPaidCollect ? (
						<View
							style={{
								justifyContent: "space-between",
							}}
						>
							<StyledText
								title={"Collect Fee"}
								style={{
									color: "white",
									fontWeight: "700",
									marginBottom: 8,
									fontSize: 16,
								}}
							/>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<TextInput
									placeholder="Collect Fee"
									value={collectModule?.feeCollectDetails?.amount!}
									placeholderTextColor="gray"
									selectionColor={primary}
									style={{
										backgroundColor: dark_primary,
										color: "white",
										paddingHorizontal: 16,
										paddingVertical: Platform.OS === "ios" ? 16 : 8,
										borderTopLeftRadius: 8,
										borderBottomLeftRadius: 8,
										flex: 0.7,
										// width: "90%",
									}}
									keyboardType="number-pad"
									onChange={(e) => {
										e.preventDefault();
										setCollectModule({
											...collectModule,
											feeCollectDetails: {
												...collectModule.feeCollectDetails!,
												amount: e.nativeEvent.text,
											},
										});
									}}
								/>
								<View
									style={{
										flex: 0.008,
										backgroundColor: black[800],
									}}
								/>
								<Pressable
									style={{
										flex: 0.292,
										backgroundColor: dark_primary,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										borderTopRightRadius: 8,
										borderBottomRightRadius: 8,
									}}
									onPress={() => {
										tokemSheetRef?.current?.snapToIndex(0);
									}}
								>
									<StyledText
										title={collectModule?.feeCollectDetails?.name}
										style={{
											color: primary,
											fontSize: 12,
											fontWeight: "600",
										}}
									/>
									<Icon
										name="arrowDown"
										color={primary}
										size={14}
										style={{
											marginLeft: 4,
										}}
									/>
								</Pressable>
							</View>
							<View style={[styles.itemContainer, { marginTop: 16 }]}>
								<View
									style={{
										width: "80%",
									}}
								>
									<StyledText title={"Limited for 24 hours"} style={styles.itemText} />
									<StyledText
										title={"By enabling this, You will limit collects for first 24h only"}
										style={{
											color: "gray",
											fontSize: 14,
											fontWeight: "500",
										}}
									/>
								</View>
								<Switch
									value={collectModule.isTimedCollect!}
									handleOnPress={() => {
										if (!collectModule.isTimedCollect && collectModule.isLimitedCollect) {
											setCollectModule({
												...collectModule,
												type: "limitedTimedFeeCollectModule",
												isTimedCollect: true,
											});
										} else if (!collectModule.isTimedCollect && !collectModule.isLimitedCollect) {
											setCollectModule({
												...collectModule,
												type: "timedFeeCollectModule",
												isTimedCollect: true,
											});
										} else if (collectModule.isTimedCollect && collectModule.isLimitedCollect) {
											setCollectModule({
												...collectModule,
												type: "limitedFeeCollectModule",
												isTimedCollect: false,
											});
										} else {
											setCollectModule({
												...collectModule,
												type: "feeCollectModule",
												isTimedCollect: false,
											});
										}
									}}
									activeTrackColor={primary}
									inActiveTrackColor="rgba(255,255,255,0.2)"
									thumbColor="white"
								/>
							</View>
							<View style={[styles.itemContainer]}>
								<View
									style={{
										width: "80%",
									}}
								>
									<StyledText title={"Limit Collect Count"} style={styles.itemText} />
									<StyledText
										title={"By enabling this, You will limit the number of collects for your Video"}
										style={{
											color: "gray",
											fontSize: 14,
											fontWeight: "500",
										}}
									/>
								</View>
								<Switch
									value={collectModule.isLimitedCollect!}
									handleOnPress={() => {
										if (!collectModule.isLimitedCollect && collectModule.isTimedCollect) {
											setCollectModule({
												...collectModule,
												type: "limitedTimedFeeCollectModule",
												isLimitedCollect: true,
											});
										} else if (!collectModule.isLimitedCollect && !collectModule.isTimedCollect) {
											setCollectModule({
												...collectModule,
												type: "limitedFeeCollectModule",
												isLimitedCollect: true,
											});
										} else if (collectModule.isLimitedCollect && collectModule.isTimedCollect) {
											setCollectModule({
												...collectModule,
												type: "timedFeeCollectModule",
												isLimitedCollect: false,
											});
										} else {
											setCollectModule({
												...collectModule,
												type: "feeCollectModule",
												isLimitedCollect: false,
											});
										}
									}}
									activeTrackColor={primary}
									inActiveTrackColor="rgba(255,255,255,0.2)"
									thumbColor="white"
								/>
							</View>
							{collectModule?.isLimitedCollect ? (
								<View>
									<StyledText
										title={"Collect Limit"}
										style={{
											color: "white",
											fontWeight: "700",
											marginBottom: 8,
											fontSize: 16,
										}}
									/>
									<TextInput
										placeholder="number of collects"
										value={collectModule?.limitedCollectCount!}
										placeholderTextColor="gray"
										selectionColor={primary}
										style={{
											backgroundColor: dark_primary,
											color: "white",
											paddingHorizontal: 16,
											paddingVertical: Platform.OS === "ios" ? 16 : 8,
											borderRadius: 8,
											flex: 1,
											marginBottom: 8,
											// // width: "90%",
										}}
										keyboardType="number-pad"
										onChange={(e) => {
											e.preventDefault();
											setCollectModule({
												...collectModule,
												limitedCollectCount: e.nativeEvent.text,
											});
										}}
									/>
								</View>
							) : null}
							<View style={styles.itemContainer}>
								<View
									style={{
										width: "80%",
									}}
								>
									<StyledText title={"Referral reward on mirror"} style={styles.itemText} />
									<StyledText
										title={"Share your rewards with someone who support your work"}
										style={{
											color: "gray",
											fontSize: 14,
											fontWeight: "500",
										}}
									/>
								</View>
								<Switch
									value={collectModule.isRefferalEnabled!}
									handleOnPress={() => {
										if (!collectModule.isRefferalEnabled) {
											setCollectModule({
												...collectModule,
												isRefferalEnabled: true,
											});
										} else {
											setCollectModule({
												...collectModule,
												isRefferalEnabled: false,
											});
										}
									}}
									activeTrackColor={primary}
									inActiveTrackColor="rgba(255,255,255,0.2)"
									thumbColor="white"
								/>
							</View>
							{collectModule?.isRefferalEnabled ? (
								<View>
									<StyledText
										title={"Referral Percentage"}
										style={{
											color: "white",
											fontWeight: "700",
											marginBottom: 8,
											fontSize: 16,
										}}
									/>
									<View
								style={{
									flexDirection: "row",
								}}
							>
								<TextInput
									placeholder="Reward"
									value={collectModule?.referralPercent!}
									placeholderTextColor="gray"
									selectionColor={primary}
									style={{
										backgroundColor: dark_primary,
										color: "white",
										paddingHorizontal: 16,
										paddingVertical: Platform.OS === "ios" ? 16 : 8,
										borderTopLeftRadius: 8,
										borderBottomLeftRadius: 8,
										flex: 0.8,
									}}
									keyboardType="number-pad"
									onChange={(e) => {
										e.preventDefault();
										
										if(parseInt(e.nativeEvent.text) > 100){
											console.log('huu');
											
											setCollectModule({
												...collectModule,
												referralPercent: "100",
											})
										}
										else if(e.nativeEvent.text.split('.')[1]){
											console.log('sahil');
											console.log(e.nativeEvent.text.split('.'));
											
											if(e.nativeEvent.text.split('.')[1].length <= 2){
												setCollectModule({	
													...collectModule,
													referralPercent: e.nativeEvent.text,
												})
											}
										}
									}}
								/>
								<View
									style={{
										flex: 0.008,
										backgroundColor: black[800],
									}}
								/>
								<Pressable
									style={{
										flex: 0.192,
										backgroundColor: dark_primary,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										borderTopRightRadius: 8,
										borderBottomRightRadius: 8,
									}}
								>
									<Percent height={16} width={16}/>
								</Pressable>
							</View>
								</View>
							) : null}
						</View>
					) : null}
				</View>
			</ScrollView>
			<TokenSheet
				tokenSheetRef={tokemSheetRef}
				activeToken={collectModule?.feeCollectDetails?.name!}
				TokenList={TokenList}
			/>
		</>
	);
}

function TokenSheet({ TokenList, activeToken, tokenSheetRef }: TokenSheetProps) {
	const theme = useThemeStore();
	const { collectModule, setCollectModule } = useUploadStore();
	return (
		<Sheet
			ref={tokenSheetRef}
			snapPoints={[330]}
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
					title={"Select your preferred token"}
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginVertical: 8,
					}}
				/>
				<FlatList
					data={TokenList}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								onPress={() => {
									setCollectModule({
										...collectModule,
										feeCollectDetails: {
											...collectModule.feeCollectDetails!,
											name: item.name,
											token: item.contract,
										},
									});
									// setActiveModule(ReferenceModuleList[index]);
									tokenSheetRef.current?.close();
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
									{item.icon}
									<StyledText
										title={item.name}
										style={{
											color: "rgba(255,255,255,0.8)",
											fontSize: 18,
											fontWeight: "400",
											marginVertical: 16,
										}}
									/>
								</View>
								{activeToken === item.name ? (
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
										<Icon name={"done"} color={"black"} size={18} />
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: black[800],
		borderTopColor: dark_primary,
		borderTopWidth: 1,
	},
	itemsContainer: {
		paddingHorizontal: 16,
		marginVertical: 16,
	},
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
		borderRadius: 12,
		backgroundColor: dark_primary,
		paddingVertical: 18,
		marginVertical: 8,
	},
	itemText: {
		color: "white",
		fontSize: 16,
	},
});
