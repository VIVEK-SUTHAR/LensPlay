import { create } from "zustand";

interface LikeStore {
    isLiked: boolean,
    isDisLiked: boolean,
    likeCount: number,
    setIsLiked: (isLiked: boolean) => void
    setIsDisLiked: (isDisLiked: boolean) => void
    setLikeCount: (likeCount: number) => void
}

interface CollectStore {
    isCollected: boolean,
    collectCount: number,
    setIsCollected: (isCollected: boolean) => void
    setCollectCount: (collectCount: number) => void
}

interface MirrorStore {
    isMirrored: boolean,
    mirrorCount: number,
    setIsMirrored: (isMirrored: boolean) => void
    setMirrorCount: (mirrorCount: number) => void
}

export const useLikeStore = create<LikeStore>((set) => ({
    isLiked: false,
    isDisLiked: false,
    likeCount: 0,
    setIsLiked: (isLiked) =>
        set({
            isLiked: isLiked,
        }),
    setIsDisLiked: (isDisLiked) =>
        set({
            isDisLiked: isDisLiked,
        }),
    setLikeCount: (likeCount) =>
        set({
            likeCount: likeCount,
        }),
}));

export const useCollectStore = create<CollectStore>((set) => ({
    isCollected: false,
    collectCount: 0,
    setIsCollected: (isCollected) =>
        set({
            isCollected: isCollected,
        }),
    setCollectCount: (collectCount) =>
        set({
            collectCount: collectCount,
        }),
}));

export const useMirrorStore = create<MirrorStore>((set) => ({
    isMirrored: false,
    mirrorCount: 0,
    setIsMirrored: (isMirrored) =>
        set({
            isMirrored: isMirrored,
        }),
    setMirrorCount: (mirrorCount) =>
        set({
            mirrorCount: mirrorCount,
        }),
}));
