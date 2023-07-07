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
	useProfileBookMarksLazyQuery,
	useProfileBookMarksQuery,
	type Mirror,
	type Post,
	type Scalars,
} from "customTypes/generated";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import useAddWatchLater from "hooks/useAddToWatchLater";
import React, { useEffect } from "react";
import { Dimensions, FlatList, Share, View } from "react-native";
import { useAuthStore, useProfile } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import CommonStyles from "styles/index";
import formatHandle from "utils/formatHandle";
import { getColors } from "react-native-image-colors";
import Logger from "utils/logger";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";

const WatchLaterList = () => {
	const [publication, setPublication] = React.useState<Post | Mirror | null>(null);
	const { currentProfile } = useProfile();
	const WatchLaterSheetRef = React.useRef<BottomSheetMethods>(null);
	const { accessToken } = useAuthStore();
	const { sessionCount, setColor, setCover } = useWatchLater();

	const handlePubId = React.useCallback((publication: Post | Mirror) => {
		setPublication(publication);
	}, []);

	async function handleCover(coverURL: string) {
		setCover(coverURL);
		getColors(coverURL, {
			fallback: "#000000",
			cache: true,
			key: coverURL,
			quality: "lowest",
			pixelSpacing: 500,
		})
			.then((colors) => {
				switch (colors.platform) {
					case "android":
						setColor(colors?.average);
						break;
					case "ios":
						setColor(colors?.detail);
						break;
					default:
						setColor("#7A52B5");
				}
			})
			.catch((error) => {
				setColor("#7A52B5");
				Logger.Error("Failed to fetch image for geting dominient color", error);
			});
	}

	const [getBookMarks, { data, loading }] = useProfileBookMarksLazyQuery({
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
		fetchPolicy: "network-only",
	});

	React.useEffect(() => {
		getBookMarks().then((res) => {
			if (res) {
				handleCover(
					getIPFSLink(getRawurl(res?.data?.publicationsProfileBookmarks?.items[0]?.metadata?.cover))
				);
			}
		});
	}, []);

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
				data={data?.publicationsProfileBookmarks?.items as Post[] | Mirror[]}
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
							setPublication={handlePubId}
						/>
					</View>
				)}
			/>
			<WatchLaterSheet sheetRef={WatchLaterSheetRef} publication={publication} />
		</View>
	);
};

export const WatchLaterSheet = ({
	sheetRef,
	publication,
}: {
	sheetRef: React.RefObject<BottomSheetMethods>;
	publication: Post | Mirror | null;
}) => {
	const { remove } = useAddWatchLater();
	const actionList: actionListType[] = [
		{
			name: "Remove",
			icon: "delete",
			onPress: (publication: Post | Mirror) => {
				console.log(publication);
				remove(publication);
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
								item.onPress(publication);
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
