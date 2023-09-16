import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Pause from "assets/Icons/Pause";
import Play from "assets/Icons/Play";
import Replay from "assets/Icons/Replay";
import Sheet from "components/Bottom";
import CommentSheet from "components/Comments/CommentSheet";
import ShotData, { DiscriptionSheet } from "components/Shots/ShotData";
import ShotReaction from "components/Shots/ShotReaction";
import VideoPlayer from "components/VideoPlayer";
import Player from "components/VideoPlayer/Player";
import { black, white } from "constants/Colors";
import { Mirror, Post } from "customTypes/generated";
import { ResizeMode, Video } from "expo-av";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";
import createLivePeerAsset from "utils/video/createLivePeerAsset";
import checkIfLivePeerAsset from "utils/video/isInLivePeer";

interface SingleByteProps {
	item: Post | Mirror;
	isActive: boolean;
}

function SingleShot({ item, isActive }: SingleByteProps) {
	const [mute, setMute] = useState(false);
	const [videoURL, setVideoURL] = useState(getIPFSLink(item?.metadata?.media[0]?.original?.url));

	const ref = React.useRef<Video>(null);
	const commentSheetRef = React.useRef<BottomSheetMethods>(null);
	const descriptionRef = useRef<BottomSheetMethods>(null);
	const isFocused = useIsFocused();

	const { height, width } = useWindowDimensions();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener("blur", handleBlur);
	}, [navigation]);

	const handleBlur = React.useCallback(() => {
		ref?.current?.pauseAsync();
	}, []);

	useEffect(() => {
		if (isFocused && isActive) {
			ref.current?.setPositionAsync(0);
			ref.current?.playAsync();
		}
		if (!isFocused || !isActive) {
			ref.current?.setPositionAsync(0);
			ref.current?.pauseAsync();
		}
	}, [isFocused, isActive]);

	useEffect(() => {
		if (item?.metadata?.media[0]?.optimized?.url?.includes("https://lp-playback.com")) {
			Logger.Success("Got opti", item?.metadata?.media[0]?.optimized?.url);
			setVideoURL(item?.metadata?.media[0]?.optimized?.url);
			return;
		} else {
			setVideoURL(getIPFSLink(item?.metadata?.media[0].original.url));
		}
		checkIfLivePeerAsset(videoURL).then((res) => {
			if (res) {
			} else {
				createLivePeerAsset(videoURL);
			}
		});
	}, [isActive]);

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
					<Player
						defaultControlsVisible={false}
						videoProps={{
							ref: ref as MutableRefObject<Video>,
							source: {
								uri: videoURL,
							},
							onError(error) {
								Logger.Error("Video Player Error", error);
								// console.log(error);
							},
							shouldPlay: isActive,
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
							play: <Play height={48} width={48} color={white[800]} />,
							pause: <Pause height={48} width={48} color={white[800]} />,
							replay: <Replay height={48} width={48} color={white[800]} />,
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
