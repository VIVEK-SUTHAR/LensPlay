import { Video } from "expo-av";
import React from "react";
import create from "zustand";

interface IShotsStore {
    currentIndex: number;
    shotsRef: React.RefObject<Video> | null;
    videoURL: string;
    setCurrentIndex: (currentIndex: number) => void;
    setShotsRef: (ref: React.RefObject<Video>) => void;
    setVideoURL: (url: string) => void;
    clearStore: () => void;
}

const useShotsStore = create<IShotsStore>((set) => ({
    currentIndex: 0,
    shotsRef: null,
    videoURL: "",
    setCurrentIndex: (currentIndex) => {
        set({
            currentIndex: currentIndex,
        });
    },
    setShotsRef: (ref) => {
        set({
            shotsRef: ref,
        });
    },
    setVideoURL: (url) => {
        set({
            videoURL: url,
        });
    },
    clearStore: () => {
        set({
            currentIndex: 0,
            shotsRef: null,
            videoURL: ""
        })
    }
}));

export default useShotsStore;
