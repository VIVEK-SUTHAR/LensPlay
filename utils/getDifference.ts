/**
 *
 * @param timestamp Unix timestamp  162548142
 * @returns Difference from current time ex: 6d ago
 *
 */

function getDifference(timestamp: Date | string) {
	const date = new Date();
	const currentDate = date.getDate();
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();
	const currentSecond = date.getSeconds();
	const currentMinute = date.getMinutes();
	const currentHour = date.getHours();
	const notificationStamp = new Date(timestamp);

	const notificationDate = notificationStamp.getDate();
	const notificationMonth = notificationStamp.getMonth();
	const notificationYear = notificationStamp.getFullYear();
	const notificationSecond = notificationStamp.getSeconds();
	const notificationMinute = notificationStamp.getMinutes();
	const notificationHour = notificationStamp.getHours();

	if (currentYear != notificationYear) {
		if (currentYear - notificationYear == 1) {
			if (notificationMonth - currentMonth != 0) {
				if (currentMonth == 0 && notificationMonth == 11) {
					if (currentDate > notificationDate) {
						return `1mon ago`;
					} else {
						return findDiffernce(31, notificationDate - currentDate, "d");
					}
				} else {
					return findDiffernce(notificationMonth, currentMonth, "mon");
				}
			} else {
				return `1 y ago`;
			}
		} else {
			return findDiffernce(notificationYear, currentYear, "y");
		}
	} else if (currentMonth != notificationMonth) {
		return findDiffernce(notificationMonth, currentMonth, "mon");
	} else if (currentDate != notificationDate) {
		return findDiffernce(currentDate, notificationDate, "d");
	} else if (currentHour != notificationHour) {
		return findDiffernce(currentHour, notificationHour, "h");
	} else if (currentMinute != notificationMinute) {
		return findDiffernce(currentMinute, notificationMinute, "min");
	} else if (currentSecond != notificationSecond) {
		return findDiffernce(currentSecond, notificationSecond, "sec");
	}
}

const findDiffernce = (x: number, y: number, stamp: string) => {
	const difference = x - y;
	return `~${difference}${stamp} ago`;
};

export default getDifference;
