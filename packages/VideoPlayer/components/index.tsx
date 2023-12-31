import {
	type AVPlaybackSource,
	type AVPlaybackStatus,
	Audio,
	ResizeMode,
	Video,
} from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	type ImageProps,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { Slider, type SliderThemeType } from "react-native-awesome-slider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useControllerStyles from "../hooks/useControllerStyles";
import useVideoPlayerStore from "../store";
import { clamp } from "../utils";
import FullscreenController from "./FullscreenController";
import PlayPauseController from "./PlayPauseController";
import VideoTime from "./VideoTime";
import Backward from "./Backward";
import Forward from "./Forward";
import useForward from "../hooks/useForward";
import useBackward from "../hooks/useBackward";

const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const VIDEO_DEFAULT_HEIGHT = Dimensions.get("window").width * (9 / 16);

//250ms interval for detection of double tap
const VIDEO_DOUBLE_TAP_MAX_DURATION = 250;

export type VideoDuration = {
	duration: number;
};

type videoPlayerProps = {
	source: AVPlaybackSource;
	isMuted?: boolean;
	poster?: ImageProps["source"];
	height?: number;
	resizeMode?: ResizeMode;
	sliderTheme?: SliderThemeType;
	onEnterFullScreen?: () => void;
	onExitFullScreen?: () => void;
};

