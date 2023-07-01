import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList } from "@shopify/flash-list";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import { NoVideosFound } from "components/Profile/AllVideos";
import Heading from "components/UI/Heading";
import Ripple from "components/UI/Ripple";
import StyledText from "components/UI/StyledText";
import MyVideoCard, { type actionListType } from "components/common/MyVideoCard";
import ProfileVideoCardSkeleton from "components/common/ProfileVideoCardSkeleton";
import Skeleton from "components/common/Skeleton";
import { black, white } from "constants/Colors";
import {
	PublicationMainFocus,
	useProfileBookMarksQuery,
	type Mirror,
	type Post,
	type Scalars,
} from "customTypes/generated";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import useAddWatchLater from "hooks/useAddToWatchLater";
import React from "react";
import { Dimensions, FlatList, Share, View } from "react-native";
import { useAuthStore, useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import formatHandle from "utils/formatHandle";

const WatchLaterList = () => {
	const [pubId, setPubId] = React.useState("");
	const { currentProfile } = useProfile();
	const WatchLaterSheetRef = React.useRef<BottomSheetMethods>(null);
	const { accessToken } = useAuthStore();

	const handlePubId = React.useCallback((pubId: string) => {
		setPubId(pubId);
	}, []);

	const { data, loading } = useProfileBookMarksQuery({
		variables: {
			req: {
				profileId: currentProfile?.id,
				metadata: {
					mainContentFocus: [PublicationMainFocus.Video],
				},
			},
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
	});

	const watchLaters = data?.publicationsProfileBookmarks?.items;

	if (loading) {
		return (
			<>
				<LinearGradient
					style={{
						alignItems: "center",
						padding: 16,
					}}
					colors={["#1d1d1d", "black"]}
				>
					<View
						style={{
							height: 200,
							width: "100%",
							borderRadius: 8,
							backgroundColor: "#1d1d1d",
						}}
					/>
					<View
						style={{
							marginTop: 24,
							width: "100%",
						}}
					>
						<View
							style={{
								width: Dimensions.get("screen").width * 0.36,
								height: 16,
								backgroundColor: "#1d1d1d",
								marginHorizontal: 8,
								marginVertical: 8,
							}}
						/>
						<View
							style={{
								width: Dimensions.get("screen").width * 0.3,
								height: 12,
								backgroundColor: "#1d1d1d",
								marginHorizontal: 8,
								marginVertical: 4,
							}}
						/>
					</View>
				</LinearGradient>
				<Skeleton number={5}>
					<View style={{ padding: 8 }}>
						<ProfileVideoCardSkeleton />
					</View>
				</Skeleton>
			</>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
		>
			<FlashList
				data={watchLaters as Post[] | Mirror[]}
				ListHeaderComponent={WatchLaterHeader}
				ListEmptyComponent={NoVideosFound}
				removeClippedSubviews={true}
				estimatedItemSize={110}
				onEndReachedThreshold={0.7}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }: { item: Post | Mirror }) => (
					<View style={{ padding: 8 }}>
						<MyVideoCard
							publication={item}
							id={item.id}
							sheetRef={WatchLaterSheetRef}
							setPubId={handlePubId}
						/>
					</View>
				)}
			/>
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
	const { remove } = useAddWatchLater();
	const actionList: actionListType[] = [
		{
			name: "Remove",
			icon: "delete",
			onPress: (pubid: Scalars["InternalPublicationId"]) => {
				remove(pubId);
			},
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
			bottomInset={8}
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

const WatchLaterHeader = () => {
	const { currentProfile } = useProfile();
	const { cover, color } = useWatchLater();
	return (
		<LinearGradient
			style={{
				alignItems: "center",
				padding: 16,
			}}
			colors={[color ? color : "#7A52B5", "black"]}
		>
			<Image
				source={{
					uri: cover ? cover : "https://ik.imagekit.io/4uh8nmwsx/fotor-ai-2023060417146.jpg?f-webp",
				}}
				style={{
					height: 200,
					width: "100%",
					borderRadius: 8,
				}}
				contentFit="cover"
			/>
			<View
				style={{
					marginTop: 24,
					width: "100%",
				}}
			>
				<Heading
					title="Watch Later"
					style={{
						color: white[800],
						fontWeight: "600",
						fontSize: 24,
					}}
				/>
				<StyledText
					title={currentProfile?.name || formatHandle(currentProfile?.handle)}
					style={{
						color: white[200],
						fontWeight: "600",
						fontSize: 16,
						marginTop: 2,
					}}
				/>
			</View>
		</LinearGradient>
	);
};

export default WatchLaterList;
