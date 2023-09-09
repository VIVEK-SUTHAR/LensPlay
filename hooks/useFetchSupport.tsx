import { Tip } from "customTypes/Store";
import { Profile, useUserProfilesLazyQuery } from "customTypes/generated";
import React from "react";
import { useAuthStore, useProfile } from "store/Store";
import { useSupportStore } from "store/SupportStore";
import Logger from "utils/logger";
import getAllTips from "utils/tip/getAllTips";
import getTotal from "utils/tip/getTotal";

const useFetchSupport = () => {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<Error | null>(null);
	const {
		tips,
		setTips,
		totalDonation,
		setTotalDonation,
		totalTip,
		setTotalTip,
		donorProfiles,
		setDonorProfiles,
	} = useSupportStore();
	const { currentProfile } = useProfile();
	const { accessToken } = useAuthStore();

	const [
		fetchProfiles,
		{ data: Profile, loading: ProfileLoading, error: ProfileError, refetch: ProfileRefetch },
	] = useUserProfilesLazyQuery();

	React.useEffect(() => {
		fetchSupport();
	}, []);
	const fetchSupport = async () => {
		try {
			const userTips = await getAllTips(currentProfile?.id);
			setTips(userTips);
			const userIds = userTips.map((item: Tip) => item.userId);
			const data = await fetchProfiles({
				variables: {
					request: {
						profileIds: userIds,
					},
				},
				context: {
					headers: {
						"x-access-token": `Bearer ${accessToken}`,
					},
				},
			});

			setDonorProfiles(data?.data?.profiles?.items as Profile[]);

			const userStats = await getTotal(currentProfile?.id);
			if (userStats) {
				Logger.Warn("", userStats?.totalDonation);
				setTotalDonation(userStats?.totalDonation);
				setTotalTip(userStats?.totalTip);
			}
			setLoading(false);
		} catch (error) {
			Logger.Error("", error);
			if (error instanceof Error) {
				setError(error);
			}
		}
	};

	const refetch = async () => {
		await fetchSupport();
	};

	return { loading, error, refetch };
};

export default useFetchSupport;
