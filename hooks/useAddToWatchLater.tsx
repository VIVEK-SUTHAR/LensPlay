import { PUBLICATION } from "constants/tracking";
import {
	Mirror,
	Post,
	PublicationBookmarksDocument,
	PublicationMetadataMainFocusType,
	useAddPublicationBookmarkMutation,
	useRemovePublicationBookmarkMutation,
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
	const [addToBookMark] = useAddPublicationBookmarkMutation({
		onCompleted: (data) => {
			Logger.Success("Bookmarks Updated to Server");
			setSessionCount();
			TrackAction(PUBLICATION.ADD_WATCH_LATER);
		},
		onError: (error) => {
			Logger.Error("error", error);
			toast.error("failed to add watch later");
		},
		// update: (cache) => {
		// 	cache.modify({
		// 		id: cache.identify(publication as any),
		// 		fields: {
		// 			bookmarked() {
		// 				return true;
		// 			},
		// 		},
		// 	});
		// 	const BookMarksData = cache.readQuery({
		// 		query: PublicationBookmarksDocument,
		// 		variables: {
		// 			req: {
		// 				profileId: currentProfile?.id,
		// 				metadata: {
		// 					mainContentFocus: [PublicationMetadataMainFocusType.Video],
		// 				},
		// 			},
		// 		},
		// 	});

		// 	BookMarksData!.publicationsProfileBookmarks.items = [
		// 		publication,
		// 		...BookMarksData!.publicationsProfileBookmarks?.items,
		// 	];

		// 	cache.writeQuery({
		// 		query: PublicationBookmarksDocument,
		// 		data: BookMarksData,
		// 	});
		// },
	});

	const [removeFromBookMark] = useRemovePublicationBookmarkMutation({
		onCompleted: (data) => {
			Logger.Success("", data);
			TrackAction(PUBLICATION.REMOVE_WATCH_LATER);
			setSessionCount();
		},
		onError: (error) => {
			Logger.Error("", error);
			toast.error("failed to remove watch later");
		},
		// update: (cache) => {
		// 	const BookMarksData = cache.readQuery({
		// 		query: PublicationBookmarksDocument,
		// 		variables: {
		// 			request: {
		// 				forId: pinnedPublication.value,
		// 			},
		// 		},
		// 	});

		// 	BookMarksData = BookMarksData!.publicationsProfileBookmarks.items.filter(
		// 		(bookmark: Post | Mirror) => bookmark?.id !== publication?.id
		// 	);

		// 	cache.writeQuery({
		// 		query: PublicationBookmarksDocument,
		// 		data: BookMarksData,
		// 	});

		// 	cache.modify({
		// 		id: cache.identify(publication as any),
		// 		fields: {
		// 			bookmarked() {
		// 				return false;
		// 			},
		// 		},
		// 	});
		// 	toast.success("removed successfully");
		// },
	});

	const add = async (publication: Post | Mirror) => {
		console.log(publication, "red");
		setPublication(publication);
		console.log(publication?.id);
		toast.success("Added to watch later");

		addToBookMark({
			variables: {
				request: {
					on: publication?.id,
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
				request: {
					on: publication?.id,
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
