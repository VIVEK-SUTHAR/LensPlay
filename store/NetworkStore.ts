import { INetWorkStore } from "customTypes/Store";
import create from "zustand";

const useNetworkStore = create<INetWorkStore>((set) => ({
	isOffline: false,
	setIsOffline: (newValue) =>
		set({
			isOffline: newValue,
		}),
}));

export default useNetworkStore;
