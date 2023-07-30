import create from "zustand";

export interface ICreateShotStore {
    isBackCamera: boolean;
    isFlashOn: boolean;
    isRecording: boolean;
    isMute: boolean;
    setIsBackCamera: (isBackCamera: boolean) => void;
    setIsFlashOn: (isFlashOn: boolean) => void;
    setIsRecording: (isRecording: boolean) => void;
    setIsMute: (isMute: boolean) => void;
}

export const useCreateShotStore = create<ICreateShotStore>((set) => ({
    isBackCamera: true,
    isFlashOn: false,
    isRecording: false,
    isMute: false,
    setIsBackCamera: (isBackCamera: boolean) =>
        set({
            isBackCamera: isBackCamera,
        }),
    setIsFlashOn: (isFlashOn: boolean) =>
        set({
            isFlashOn: isFlashOn,
        }),
    setIsRecording: (isRecording: boolean) =>
        set({
            isRecording: isRecording,
        }),
    setIsMute: (isMute: boolean) =>
        set({
            isMute: isMute,
        }),
}));
