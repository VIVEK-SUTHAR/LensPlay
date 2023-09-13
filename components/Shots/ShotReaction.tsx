import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Sheet from "components/Bottom";
import Icon from "components/Icon";
import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, primary, white } from "constants/Colors";
import { PUBLICATION } from "constants/tracking";
import { ToastType } from "customTypes/Store";
import { ShotsPublication } from "customTypes/index";
import { Image } from "expo-image";
import useCollect from "hooks/reactions/useCollect";
import React, { useRef, useState } from "react";
import { Pressable, Share, Text, TouchableOpacity, View } from "react-native";
import { useGuestStore } from "store/GuestStore";
import { useThemeStore, useToast } from "store/Store";
import TrackAction from "utils/Track";
import getIPFSLink from "utils/getIPFSLink";
import getPlaceHolderImage from "utils/getPlaceHolder";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import ShotLikeButton from "./Reaction/ShotLikeButton";

function ShotReaction({ item, commentRef }: ShotsPublication) {
	const [totalCollects, setTotalCollects] = useState<number>(item?.stats?.totalAmountOfCollects);
	const [collected, setCollected] = useState<boolean>(item?.hasCollectedByMe);
	const collectSheetRef = useRef<BottomSheetMethods>(null);
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { PRIMARY } = useThemeStore();
	const toast = useToast();
	const { isGuest } = useGuestStore();
	const { collectPublication } = useCollect();

	const handleCollect = React.useCallback(async () => {
		try {
			if (isGuest) {
				toast.show("Please Login", ToastType.ERROR, true);
				return;
			}
			if (collected) {
				toast.show("You have already collected the video", ToastType.ERROR, true);
				return;
			}
			setCollected(true);
			setTotalCollects(totalCollects + 1);
			await collectPublication(item);
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
				message: `Let's watch ${item?.metadata?.name} on LensPlay, here's link, https://lensplay.xyz/watch/${item?.id}
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
				<ShotLikeButton publication={item} />
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
					<Text style={{ color: "white" }}>{item?.stats?.totalAmountOfComments}</Text>
				</TouchableOpacity>
				<TouchableOpacity
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
				</TouchableOpacity>
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
									uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
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
								title={item?.metadata?.name}
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
								<Avatar src={getRawurl(item?.profile?.picture)} height={40} width={40} />
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
								onPress={handleCollect}
							/>
						</View>
					</BottomSheetScrollView>
				</View>
			</Sheet>
		</>
	);
}

export default React.memo(ShotReaction);
