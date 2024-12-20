import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { LikeButton } from "components/VIdeo";
import { black, primary, white } from "constants/Colors";
import { PUBLICATION, SHOT } from "constants/tracking";
import { ShotsPublication } from "customTypes/index";
import { ToastType } from "customTypes/Store";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Pressable, Share, Text, TouchableOpacity, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useToast } from "store/Store";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import TrackAction from "utils/Track";

function ShotReaction({ item, commentRef }: ShotsPublication) {
	const collectSheetRef = useRef<BottomSheetMethods>(null);
	const bottomTabBarHeight = useBottomTabBarHeight();
	const toast = useToast();
	const { isGuest } = useGuestStore();

	const collectPublication = React.useCallback(async () => {
		try {
			if (isGuest) {
				toast.show("Please Login", ToastType.ERROR, true);
				return;
			}
			if (item?.operations?.hasActed) {
				toast.show("You have already collected the video", ToastType.ERROR, true);
				return;
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.Log(error.message);
			}
		} finally {
			collectSheetRef?.current?.close();
		}
	}, []);

	const shareVideo = React.useCallback(async () => {
		try {
			const result = await Share.share({
				message: `Let's watch ${item?.metadata?.title} on LensPlay, here's link, https://lensplay.xyz/watch/${item?.id}
        `,
			});
			TrackAction(PUBLICATION.SHARE);
		} catch (error) {}
	}, []);

	const handleSheet = React.useCallback(() => {
		collectSheetRef?.current?.snapToIndex(0);
	}, []);

	return (
		<>
			<View
				style={{
					position: "absolute",
					bottom: bottomTabBarHeight,
					right: 0,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<LikeButton
					like={item?.stats?.reactions}
					id={item?.id}
					isalreadyLiked={item?.operations?.upvote}
					bytes={true}
					shotPublication={item}
				/>
				<TouchableOpacity
					style={{
						padding: 10,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={(e) => {
						e.preventDefault();
						commentRef?.current?.snapToIndex(0);
					}}
				>
					<Icon name="comment" size={32} />
					<Text style={{ color: "white" }}>{item?.stats?.comments}</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity
					style={{
						padding: 10,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={(e) => {
						collected
							? toast.show("You have already collected this shot", ToastType.ERROR, true)
							: handleSheet();
					}}
				>
					<Icon name="collect" color={collected ? PRIMARY : "white"} size={28} />
					<Text style={{ color: collected ? PRIMARY : "white" }}>{totalCollects}</Text>
				</TouchableOpacity> */}
				<TouchableOpacity
					style={{
						padding: 10,
						justifyContent: "center",
						alignItems: "center",
						zIndex: 0,
					}}
					onPress={shareVideo}
				>
					<Icon name="share" size={28} />
				</TouchableOpacity>
			</View>
			<Sheet
				ref={collectSheetRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				snapPoints={[580]}
			>
				<View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 16,
						}}
					>
						<Heading
							title={"Collect video"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "600",
							}}
						/>
						<Pressable
							onPress={() => {
								collectSheetRef?.current?.close();
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
					<BottomSheetScrollView
						style={{
							flex: 1,
							paddingHorizontal: 16,
						}}
					>
						<View
							style={{
								marginTop: 20,
							}}
						>
							<Image
								source={{
									uri: getIPFSLink(getRawurl(item?.metadata?.asset?.cover)),
								}}
								placeholder={getPlaceHolderImage()}
								transition={500}
								placeholderContentFit="contain"
								style={{
									height: 200,
									borderRadius: 8,
									width: "100%",
								}}
								contentFit="cover"
							/>
							<StyledText
								title={item?.metadata?.title}
								style={{
									fontSize: 20,
									color: white[800],
									fontWeight: "600",
									marginTop: 16,
								}}
								numberOfLines={2}
							/>
						</View>
						<View
							style={{
								marginTop: 8,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Icon name="info" color={black[100]} size={16} />
							<StyledText
								title={"This video is free to collect"}
								style={{
									fontSize: 16,
									color: black[100],
									fontWeight: "600",
									marginLeft: 4,
								}}
							/>
						</View>
						<View
							style={{
								marginTop: 12,
							}}
						>
							<Heading
								title={"Posted by"}
								style={{
									fontSize: 16,
									color: white[100],
									fontWeight: "600",
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									marginTop: 8,
								}}
							>
								<Avatar src={getRawurl(item?.by?.metadata?.picture)} height={40} width={40} />
							</View>
						</View>
						<View
							style={{
								marginVertical: 18,
							}}
						>
							<Button
								title={"Collect the shots for free"}
								py={12}
								textStyle={{
									fontSize: 20,
									fontWeight: "600",
									textAlign: "center",
								}}
								bg={primary}
								onPress={collectPublication}
							/>
						</View>
					</BottomSheetScrollView>
				</View>
			</Sheet>
		</>
	);
}

export default React.memo(ShotReaction);
