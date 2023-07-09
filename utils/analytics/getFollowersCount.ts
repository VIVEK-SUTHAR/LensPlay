import { LENSPLAY_API } from "constants/index";
import Logger from "utils/logger";

export type GetFollowersDataOptions = {
	handle: string;
	noOfDays: number;
};

const getFollowesData = async (options: GetFollowersDataOptions) => {
	if (!options.handle) {
		throw new Error("Please provide hanlde :(");
	}

	try {
		let headersList = {
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			handle: options.handle,
			noOfDays: options.noOfDays || 7,
		});

		let response = await fetch(`${LENSPLAY_API}analytics/getHistoricFollowersCount`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			const data = await response.json();
			return data.message;
		}
	} catch (error) {
		Logger.Error("Failed to load followers count..", error);
		throw new Error("Failed to load followers count..");
	}
};
export default getFollowesData;
