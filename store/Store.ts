import type { FeedItemRoot, Mirror, Post } from "customTypes/generated";
import {
	IActivePublication,
	IAuthStore,
	ICommentStore,
	IThemeStore,
	OptimisticStore,
	OptimitisticComment,
	ToastProps,
	ToastType,
	UserStore,
} from "customTypes/Store";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
	accessToken: "",
	setAccessToken: (newAccessToken: string) => set({ accessToken: newAccessToken }),
	refreshToken: "",
	setRefreshToken: (newRefreshToken: string) => set({ refreshToken: newRefreshToken }),
	hasAccess: false,
	handleAccess: (value: boolean) => set({ hasAccess: value }),
	viaDeskTop: false,
	setIsViaDeskTop: (newstate: boolean) => set({ viaDeskTop: newstate }),
}));

export const useProfile = create<UserStore>((set) => ({
	currentProfile: undefined,
	hasHandle: null,
	profiles: [],
	setCurrentProfile: (newProfile) => set({ currentProfile: newProfile }),
	setHasHandle: (hasHandle) => set({ hasHandle: hasHandle }),
	setProfiles: (profiles) => set({ profiles: profiles }),
}));

export const useThemeStore = create<IThemeStore>((set) => ({
	PRIMARY: "#2AD95C",
	DARK_PRIMARY: "#1A1A1A",
	setPrimaryColor: (newPrimaryColor: string) => set({ PRIMARY: newPrimaryColor }),
}));

export const useToast = create<ToastProps>((set) => ({
	isVisible: false,
	message: "",
	timeOut: 3000,
	success: (message: string) =>
		set({
			isVisible: true,
			message: message,
			type: ToastType.SUCCESS,
		}),
	error: (errormessage: string) =>
		set({
			message: errormessage,
			isVisible: true,
			type: ToastType.ERROR,
		}),
	info: (message: string) =>
		set({
			isVisible: true,
			message: message,
			type: ToastType.INFO,
		}),
	show: (message: string, type: ToastType, isVisible: boolean) =>
		set({ isVisible: isVisible, message: message, type: type }),
}));

export const useCommentStore = create<ICommentStore>((set) => ({
	comment: false,
	setComments: (comment) => {
		set({
			comment: comment,
		});
	},
}));

export const useOptimisticStore = create<OptimisticStore>((set) => ({
	optimitisticComment: {
		commentText: "",
		handle: "",
		isIndexing: false,
		username: "",
	},
	setOptimitisticComment: (newState: OptimitisticComment) => {
		set({
			optimitisticComment: {
				commentText: newState.commentText,
				handle: newState.handle,
				isIndexing: newState.isIndexing,
				username: newState.username,
			},
		});
	},
}));

export const useActivePublication = create<IActivePublication>((set) => ({
	activePublication: null,
	setActivePublication: (newPublication: Post | Mirror | FeedItemRoot) => {
		set({
			activePublication: newPublication,
		});
	},
}));

const useStore = create((set) => ({}));

export default useStore;