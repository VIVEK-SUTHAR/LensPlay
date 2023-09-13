import create from "zustand";

interface LikeStore {
    isLiked: boolean,
    isDisLiked: boolean,
    likeCount: number,
    setIsLiked: (isLiked: boolean) => void
    setIsDisLiked: (isDisLiked: boolean) => void
    setLikeCount: (likeCount: number) => void
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
