import React from "react";
import { useProfile, useSupportStore } from "store/Store";
import Logger from "utils/logger";
import getAllTips from "utils/tip/getAllTips";
import getTotal from "utils/tip/getTotal";

const useFetchSupport = () => {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<Error | null>(null);
	const { tips, setTips, totalDonation, setTotalDonation, totalTip, setTotalTip,donorIds,setDonorIds } =
		useSupportStore();
	const { currentProfile } = useProfile();

	React.useEffect(() => {
		fetchSupport();
	}, []);
	const fetchSupport = async () => {
		try {
			if (!tips) {
				const userTips = await getAllTips(currentProfile?.id);
				setTips(userTips);
				const donorIds=userTips.map((item)=>setDonorIds(item?.userId));
				Logger.Success('adad',typeof(donorIds))
				const userStats = await getTotal(currentProfile?.id);
				Logger.Log("", userStats);
				if (userStats) {
					Logger.Warn("", userStats?.totalDonation);
					setTotalDonation(userStats?.totalDonation);
					setTotalTip(userStats?.totalTip); 
				}
			}
			setLoading(false);
		} catch (error) {
			Logger.Error("", error);
			if (error instanceof Error) {
				setError(error);
			}
		}
	};

	return { loading, error };
};

export default useFetchSupport;
