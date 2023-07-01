import { PUBLICATION } from "constants/tracking";
import { useAddBookMarkMutation, useRemoveBookMarkMutation } from "customTypes/generated";
import { useAuthStore, useProfile, useToast } from "store/Store";
import TrackAction from "utils/Track";
import Logger from "utils/logger";

const useAddWatchLater = () => {
	const toast = useToast();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();

	const [addToBookMark] = useAddBookMarkMutation({
		onCompleted: (data) => {
			Logger.Success("", data);
			toast.success("Added to watch later");
			TrackAction(PUBLICATION.ADD_WATCH_LATER);
		},
		onError: (error) => {
			Logger.Error("", error);
			toast.error("failed to add watch later");
		},
	});

	const [removeFromBookMark] = useRemoveBookMarkMutation({
		onCompleted: (data) => {
			Logger.Success("", data);
			toast.success("removed successfully");
			TrackAction(PUBLICATION.REMOVE_WATCH_LATER);
		},
		onError: (error) => {
			Logger.Error("", error);
			toast.error("failed to remove watch later");
		},
	});

	const add = async (publicationId: string) => {
		addToBookMark({
			variables: {
				req: {
					profileId: currentProfile?.id,
					publicationId: publicationId,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	const remove = async (publicationId: string) => {
		removeFromBookMark({
			variables: {
				req: {
					profileId: currentProfile?.id,
					publicationId: publicationId,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	return { add, remove };
};

export default useAddWatchLater;
