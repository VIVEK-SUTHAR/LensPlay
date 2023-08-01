import { AVPlaybackStatus, Audio, Video } from "expo-av";
import {
	ActivityIndicator,
	Animated,
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ControlStates, ErrorSeverity, PlaybackStates, Props } from "../../types/Videoplayer/index";
import {
	ErrorMessage,
	TouchableButton,
	deepMerge,
	getMinutesSecondsFromMilliseconds,
	styles,
} from "./utils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { defaultProps } from "./props";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Slider from "@react-native-community/slider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import SecondForward from "assets/Icons/SecondForward";
import SecondBackward from "assets/Icons/SecondBackward";

const Player = (tempProps: Props) => {
	const props = deepMerge(defaultProps, tempProps) as Props;

	let playbackInstance: Video | null = null;
	let controlsTimer: NodeJS.Timeout | null = null;
	let initialShow = props.defaultControlsVisible;
	const header = props.header;

	const [errorMessage, setErrorMessage] = useState("");
	const controlsOpacity = useRef(new Animated.Value(props.defaultControlsVisible ? 1 : 0)).current;
	const [controlsState, setControlsState] = useState(
		props.defaultControlsVisible ? ControlStates.Visible : ControlStates.Hidden
	);
	const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
		position: 0,
		duration: 0,
		state: props.videoProps.source ? PlaybackStates.Loading : PlaybackStates.Error,
	});

	// We need to extract ref, because of misstypes in <Slider />
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { ref: sliderRef, ...sliderProps } = props.slider;
	const screenRatio = props.style.width! / props.style.height!;

	let videoHeight = props.style.height;
	let videoWidth = videoHeight! * screenRatio;

	if (videoWidth > props.style.width!) {
		videoWidth = props.style.width!;
		videoHeight = videoWidth / screenRatio;
	}

	useEffect(() => {
		setAudio();

		return () => {
			if (playbackInstance) {
				playbackInstance.setStatusAsync({
					shouldPlay: false,
				});
			}
		};
	}, []);

	useEffect(() => {
		if (!props.videoProps.source) {
			console.error(
				"[VideoPlayer] `Source` is a required in `videoProps`. " +
					"Check https://docs.expo.io/versions/latest/sdk/video/#usage"
			);
			setErrorMessage("`Source` is a required in `videoProps`");
			setPlaybackInstanceInfo({ ...playbackInstanceInfo, state: PlaybackStates.Error });
		} else {
			setPlaybackInstanceInfo({ ...playbackInstanceInfo, state: PlaybackStates.Playing });
		}
	}, [props.videoProps.source]);

	const hideAnimation = () => {
		Animated.timing(controlsOpacity, {
			toValue: 0,
			duration: props.animation.fadeOutDuration,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setControlsState(ControlStates.Hidden);
			}
		});
	};

	const animationToggle = () => {
		if (controlsState === ControlStates.Hidden) {
			Animated.timing(controlsOpacity, {
				toValue: 1,
				duration: props.animation.fadeInDuration,
				useNativeDriver: true,
			}).start(({ finished }) => {
				if (finished) {
					setControlsState(ControlStates.Visible);
				}
			});
		} else if (controlsState === ControlStates.Visible) {
			hideAnimation();
		}

		if (controlsTimer === null && props.autoHidePlayer) {
			controlsTimer = setTimeout(() => {
				if (
					playbackInstanceInfo.state === PlaybackStates.Playing &&
					controlsState === ControlStates.Hidden
				) {
					hideAnimation();
				}
				if (controlsTimer) {
					clearTimeout(controlsTimer);
				}
				controlsTimer = null;
			}, 2000);
		}
	};

	// Set audio mode to play even in silent mode (like the YouTube app)
	const setAudio = async () => {
		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
			});
		} catch (e) {
			props.errorCallback({
				type: ErrorSeverity.NonFatal,
				message: "Audio.setAudioModeAsync",
				obj: e as Record<string, unknown>,
			});
		}
	};

	const updatePlaybackCallback = (status: AVPlaybackStatus) => {
		props.playbackCallback(status);

		if (status.isLoaded) {
			setPlaybackInstanceInfo({
				...playbackInstanceInfo,
				position: status.positionMillis,
				duration: status.durationMillis || 0,
				state:
					status.positionMillis === status.durationMillis
						? PlaybackStates.Ended
						: status.isBuffering
						? PlaybackStates.Buffering
						: status.shouldPlay
						? PlaybackStates.Playing
						: PlaybackStates.Paused,
			});
			if (
				(status.didJustFinish && controlsState === ControlStates.Hidden) ||
				(status.isBuffering && controlsState === ControlStates.Hidden && initialShow)
			) {
				animationToggle();
				initialShow = false;
			}
		} else {
			if (status.isLoaded === false && status.error) {
				const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
				setErrorMessage(errorMsg);
				props.errorCallback({ type: ErrorSeverity.Fatal, message: errorMsg, obj: {} });
			}
		}
	};

	const togglePlay = async () => {
		if (controlsState === ControlStates.Hidden) {
			return;
		}
		const shouldPlay = playbackInstanceInfo.state !== PlaybackStates.Playing;
		if (playbackInstance !== null) {
			await playbackInstance.setStatusAsync({
				shouldPlay,
				...(playbackInstanceInfo.state === PlaybackStates.Ended && { positionMillis: 0 }),
			});
			setPlaybackInstanceInfo({
				...playbackInstanceInfo,
				state:
					playbackInstanceInfo.state === PlaybackStates.Playing
						? PlaybackStates.Paused
						: PlaybackStates.Playing,
			});
			if (shouldPlay) {
				animationToggle();
			}
		}
	};

	if (playbackInstanceInfo.state === PlaybackStates.Error) {
		return (
			<View
				style={{
					backgroundColor: props.style.videoBackgroundColor,
					width: videoWidth,
					height: videoHeight,
				}}
			>
				<ErrorMessage style={props.textStyle} message={errorMessage} />
			</View>
		);
	}

	if (playbackInstanceInfo.state === PlaybackStates.Loading) {
		return (
			<View
				style={{
					backgroundColor: props.style.controlsBackgroundColor,
					width: videoWidth,
					height: videoHeight,
					justifyContent: "center",
				}}
			>
				{props.icon.loading || <ActivityIndicator {...props.activityIndicator} />}
			</View>
		);
	}

	const fastForward = async () => {
		if (playbackInstance !== null) {
			if (playbackInstanceInfo.state === PlaybackStates.Ended) {
				await playbackInstance.setStatusAsync({
					positionMillis: 0,
					shouldPlay: true,
				});
				setPlaybackInstanceInfo({
					...playbackInstanceInfo,
					position: 0,
				});
			}
			const c_position = playbackInstanceInfo.position;
			if (playbackInstance) {
				await playbackInstance.setStatusAsync({
					positionMillis: c_position + 5000,
					shouldPlay: true,
				});
			}
			const position = c_position + 5000;
			setPlaybackInstanceInfo({
				...playbackInstanceInfo,
				position,
			});
		}
	};

	const fastBackward = async () => {
		if (playbackInstance !== null) {
			if (playbackInstanceInfo.state === PlaybackStates.Ended) {
				await playbackInstance.setStatusAsync({
					positionMillis: 0,
					shouldPlay: true,
				});
				setPlaybackInstanceInfo({
					...playbackInstanceInfo,
					position: 0,
				});
			}
			const currentPosition = playbackInstanceInfo.position;
			if (playbackInstance) {
				await playbackInstance.setStatusAsync({
					positionMillis: currentPosition - 5000,
					shouldPlay: true,
				});
			}
			const position = currentPosition - 5000;
			setPlaybackInstanceInfo({
				...playbackInstanceInfo,
				position,
			});
		}
	};

	const doubleTapOnForWard = Gesture.Tap()
		.numberOfTaps(2)
		.maxDuration(250)
		.runOnJS(true)
		.onStart(() => {
			runOnJS(fastForward)();
		});
	const doubleTapOnBackWord = Gesture.Tap()
		.numberOfTaps(2)
		.maxDuration(250)
		.runOnJS(true)
		.onStart(() => {
			runOnJS(fastBackward)();
		});

	return (
		<View
			style={{
				backgroundColor: props.style.videoBackgroundColor,
				width: videoWidth,
				height: videoHeight,
				maxWidth: "100%",
			}}
		>
			<Video
				style={styles.videoWrapper}
				{...props.videoProps}
				ref={(component) => {
					playbackInstance = component;
					if (props.videoProps.ref) {
						props.videoProps.ref.current = component as Video;
					}
				}}
				onPlaybackStatusUpdate={updatePlaybackCallback}
			/>
			<Animated.View
				style={[
					{
						position: "absolute",
						top: 0,
						bottom: 0,
						right: 0,
						left: 0,
						backgroundColor: "rgba(0,0,0,0.4)",
					},
					{
						opacity: controlsOpacity,
					},
				]}
			>
				<Animated.View
					pointerEvents={controlsState === ControlStates.Visible ? "auto" : "none"}
					style={[
						styles.topInfoWrapper,
						{
							opacity: controlsOpacity,
						},
					]}
				>
					{header}
				</Animated.View>

				<TouchableWithoutFeedback onPress={animationToggle}>
					<Animated.View
						style={{
							...StyleSheet.absoluteFillObject,
							opacity: controlsOpacity,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View
							style={{
								...StyleSheet.absoluteFillObject,
								backgroundColor: props.style.controlsBackgroundColor,
								opacity: 0.5,
							}}
						/>
						<View pointerEvents={controlsState === ControlStates.Visible ? "auto" : "none"}>
							<View
								style={[
									styles.iconWrapper,
									{
										width: Dimensions.get("screen").width,
										height: Dimensions.get("screen").height,
										flexDirection: "row",
										justifyContent: "space-around",
										alignItems: "center",
									},
								]}
							>
								<GestureDetector gesture={doubleTapOnBackWord}>
									<TouchableButton
										hitSlop={{
											bottom: 40,
											left: 20,
											top: 40,
											right: 20,
										}}
									>
										<View
											style={{
												height: props.style.height || 280,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<SecondBackward
												color={props.icon.color}
												style={props.icon.style}
												width={24}
												height={24}
											/>
										</View>
									</TouchableButton>
								</GestureDetector>
								<TouchableButton onPress={togglePlay}>
									<View>
										{playbackInstanceInfo.state === PlaybackStates.Buffering &&
											(props.icon.loading || <ActivityIndicator {...props.activityIndicator} />)}
										{playbackInstanceInfo.state === PlaybackStates.Playing && props.icon.pause}
										{playbackInstanceInfo.state === PlaybackStates.Paused && props.icon.play}
										{playbackInstanceInfo.state === PlaybackStates.Ended && props.icon.replay}
										{((playbackInstanceInfo.state === PlaybackStates.Ended && !props.icon.replay) ||
											(playbackInstanceInfo.state === PlaybackStates.Playing &&
												!props.icon.pause) ||
											(playbackInstanceInfo.state === PlaybackStates.Paused &&
												!props.icon.pause)) && (
											<MaterialIcons
												name={
													playbackInstanceInfo.state === PlaybackStates.Playing
														? "pause"
														: playbackInstanceInfo.state === PlaybackStates.Paused
														? "play-arrow"
														: "replay"
												}
												style={props.icon.style}
												size={props.icon.size}
												color={props.icon.color}
											/>
										)}
									</View>
								</TouchableButton>
								<GestureDetector gesture={doubleTapOnForWard}>
									<TouchableButton
										hitSlop={{
											bottom: 40,
											left: 20,
											top: 40,
											right: 20,
										}}
									>
										<View
											style={{
												height: props.style.height || 280,
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<SecondForward
												color={props.icon.color}
												style={props.icon.style}
												width={24}
												height={24}
											/>
										</View>
									</TouchableButton>
								</GestureDetector>
							</View>
						</View>
					</Animated.View>
				</TouchableWithoutFeedback>

				<Animated.View
					pointerEvents={controlsState === ControlStates.Visible ? "auto" : "none"}
					style={[
						styles.bottomInfoWrapper,
						{
							opacity: controlsOpacity,
						},
					]}
				>
					<View
						style={{
							flex: 1,
							flexDirection: props.fullscreen.inFullscreen ? "column" : "column-reverse",
						}}
					>
						<View
							style={{
								...Platform.select({
									ios: {
										marginBottom: props.fullscreen.inFullscreen ? -8 : -20,
										marginVertical: -12,
									},
									android: {
										marginBottom: props.fullscreen.inFullscreen ? -8 : -10,
									},
								}),
							}}
						>
							{props.slider.visible && (
								<Slider
									{...sliderProps}
									style={[styles.slider, props.slider.style]}
									// tapToSeek={true}
									// thumbImage={require("../../assets/images/thumb.png")}
									value={
										playbackInstanceInfo.duration
											? playbackInstanceInfo.position / playbackInstanceInfo.duration
											: 0
									}
									onSlidingStart={() => {
										if (playbackInstanceInfo.state === PlaybackStates.Playing) {
											togglePlay();
											setPlaybackInstanceInfo({
												...playbackInstanceInfo,
												state: PlaybackStates.Paused,
											});
										}
									}}
									onSlidingComplete={async (e) => {
										const position = e * playbackInstanceInfo.duration;
										if (playbackInstance) {
											await playbackInstance.setStatusAsync({
												positionMillis: position,
												shouldPlay: true,
											});
										}
										setPlaybackInstanceInfo({
											...playbackInstanceInfo,
											position,
										});
									}}
								/>
							)}
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								{props.timeVisible && (
									<Text style={[props.textStyle, styles.timeLeft]}>
										{getMinutesSecondsFromMilliseconds(playbackInstanceInfo.position)} /
									</Text>
								)}
								{props.timeVisible && (
									<Text style={[props.textStyle, styles.timeRight]}>
										{" "}
										{getMinutesSecondsFromMilliseconds(playbackInstanceInfo.duration)}
									</Text>
								)}
							</View>
							<View>
								{props.mute.visible && (
									<TouchableButton
										onPress={() =>
											props.mute.isMute ? props.mute.exitMute?.() : props.mute.enterMute?.()
										}
									>
										<View>
											{props.icon.mute}
											{props.icon.exitMute}
											{((!props.icon.mute && props.mute.isMute) ||
												(!props.icon.exitMute && !props.mute.isMute)) && (
												<MaterialIcons
													name={props.mute.isMute ? "volume-up" : "volume-off"}
													style={props.icon.style}
													size={props.icon.size! / 2}
													color={props.icon.color}
												/>
											)}
										</View>
									</TouchableButton>
								)}
								{props.fullscreen.visible && (
									<TouchableButton
										onPress={() =>
											props.fullscreen.inFullscreen
												? props.fullscreen.exitFullscreen!()
												: props.fullscreen.enterFullscreen!()
										}
									>
										<View>
											{!props.fullscreen.inFullscreen && props.icon.fullscreen}
											{props.fullscreen.inFullscreen && props.icon.exitFullscreen}
											{((!props.icon.fullscreen && !props.fullscreen.inFullscreen) ||
												(!props.icon.exitFullscreen && props.fullscreen.inFullscreen)) && (
												<MaterialIcons
													name={props.fullscreen.inFullscreen ? "fullscreen-exit" : "fullscreen"}
													style={props.icon.style}
													size={props.icon.size! / 2}
													color={props.icon.color}
												/>
											)}
										</View>
									</TouchableButton>
								)}
							</View>
						</View>
					</View>
				</Animated.View>
			</Animated.View>
		</View>
	);
};

Player.defaultProps = defaultProps;

export default Player;
