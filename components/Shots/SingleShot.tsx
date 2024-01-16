import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Sheet from "components/Bottom";
import CommentSheet from "components/Comments/CommentSheet";
import ShotData, { DiscriptionSheet } from "components/Shots/ShotData";
import ShotReaction from "components/Shots/ShotReaction";
import { black } from "constants/Colors";
import { PrimaryPublication, VideoMetadataV3 } from "customTypes/generated";
import { AVPlaybackStatus, Audio, ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import getIPFSLink from "utils/getIPFSLink";
import getRawurl from "utils/getRawUrl";
import Logger from "utils/logger";

interface SingleShotProps {
	item: PrimaryPublication;
	isActive: boolean;
}

function SingleShot({ item, isActive }: SingleShotProps) {
	const metadata = item.metadata as VideoMetadataV3;
	const [videoURL, setVideoURL] = useState(
		getIPFSLink(
			metadata?.asset?.video?.optimized?.uri || metadata?.asset?.video?.raw?.uri
		)
	);
	const duration = useSharedValue(0);
	const progress = useSharedValue(0);

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

	const setAudio = async () => {
		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const onLoad = (data: AVPlaybackStatus) => {
		if (data.isLoaded) {
			const seconds = (data?.durationMillis || 0) / 1000;
			duration.value = seconds;
			setAudio();
		}
	};

	const onPlaybackStatusUpdate = (e: AVPlaybackStatus) => {
		try {
			if (!e.isLoaded) return;
			progress.value = e.positionMillis / 1000;
		} catch (error) {
			Logger.Error("error", error);
		}
	};

	// useEffect(() => {
	// if (item?.metadata?.media[0]?.optimized?.url?.includes("https://lp-playback.com")) {
	// 	Logger.Success("Got opti", item?.metadata?.media[0]?.optimized?.url);
	// 	setVideoURL(item?.metadata?.media[0]?.optimized?.url);
	// 	return;
	// } else {
	// 	setVideoURL(getIPFSLink(item?.metadata?.media[0].original.url));
	// }
	// checkIfLivePeerAsset(videoURL).then((res) => {
	// 	if (res) {
	// 	} else {
	// 		createLivePeerAsset(videoURL);
	// 	}
	// });
	// }, [isActive]);

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
				<Video
					ref={ref}
					resizeMode={ResizeMode.COVER}
					style={{
						width: "100%",
						height: "100%",
					}}
					usePoster={true}
					source={{
						uri: videoURL,
					}}
					onLoad={onLoad}
					onPlaybackStatusUpdate={onPlaybackStatusUpdate}
					progressUpdateIntervalMillis={1000}
					posterSource={{
						uri: getIPFSLink(getRawurl(metadata?.asset?.cover)),
					}}
					posterStyle={{
						height: "100%",
						width: "100%",
						resizeMode: "cover",
					}}
				/>
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
