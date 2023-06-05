import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import ErrorMesasge from "components/common/ErrorMesasge";
import MyVideoCard, { type actionListType } from "components/common/MyVideoCard";
import Icon from "components/Icon";
import { NoVideosFound } from "components/Profile/AllVideos";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import { black } from "constants/Colors";
import { type Mirror, type Post, type Scalars } from "customTypes/generated";
import React, { useEffect } from "react";
import { FlatList, Share, View } from "react-native";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import Logger from "utils/logger";

const WatchLaterList = () => {
	const [pubId, setPubId] = React.useState("");
	const { allWatchLaters } = useWatchLater();
	const WatchLaterSheetRef = React.useRef<BottomSheetMethods>(null);
	Logger.Log("All pubs",allWatchLaters.length)
	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			{allWatchLaters?.length > 0 ? (
				<FlashList
					data={allWatchLaters}
					ListEmptyComponent={NoVideosFound}
					removeClippedSubviews={true}
					estimatedItemSize={110}
					onEndReachedThreshold={0.7}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }: { item: Post | Mirror }) => (
						<MyVideoCard
							publication={item}
							id={item.id}
							sheetRef={WatchLaterSheetRef}
							setPubId={handlePubId}
						/>
					)}
				/>
			) : (
				<ErrorMesasge message="Look's like you dont have any watch laters yet" withImage={false} />
			)}
			<WatchLaterSheet sheetRef={WatchLaterSheetRef} pubId={pubId} />
		</View>
	);
};

export const WatchLaterSheet = ({
	sheetRef,
	pubId,
}: {
	sheetRef: React.RefObject<BottomSheetMethods>;
	pubId: Scalars["InternalPublicationId"];
}) => {
	const actionList: actionListType[] = [
		{
			name: "Remove",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {},
		},
		{
			name: "Share",
			icon: "share",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				Share.share({
					message: `Let's watch this amazing video on LensPlay, Here's link, https://lensplay.xyz/watch/${pubid}`,
					title: "Watch video on LensPlay",
				});
			},
		},
	];

	return (
		<Sheet
			ref={sheetRef}
			snapPoints={[150]}
			enablePanDownToClose={true}
			enableOverDrag={true}
			bottomInset={32}
			style={CommonStyles.mx_8}
			detached={true}
			backgroundStyle={{
				backgroundColor: black[600],
			}}
			animationConfigs={{
				damping: 15,
			}}
		>
			<FlatList
				data={actionList}
				renderItem={({ item }) => {
					return (
						<Ripple
							onTap={() => {
								item.onPress(pubId);
								sheetRef?.current?.close();
							}}
						>
							<View
								style={{
									width: "100%",
									height: "auto",
									paddingVertical: 16,
									paddingHorizontal: 16,
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Icon name={item.icon} color={"white"} />
								<StyledText
									title={item.name}
									style={{
										fontSize: 16,
										marginHorizontal: 8,
										color: "white",
									}}
								/>
							</View>
						</Ripple>
					);
				}}
			/>
		</Sheet>
	);
};

export default WatchLaterList