export default function VideoPlayer({
	source,
	height = VIDEO_DEFAULT_HEIGHT,
	isMuted,
	onEnterFullScreen,
	onExitFullScreen,
	poster,
	resizeMode=ResizeMode.CONTAIN,
	sliderTheme,
}: videoPlayerProps) {
	const player = useRef<VideoDuration>({
		duration: 0,
	});
	const videoPlayer = useRef<Video>(null);
	const [currentTime, setcurrentTime] = useState(0);
	const insets = useSafeAreaInsets();
	const isFullScreen = useSharedValue(false);
	const { isPaused, setIsLoading } = useVideoPlayerStore();
	const {
		controlViewOpacity,
		controlViewStyles,
		setControlTimeout,
		hideControlAnimation,
		showControlAnimation,
	} = useControllerStyles();
	const { showForwardAnimation, forwardViewStyles } = useForward();
	const { showBackwardAnimation, backwardViewStyles } = useBackward();

	const leftDoubleTapBoundary = width / 2 - insets.left - insets.right - 80;

	const rightDoubleTapBoundary =
		width - leftDoubleTapBoundary - insets.left - insets.right;
	const max = useSharedValue(100);
	const min = useSharedValue(0);
	const isScrubbing = useSharedValue(false);
	const progress = useSharedValue(0);

	const videoScale = useSharedValue(1);
	const videoTransY = useSharedValue(0);
	const isVerticalPan = useSharedValue(false);
	const videoHeight = useSharedValue(height);

	const onLoadStart = () => setIsLoading(true);

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
			player.current.duration = seconds;
			max.value = seconds;
			setIsLoading(false);
			setControlTimeout();
			setAudio();
		}
	};

	const onPlaybackStatusUpdate = (e: AVPlaybackStatus) => {
		if (!e.isLoaded) return;
		try {
			//Call GC so memory is not increase so much,
			//Calculate CPU Overhead,as GC is computational task
			//global?.gc?.()
		} catch (error) {}

		if (!isScrubbing.value) {
			progress.value = e.positionMillis / 1000;
			setcurrentTime(e.positionMillis / 1000);
		}
	};

	const enterFullScreen = () => {
		onEnterFullScreen?.();
		console.log("Full-Screen Entered 🖥️");

		StatusBar.setHidden(true, "fade");
		ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
		);
		isFullScreen.value = true;
		videoHeight.value = width;
	};

	const exitFullScreen = () => {
		onExitFullScreen?.();
		console.log("Full-Screen Exit 📱");
		StatusBar.setHidden(false, "fade");
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
		isFullScreen.value = false;
		videoHeight.value = VIDEO_DEFAULT_HEIGHT;
	};

	const singleTapHandler = Gesture.Tap().onEnd((_event, success) => {
		if (success) {
			if (controlViewOpacity.value === 0) {
				showControlAnimation();
			} else {
				hideControlAnimation();
			}
		}
	});

	const defaultVideoStyle = useAnimatedStyle(() => {
		const fullVideoHeight = windowHeight - insets.left - insets.right;
		return {
			transform: [
				{
					scale: videoScale.value,
				},
				{
					translateY: videoTransY.value,
				},
			],
			height: videoHeight.value,
			width: withTiming(isFullScreen.value ? fullVideoHeight : width, {
				duration: 60,
			}),
		};
	}, [videoHeight, videoScale, isFullScreen, videoTransY, insets]);

	const onSlidingComplete = (time: number) => {
		videoPlayer.current?.setStatusAsync({
			positionMillis: time * 1000,
			shouldPlay: !isPaused,
		});
		isScrubbing.value = false;
	};

	const fullScreenSliderStyles = useAnimatedStyle(() => {
		return {
			display: isFullScreen.value ? "flex" : "none",
		};
	});

	const sliderStyles = useAnimatedStyle(() => {
		return {
			display: isFullScreen.value ? "none" : "flex",
		};
	});

	const seekByStep = (isBack = false) => {
		seekTo(currentTime - (isBack ? 10 : -10));
	};

	const seekTo = (time: number = 0) => {
		setcurrentTime(time);
		videoPlayer.current?.setStatusAsync({
			positionMillis: time * 1000,
			shouldPlay: !isPaused,
		});
		isScrubbing.value = false;
	};

	const doubleTapHandle = Gesture.Tap()
		.numberOfTaps(2)
		.maxDuration(VIDEO_DOUBLE_TAP_MAX_DURATION)
		.onEnd((e, success) => {
			if (!success) return;
			if (e.x < leftDoubleTapBoundary) {
				console.log("Double Tap Detected for Fast Backword ⏪");
				showBackwardAnimation();
				runOnJS(seekByStep)(true);
				return;
			}
			if (e.x > rightDoubleTapBoundary) {
				console.log("Double Tap Detected for Fast Forward ⏩");
				showForwardAnimation();
				runOnJS(seekByStep)(false);
				return;
			}
		});

	//Added for handle gesture to detect and apply Scaling the Video
	const panHandler = Gesture.Pan()
		.onStart(({ velocityY, velocityX }) => {
			isVerticalPan.value = Math.abs(velocityY) > Math.abs(velocityX);
		})
		.onUpdate(({ translationY }) => {
			controlViewOpacity.value = withTiming(0, { duration: 100 });
			if (isFullScreen.value) {
				if (translationY > 0 && Math.abs(translationY) < 100) {
					videoScale.value = clamp(0.9, 1 - Math.abs(translationY) * 0.008, 1);
					videoTransY.value = translationY;
				}
			} else {
				if (translationY < 0 && Math.abs(translationY) < 40) {
					videoScale.value = Math.abs(translationY) * 0.012 + 1;
				}
			}
		})
		.onEnd(({ translationY }, success) => {
			if (!isVerticalPan.value && !success) {
				return;
			}
			if (isFullScreen.value) {
				if (translationY >= 100) {
					runOnJS(exitFullScreen)();
				}
			} else {
				if (-translationY >= 40) {
					runOnJS(enterFullScreen)();
				}
			}
			videoTransY.value = 0;
			videoScale.value = withTiming(1);
		});

	//Detecte the Double and Single Tap from one Gesture
	const taps = Gesture.Exclusive(doubleTapHandle, singleTapHandler);

	//Race between two gesture, whatever happens first, responed to it
	const gesture = Gesture.Race(taps, panHandler);

	return (
		<View>
			<Animated.View style={[defaultVideoStyle]}>
				<Video
					ref={videoPlayer}
					resizeMode={resizeMode}
					onLoadStart={onLoadStart}
					style={{
						width: "100%",
						height: "100%",
					}}
					isMuted={isMuted}
					usePoster={true}
					source={source}
					onLoad={onLoad}
					shouldPlay={!isPaused}
					onPlaybackStatusUpdate={onPlaybackStatusUpdate}
					progressUpdateIntervalMillis={1000}
					posterSource={poster}
					posterStyle={{
						height: "100%",
						width: "100%",
						resizeMode: "cover",
					}}
				/>
			</Animated.View>
			<GestureDetector gesture={gesture}>
				<Animated.View style={styles.controlsContainer}>
					<Animated.View style={backwardViewStyles}>
						<Backward videoHeight={videoHeight.value} />
					</Animated.View>
					<Animated.View
						style={[
							styles.playPauseContainer,
							controlViewStyles,
							{
								backgroundColor: "rgba(0,0,0,0.4)",
							},
						]}
					>
						<PlayPauseController
							videoPlayerRef={videoPlayer}
							onPause={() => {
								console.log("Video Paused ⏯️");
								showControlAnimation(true);
							}}
							onPlay={() => {
								console.log("Video Played ▶️");
								hideControlAnimation(true);
							}}
						/>
					</Animated.View>
					<Animated.View style={forwardViewStyles}>
						<Forward videoHeight={videoHeight.value} />
					</Animated.View>
				</Animated.View>
			</GestureDetector>
			<Animated.View style={[styles.sliderContainer, sliderStyles]}>
				<Animated.View
					style={[
						{
							padding: 16,
							flexDirection: "row",
							justifyContent: "space-between",
						},
						controlViewStyles,
					]}
				>
					<VideoTime
						currentTime={currentTime}
						duration={player.current.duration}
					/>
					<FullscreenController
						enterFullScreen={enterFullScreen}
						exitFullScreen={exitFullScreen}
						isFullScreen={isFullScreen}
					/>
				</Animated.View>
				<Slider
					progress={progress}
					onSlidingComplete={onSlidingComplete}
					renderBubble={() => <></>}
					minimumValue={min}
					maximumValue={max}
					isScrubbing={isScrubbing}
					thumbWidth={8}
					sliderHeight={2}
					thumbScaleValue={controlViewOpacity}
					theme={sliderTheme}
          style={{zIndex:2}}
				/>
			</Animated.View>
			{/* Full screen slider */}
			<Animated.View
				style={[
					styles.fullScreenSliderContainer,
					controlViewStyles,
					fullScreenSliderStyles,
				]}
			>
				<Slider
					progress={progress}
					onSlidingComplete={onSlidingComplete}
					renderBubble={() => <></>}
					minimumValue={min}
					maximumValue={max}
					isScrubbing={isScrubbing}
					thumbWidth={8}
					sliderHeight={2}
					theme={sliderTheme}
				/>
				<View
					style={{
						padding: 16,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<VideoTime
						currentTime={currentTime}
						duration={player.current.duration}
					/>
					<FullscreenController
						enterFullScreen={enterFullScreen}
						exitFullScreen={exitFullScreen}
						isFullScreen={isFullScreen}
					/>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	sliderContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	fullScreenSliderContainer: {
		position: "absolute",
		bottom: 16,
		width: "90%",
		alignSelf: "center",
	},
	controlsContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		...StyleSheet.absoluteFillObject,
	},
	playPauseContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		...StyleSheet.absoluteFillObject,
	},
});
