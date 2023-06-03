import MyVideoCard from "components/common/MyVideoCard";
import React from "react";
import getWatchLaters from "utils/watchlater/getWatchLaters";

export default function WatchLaterList() {
	async function getData() {
		const watchLater = await getWatchLaters();
		console.log(watchLater);
	}

	React.useEffect(() => {
		getData();
	}, []);

	return <MyVideoCard />;
}
