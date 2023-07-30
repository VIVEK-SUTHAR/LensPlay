import create from "zustand";

export interface ICreateShotStore {
    isBackCamera: boolean;
    isFlashOn: boolean;
    isRecording: boolean;
    handleBackCamera: (isBackCamera: boolean) => void;
    handleFlash: (isFlashOn: boolean) => void;
    handleRecording: (isRecording: boolean) => void;
}

export const useCreateShotStore = create<ICreateShotStore>((set) => ({
    isBackCamera: true,
    isFlashOn: false,
    isRecording: false,
    handleBackCamera: (isBackCamera: boolean) =>
        set({
            isBackCamera: isBackCamera,
        }),
    handleFlash: (isFlashOn: boolean) =>
        set({
            isFlashOn: isFlashOn,
        }),
    handleRecording: (isRecording: boolean) =>
        set({
            isRecording: isRecording,
        }),
}));
