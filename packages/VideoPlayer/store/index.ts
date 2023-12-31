import { create } from 'zustand';

interface IVideoPlayer {
  isPaused: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
}

const useVideoPlayerStore = create<IVideoPlayer>((set) => ({
  isPaused: false,
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({
      isLoading: isLoading,
    });
  },
  setIsPaused: (isPaused) => {
    set({
      isPaused: isPaused,
    });
  },
}));

export default useVideoPlayerStore;
