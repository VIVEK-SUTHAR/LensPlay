import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { dark_secondary, primary } from "constants/Colors";
import StyledText from "components/UI/StyledText";
import Switch from "components/UI/Switch";
import { useUploadStore } from "store/UploadStore";

const FollowerOnlyCollect = () => {
	const [isFollowerOnly, setIsFollowerOnly] = useState<boolean>(false);
	const uploadStore = useUploadStore();

	React.useEffect(() => {
		if (isFollowerOnly) {
			uploadStore.setCollectModule({
				...uploadStore.collectModule,
				followerOnlyCollect: true,
			});
		} else {
			uploadStore.setCollectModule({
				...uploadStore.collectModule,
				followerOnlyCollect: false,
			});
		}
	}, [isFollowerOnly]);

	return (
		<View
			style={{
				backgroundColor: dark_secondary,
				marginVertical: 8,
				borderRadius: 8,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-start",
					padding: 12,
					borderRadius: 4,
					marginVertical: 2,
				}}
			>
				<View
					style={{
						maxWidth: "80%",
					}}
				>
					<StyledText
						title={"Only Followers can collect"}
						style={{
							color: "white",
							fontSize: 16,
							fontWeight: "500",
						}}
					/>
					<StyledText
						title={"By enabling this,only your followers will be able to collect this video as NFT"}
						style={{
							color: "gray",
							fontSize: 14,
							fontWeight: "500",
						}}
					/>
				</View>
				<Switch
					value={isFollowerOnly}
					handleOnPress={() => {
						setIsFollowerOnly((prev) => !prev);
					}}
					activeTrackColor={primary}
					inActiveTrackColor="rgba(255,255,255,0.2)"
					thumbColor="white"
				/>
			</View>
		</View>
	);
};

export default React.memo(FollowerOnlyCollect);

const styles = StyleSheet.create({});
