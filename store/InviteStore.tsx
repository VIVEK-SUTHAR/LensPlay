import create from "zustand";
import { GetInviteCodeAPIResponse, GetInviteResponse, InviteStore } from "../types/Store";

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
