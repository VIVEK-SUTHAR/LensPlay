import { PUBLICATION } from "constants/tracking";
import {
	Mirror,
	Post,
	ProfileBookMarksDocument,
	ProfileBookMarksQueryHookResult,
	ProfileBookMarksQueryResult,
	PublicationMainFocus,
	useAddBookMarkMutation,
	useRemoveBookMarkMutation,
} from "customTypes/generated";
import { useState } from "react";
import { useAuthStore, useProfile, useToast } from "store/Store";
import useWatchLater from "store/WatchLaterStore";
import TrackAction from "utils/Track";
import Logger from "utils/logger";

const useAddWatchLater = () => {
	const toast = useToast();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();
	const { setSessionCount } = useWatchLater();
	const [publication, setPublication] = useState<Post | Mirror | null>(null);
	const [addToBookMark] = useAddBookMarkMutation({
		onCompleted: (data) => {
			Logger.Success("", data);
			toast.success("Added to watch later");
			setTimeout(() => {
				setSessionCount();
			}, 100);
			TrackAction(PUBLICATION.ADD_WATCH_LATER);
		},
		onError: (error) => {
			Logger.Error("error", error);
			toast.error("failed to add watch later");
		},
		update: (cache) => {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					bookmarked() {
						return true;
					},
				},
			});

			const BookMarksData = cache.readQuery({
				query: ProfileBookMarksDocument,
				variables: {
					req: {
						profileId: currentProfile?.id,
						metadata: {
							mainContentFocus: [PublicationMainFocus.Video],
						},
					},
				},
			});

			BookMarksData!.publicationsProfileBookmarks.items = [
				publication,
				...BookMarksData!.publicationsProfileBookmarks?.items,
			];

			cache.writeQuery({
				query: ProfileBookMarksDocument,
				data: BookMarksData,
			});
		},
	});

	const [removeFromBookMark] = useRemoveBookMarkMutation({
		onCompleted: (data) => {
			Logger.Success("", data);
			toast.success("removed successfully");
			setTimeout(() => {
				setSessionCount();
			}, 100);
			TrackAction(PUBLICATION.REMOVE_WATCH_LATER);
		},
		onError: (error) => {
			Logger.Error("", error);
			toast.error("failed to remove watch later");
		},
		update: (cache) => {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					bookmarked() {
						return false;
					},
				},
			});

			const BookMarksData = cache.readQuery({
				query: ProfileBookMarksDocument,
				variables: {
					req: {
						profileId: currentProfile?.id,
						metadata: {
							mainContentFocus: [PublicationMainFocus.Video],
						},
					},
				},
			});

			BookMarksData!.publicationsProfileBookmarks.items =
				BookMarksData!.publicationsProfileBookmarks.items.filter(
					(bookmark: Post | Mirror) => bookmark?.id !== publication?.id
				);

			Logger.Success("", BookMarksData!.publicationsProfileBookmarks.items?.length);

			cache.writeQuery({
				query: ProfileBookMarksDocument,
				data: BookMarksData,
			});
		},
	});

	const add = async (publication: Post | Mirror) => {
		setPublication(publication);
		console.log(publication?.id);

		addToBookMark({
			variables: {
				req: {
					profileId: currentProfile?.id,
					publicationId: publication?.id,
				},
			},
			context: {
				headers: {
					"x-access-token": `Bearer ${accessToken}`,
				},
			},
		});
	};

	const remove = async (publication: Post | Mirror) => {
		setPublication(publication);
		removeFromBookMark({
			variables: {
				req: {
					profileId: currentProfile?.id,
					publicationId: publication?.id,
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
