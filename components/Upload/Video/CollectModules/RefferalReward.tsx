import React from "react";
import { useUploadStore } from "store/UploadStore";
import { CollectToggle } from "../CollectModule";
import { Platform, Pressable, View } from "react-native";
import { black, dark_primary, primary } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import { TextInput } from "react-native-gesture-handler";
import Percent from "assets/Icons/Percent";

const RefferalReward = () => {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
		<View>
			<CollectToggle
				title={"Referral reward on mirror"}
				subTitle={"Share your rewards with someone who support your work"}
				switchValue={collectModule.isRefferalEnabled!}
				onPress={() => {
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
			/>
			{collectModule?.isRefferalEnabled && <RefferalInput />}
		</View>
	);
};

function RefferalInput() {
	const { collectModule, setCollectModule } = useUploadStore();

	return (
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
					marginBottom: 8
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
						flex: 0.92,
					}}
					keyboardType="number-pad"
					onChange={(e) => {
						e.preventDefault();

						if (parseInt(e.nativeEvent.text) > 100) {
							setCollectModule({
								...collectModule,
								referralPercent: "100",
							});
						} else if (e.nativeEvent.text.split(".")[1]) {
							if (e.nativeEvent.text.split(".")[1].length <= 2) {
								setCollectModule({
									...collectModule,
									referralPercent: e.nativeEvent.text,
								});
							}
						} else {
							setCollectModule({
								...collectModule,
								referralPercent: e.nativeEvent.text,
							});
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
					<Percent height={20} width={20} />
				</Pressable>
			</View>
		</View>
	);
}

export default React.memo(RefferalReward);
