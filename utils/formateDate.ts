/**
 *
 * @param timestamp Unix TimeStamp 164585412
 * @returns Date in format 12-dec-2051
 */

function convertDate(timestamp: string | Date): string {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	const dateObj = new Date(timestamp);
	const month = months[dateObj.getMonth()];
	const date = dateObj.getDate();
	const year = dateObj.getFullYear();
	return `${date} ${month} ${year}`;
}

export default convertDate;

const getTime = (timestamp: string): string => {
	const dateObj = new Date(timestamp);
	return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export { getTime };
