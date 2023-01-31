import { useQuery } from "@apollo/client";
import React from "react";
import getFeed from "../apollo/Queries/getFeed";
import { useAuthStore, useProfile } from "../store/Store";
import { FeedData } from "../types/Lens/Feed";
const useFeed = () => {
	const { accessToken } = useAuthStore();
	const { currentProfile } = useProfile();

	const { data, error, loading, refetch } = useQuery<FeedData>(getFeed, {
		variables: {
			id: currentProfile?.id,
		},
		context: {
			headers: {
				"x-access-token": `Bearer ${accessToken}`,
			},
		},
		initialFetchPolicy: "cache-and-network",
		pollInterval: 600000,
		refetchWritePolicy: "merge",
	});
	return { data, error, loading, refetch };
};
export default useFeed;
