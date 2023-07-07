import { PUBLICATION } from "constants/tracking";
import { AddBookMarkDocument, AllPublicationsDocument, Mirror, Post, ProfileBookMarksDocument, ProfileDocument, PublicationMainFocus, useAddBookMarkMutation, useRemoveBookMarkMutation } from "customTypes/generated";
import { useAuthStore, useProfile, useToast } from "store/Store";
import TrackAction from "utils/Track";
import Logger from "utils/logger";
import useWatchLater from "store/WatchLaterStore";
import { useState } from "react";

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
			Logger.Error("", error);
			toast.error("failed to add watch later");
		},
		update: (cache) => {
			cache.modify({
				id: cache.identify(publication as any),
				fields: {
					bookmarked(){
						return true;
					}
				}
			});
			// console.log(cache.);
			
			
			const data = cache.readQuery({
				query: AllPublicationsDocument,
				variables: {
					request: {
						profileId: currentProfile?.id,
					},
				},
			});
			console.log(data,'moments');
			
		}
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
					bookmarked(){
						return false;
					}
				}
			})
		}
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
