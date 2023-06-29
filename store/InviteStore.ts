import { type GetInviteCodeAPIResponse, GetInviteResponse, InviteStore } from "customTypes/Store";
import create from "zustand";

export const useInviteStore = create<InviteStore>((set) => ({
	invites: [],
	inviteError: "",
	handleInvites: (invites: GetInviteCodeAPIResponse[]) =>
		set({
			invites: invites,
		}),
	handleError: (error: GetInviteResponse) =>
		set({
			inviteError: error,
		}),
	clearInvites: () =>
		set({
			inviteError: "",
			invites: [],
		}),
}));
