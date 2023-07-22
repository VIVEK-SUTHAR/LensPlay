import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Sheet from "components/Bottom";
import CommentSheet from "components/Comments/CommentSheet";
import Icon from "components/Icon";
import ShotData, { DiscriptionSheet } from "components/Shots/ShotData";
import ShotReaction from "components/Shots/ShotReaction";
import { black } from "constants/Colors";
import { Mirror, Post } from "customTypes/generated";
import type { ShotsPublication } from "customTypes/index";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import createLivePeerAsset from "utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "utils/video/isInLivePeer";

interface SingleByteProps {
	item: Post | Mirror;
	index: number;
	currentIndex: number;
}

function SingleShot({ item, index, currentIndex }: SingleByteProps) {
	const ref = React.useRef<Video>(null);
	const { height, width } = useWindowDimensions();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const [mute, setMute] = useState(false);
	const [videoURL, setVideoURL] = useState(getIPFSLink(item?.metadata?.media[0]?.original?.url));
	const navigation = useNavigation();
	const commentSheetRef = React.useRef<BottomSheetMethods>(null);

	navigation.addListener("blur", (e) => {
		ref.current?.pauseAsync();
	});

	const descriptionRef = useRef<BottomSheetMethods>(null);

	useEffect(() => {
		if (item?.metadata?.media[0]?.optimized?.url?.includes("https://lp-playback.com")) {
			Logger.Success("Got opti", item?.metadata?.media[0]?.optimized?.url);
			setVideoURL(item?.metadata?.media[0]?.optimized?.url);
			return;
		}
		checkIfLivePeerAsset(videoURL).then((res) => {
			if (res) {
				setVideoURL(res);
			} else {
				createLivePeerAsset(videoURL);
			}
		});
	}, []);

	return (
		<>
			<View
				style={{
					width: width,
					height: height - bottomTabBarHeight,
					position: "relative",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Pressable
					onPress={() => setMute(!mute)}
					style={{
						flex: 1,
						backgroundColor: "cyan",
					}}
				>
					<VideoPlayer
						defaultControlsVisible={false}
						videoProps={{
							ref: ref as MutableRefObject<Video>,
							source: {
								uri: videoURL,
							},
							onError(error) {
								// console.log(error);
							},
							shouldPlay: currentIndex === index ? true : false,
							resizeMode: ResizeMode.COVER,
							isMuted: mute,
							posterSource: {
								uri: getIPFSLink(getRawurl(item?.metadata?.cover)),
							},
							isLooping: true,
							posterStyle: {
								resizeMode: ResizeMode.COVER,
							},
						}}
						slider={{
							visible: false,
						}}
						fullscreen={{
							visible: false,
						}}
						mute={{
							visible: false,
						}}
						timeVisible={false}
						icon={{
							size: 48,
							play: <Icon name="play" size={48} />,
							pause: <Icon name="pause" size={52} />,
							replay: <Icon name="replay" size={48} />,
						}}
						autoHidePlayer={true}
					/>
				</Pressable>
			</View>
			<ShotData item={item} descriptionRef={descriptionRef} />
			<ShotReaction item={item} commentRef={commentSheetRef} />
			<CommentSheet commentSheetRef={commentSheetRef} pubId={item?.id} />
			<Sheet
				ref={descriptionRef}
				index={-1}
				enablePanDownToClose={true}
				backgroundStyle={{
					backgroundColor: black[600],
				}}
				snapPoints={[440, 550]}
			>
				<DiscriptionSheet item={item} descriptionRef={descriptionRef} />
			</Sheet>
		</>
	);
}

export default React.memo(SingleShot);
