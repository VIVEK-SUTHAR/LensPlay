import React from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";
import { Platform, View } from "react-native";
import StyledText from "components/UI/StyledText";
import { TextInput } from "react-native-gesture-handler";
import { dark_primary, primary } from "constants/Colors";

const LimitedFeeCollect = () => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<View>
			<CollectToggle
				title={"Limit Collect Count"}
				subTitle={"By enabling this, You will limit the number of collects for your Video"}
				switchValue={collectModule.isLimitedCollect!}
				onPress={() => {
					if (!collectModule.isLimitedCollect) {
						setCollectModule({
							...collectModule,
							type: "simpleCollectModule",
							isLimitedCollect: true,
						});
					} else {
						if (!collectModule.isPaidCollect) {
							if (collectModule.isTimedCollect) {
								setCollectModule({
									...collectModule,
									type: "simpleCollectModule",
									isLimitedCollect: false,
								});
							} else {
								setCollectModule({
									...collectModule,
									type: "freeCollectModule",
									isLimitedCollect: false,
								});
							}
						} else {
							setCollectModule({
								...collectModule,
								type: "feeCollectModule",
								isLimitedCollect: false,
							});
						}
					}
				}}
			/>
			{collectModule?.isLimitedCollect && <CollectLimit />}
		</View>
	);
};
function CollectLimit() {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
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
				}}
				keyboardType="number-pad"
				onChange={(e) => {
					e.preventDefault();
					setCollectModule({
						...collectModule,
						limitedCollectCount: e.nativeEvent.text.replace(/[^0-9]/g, ""),
					});
				}}
			/>
		</View>
	);
}

export default React.memo(LimitedFeeCollect);
