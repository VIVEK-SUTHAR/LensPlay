import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "constants/Storage";
import { PUBLICATION } from "constants/tracking";
import { useProfile, useToast } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import Logger from "utils/logger";
import TrackAction from "utils/Track";
import addToWatchLater from "utils/watchlater/addToWatchLater";
import getWatchLaters from "utils/watchlater/getWatchLaters";
import removeWatchLater from "utils/watchlater/removeWatchLater";

const useAddWatchLater = () => {
	const toast = useToast();
	const { currentProfile } = useProfile();
	const { setAllWatchLaters } = useWatchLater();
	const add = async (publicationId: string) => {
		const watchLater = await AsyncStorage.getItem(StorageKeys.WatchLaters);
		if (watchLater) {
			let parsed = JSON.parse(watchLater);
			parsed.push(publicationId);
			Logger.Warn("Added to Local", parsed);
			await AsyncStorage.setItem(StorageKeys.WatchLaters, JSON.stringify(parsed));
			toast.success("Added to watch later");
			addToWatchLater(currentProfile?.id, publicationId).catch(() => {
				//Retry again here
			});
			setAllWatchLaters(parsed.reverse());
			TrackAction(PUBLICATION.ADD_WATCH_LATER);
		} else {
			const publicationIds = [publicationId];
			await AsyncStorage.setItem(StorageKeys.WatchLaters, JSON.stringify(publicationIds));
			toast.success("Added to watch later");
			setAllWatchLaters(publicationIds);
			addToWatchLater(currentProfile?.id, publicationId).catch(() => {
				//Retry again here
			});
			TrackAction(PUBLICATION.ADD_WATCH_LATER);
		}
	};

	const remove = async (publicationId: string) => {
		const watchLater = await AsyncStorage.getItem(StorageKeys.WatchLaters);
		if (!!watchLater && !!JSON.parse(watchLater)) {
			let watchLaterArray = JSON.parse(watchLater);
			const result = watchLaterArray.filter((item: string, index: number, arr: string[]) => {
				if (item == publicationId) {
					arr.splice(index, 1);
				}
			});
			await AsyncStorage.setItem(StorageKeys.WatchLaters, JSON.stringify(watchLaterArray));
			setAllWatchLaters(watchLaterArray.reverse());
			toast.success("Removed from watch later");
			removeWatchLater(currentProfile?.id, publicationId)
				.then()
				.catch(() => {});
			TrackAction(PUBLICATION.REMOVE_WATCH_LATER);
		} else {
			const watchLaterArray = await getWatchLaters(currentProfile?.id);
			const result = watchLaterArray.filter((item: string, index: number, arr: string[]) => {
				if (item == publicationId) {
					arr.splice(index, 1);
				}
			});
			await AsyncStorage.setItem(StorageKeys.WatchLaters, JSON.stringify(watchLaterArray));
			setAllWatchLaters(watchLaterArray.reverse());
			toast.success("Removed from watch later");
			removeWatchLater(currentProfile?.id, publicationId)
				.then()
				.catch(() => {});
			TrackAction(PUBLICATION.REMOVE_WATCH_LATER);
		}
	};
	return { add, remove };
};
export default useAddWatchLater;
