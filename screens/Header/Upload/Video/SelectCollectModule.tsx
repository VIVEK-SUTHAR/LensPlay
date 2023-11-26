import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Dai from "assets/Icons/Dai";
import Eth from "assets/Icons/Eth";
import Matic from "assets/Icons/Matic";
import Usdc from "assets/Icons/Usdc";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";
import { CollectToggle } from "components/Upload/Video/CollectModule";
import FollowerOnlyCollect from "components/Upload/Video/CollectModules/FollowerOnlyCollect";
import TimedFeeCollect from "components/Upload/Video/CollectModules/TimedFeeCollect";
import RefferalReward from "components/Upload/Video/CollectModules/RefferalReward";
import { black, dark_primary, primary } from "constants/Colors";
import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemeStore } from "store/Store";
import { useUploadStore } from "store/UploadStore";
import LimitedFeeCollect from "components/Upload/Video/CollectModules/LimitedFeeCollect";
import PaidCollect from "components/Upload/Video/CollectModules/PaidCollect";

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
	const tokemSheetRef = React.useRef<BottomSheetMethods>(null);
	// console.log(getCollectModule());

	return (
		<>
			<ScrollView style={styles.container}>
				<View style={styles.itemsContainer}>
					<CollectToggle
						title={"Make this Video collectible"}
						subTitle={"By enabling this, your video will be collectible by others as NFT"}
						switchValue={!collectModule.isRevertCollect}
						onPress={() => {
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
					/>
					{!collectModule?.isRevertCollect && (
						<View>
							<FollowerOnlyCollect />
							<PaidCollect tokenSheetRef={tokemSheetRef} />
						</View>
					)}
					{collectModule?.isPaidCollect && <RefferalReward />}
					{!collectModule?.isRevertCollect && (
						<View>
							<LimitedFeeCollect />
							<TimedFeeCollect />
						</View>
					)}
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
		marginVertical: 8,
	},
});
