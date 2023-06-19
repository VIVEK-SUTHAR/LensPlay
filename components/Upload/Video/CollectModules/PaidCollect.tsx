import React from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";
import { Platform, Pressable, TextInput, View } from "react-native";
import StyledText from "components/UI/StyledText";
import { black, dark_primary, primary } from "constants/Colors";
import Icon from "components/Icon";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const PaidCollect = ({ tokenSheetRef }: { tokenSheetRef: React.RefObject<BottomSheetMethods> }) => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<View>
			<CollectToggle
				title={"Paid Collect"}
				subTitle={"By enabling this, You will get paid when someone collect's your post"}
				switchValue={collectModule.isPaidCollect!}
				onPress={() => {
					if (!collectModule.isPaidCollect) {
						if (collectModule.isTimedCollect && collectModule.isLimitedCollect) {
							setCollectModule({
								...collectModule,
								type: "limitedTimedFeeCollectModule",
								isPaidCollect: true,
							});
						} else if (collectModule.isTimedCollect) {
							setCollectModule({
								...collectModule,
								type: "timedFeeCollectModule",
								isPaidCollect: true,
							});
						} else if (collectModule.isLimitedCollect) {
							setCollectModule({
								...collectModule,
								type: "limitedFeeCollectModule",
								isPaidCollect: true,
							});
						} else {
							setCollectModule({
								...collectModule,
								type: "feeCollectModule",
								isPaidCollect: true,
							});
						}
					} else {
						if( collectModule?.isLimitedCollect ){
							setCollectModule({
								...collectModule,
								type: "simpleCollectModule",
								isPaidCollect: false,
							});
						}
						else {
							setCollectModule({
								...collectModule,
								type: "freeCollectModule",
								isPaidCollect: false,
							});
						}
					}
				}}
			/>
			{collectModule?.isPaidCollect && <CollectFee tokenSheetRef={tokenSheetRef} />}
		</View>
	);
};

function CollectFee({ tokenSheetRef }: { tokenSheetRef: React.RefObject<BottomSheetMethods> }) {
	const { collectModule, setCollectModule } = useUploadStore();
	return (
		<View>
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
					marginBottom: 10,
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
						tokenSheetRef?.current?.snapToIndex(0);
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
		</View>
	);
}

export default React.memo(PaidCollect);
