import { SliderProps } from "@react-native-community/slider";
import { AVPlaybackStatus, Video, VideoProps } from "expo-av";
import { MutableRefObject, ReactNode } from "react";
import { ActivityIndicatorProps, ColorValue, TextStyle } from "react-native";

export type Props = RequiredProps & DefaultProps;

export enum ControlStates {
    Visible = "Visible",
    Hidden = "Hidden",
}

export enum PlaybackStates {
    Loading = "Loading",
    Playing = "Playing",
    Paused = "Paused",
    Buffering = "Buffering",
    Error = "Error",
    Ended = "Ended",
}

export enum ErrorSeverity {
    Fatal = "Fatal",
    NonFatal = "NonFatal",
}

export type ErrorType = {
    type: ErrorSeverity;
    message: string;
    obj: Record<string, unknown>;
};


export type RequiredProps = {
    videoProps: VideoProps & {
        ref?: MutableRefObject<Video>;
    };
};

export type DefaultProps = {
    errorCallback: (error: ErrorType) => void;
    playbackCallback: (status: AVPlaybackStatus) => void;
    defaultControlsVisible: boolean;
    timeVisible: boolean;
    textStyle: TextStyle;
    slider: {
        visible?: boolean;
    } & SliderProps;
    activityIndicator: ActivityIndicatorProps;
    animation: {
        fadeInDuration?: number;
        fadeOutDuration?: number;
    };
    header: ReactNode;
    style: {
        width?: number;
        height?: number;
        videoBackgroundColor?: ColorValue;
        controlsBackgroundColor?: ColorValue;
    };
    icon: {
        size?: number;
        color?: ColorValue;
        style?: TextStyle;
        pause?: JSX.Element;
        play?: JSX.Element;
        replay?: JSX.Element;
        loading?: JSX.Element;
        fullscreen?: JSX.Element;
        exitFullscreen?: JSX.Element;
        mute?: JSX.Element;
        exitMute?: JSX.Element;
    };
    fullscreen: {
        enterFullscreen?: () => void;
        exitFullscreen?: () => void;
        inFullscreen?: boolean;
        visible?: boolean;
    };
    autoHidePlayer: boolean;
    mute: {
        enterMute?: () => void;
        exitMute?: () => void;
        isMute?: boolean;
        visible?: boolean;
    };
};
