import { Profile } from "customTypes/generated";
import {create} from "zustand";

interface IProfileStore {
    currentProfile: undefined | Profile
    setCurrentProfile: (profile: Profile) => void
}

const useProfileStore = create<IProfileStore>((set) => ({
    currentProfile: undefined,
    setCurrentProfile: (profile) => {
        set({
            currentProfile: profile,
        });
    },
}));

export default useProfileStore;