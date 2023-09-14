import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { STATIC_ASSET } from "constants/index";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useActivePublication } from "store/Store";
import CommonStyles from "styles/index";
import extractURLs from "utils/extractURL";
import getRawurl from "utils/getRawUrl";
import VideoCreator from "../VideoAuthor";

type MetaDataSheetProps = {
	sheetRef: React.RefObject<BottomSheetMethods>;
};

const MetaDataSheet = ({ sheetRef: descRef }: MetaDataSheetProps) => {
	const { activePublication } = useActivePublication();
	return (
		<Sheet
			ref={descRef}
			index={-1}
			enablePanDownToClose={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			handleStyle={CommonStyles.px_8}
			snapPoints={[550, 740]}
		>
			<View style={styles.flex1}>
				<View style={styles.sheetTitle}>
					<Heading
						title={"Description"}
						style={{
							fontSize: 20,
							color: white[800],
							fontWeight: "500",
						}}
					/>
					<Pressable
						onPress={() => {
							descRef?.current?.close();
						}}
					>
						<Icon name="close" size={16} />
					</Pressable>
				</View>
				<View
					style={{
						borderBottomColor: black[300],
						borderBottomWidth: 1.5,
						marginTop: 8,
					}}
				/>
				<BottomSheetScrollView>
					<View style={{ paddingHorizontal: 16 }}>
						<StyledText
							title={activePublication?.metadata?.name}
							style={{
								fontSize: 18,
								fontWeight: "600",
								marginVertical: 8,
								color: "white",
								textAlign: "left",
							}}
						/>
						<View style={styles.videoStatsContainer}>
							<View style={styles.verticleCenter}>
								<StyledText
									title={activePublication?.stats?.totalUpvotes || 0}
									style={styles.statsLabel}
								/>
								<StyledText title="Likes" style={{ color: "white" }} />
							</View>
							<View style={styles.verticleCenter}>
								<StyledText
									title={activePublication?.stats?.totalAmountOfCollects || 0}
									style={styles.statsLabel}
								/>
								<StyledText title="Collects" style={{ color: "white" }} />
							</View>
							<View style={styles.verticleCenter}>
								<StyledText
									title={activePublication?.stats?.totalAmountOfMirrors || 0}
									style={styles.statsLabel}
								/>
								<StyledText title="Mirrors" style={{ color: "white" }} />
							</View>
						</View>
						<StyledText
							title={
								extractURLs(activePublication?.metadata?.description) ||
								"No description provided by crator"
							}
							style={{
								textAlign: "justify",
								color: "white",
								marginTop: 16,
								fontSize: 14,
								fontWeight: "500",
							}}
						/>
						<StyledText
							title={`Posted via ${
								activePublication?.appId?.charAt(0)?.toUpperCase() +
									activePublication?.appId?.slice(1) || "LensPlay"
							}`}
							style={{
								color: "white",
								marginTop: 16,
								fontSize: 14,
								fontWeight: "500",
							}}
						/>
						<StyledText
							title={"Uploaded By"}
							style={{
								color: "white",
								marginTop: 16,
								fontSize: 14,
								fontWeight: "500",
							}}
						/>
						<VideoCreator
							profile={activePublication?.profile}
							showSubscribeButton={false}
							showSubscribers={true}
							subscribersCount={activePublication?.profile?.stats?.totalFollowers}
						/>
					</View>
				</BottomSheetScrollView>
			</View>
		</Sheet>
	);
};

export default React.memo(MetaDataSheet);

const styles = StyleSheet.create({
	flex1: {
		flex: 1,
	},
	sheetTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	videoStatsContainer: {
		paddingVertical: 10,
		width: "100%",
		paddingHorizontal: 8,
		alignSelf: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		borderBottomColor: "gray",
		borderBottomWidth: 1,
	},
	statsLabel: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
	},
	verticleCenter: {
		alignItems: "center",
	},
});
