/**
 *
 * @param timestamp Unix timestamp  162548142
 * @returns Difference from current time ex: 6d ago
 *
 */

function getDifference(timestamp: Date | string): string {
	const date = new Date(timestamp);

	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return "• " + interval.toString() + " years ago";
	} else if (interval === 1) {
		return "• " + interval.toString() + " year ago";
	}

	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return "• " + interval.toString() + " months ago";
	} else if (interval === 1) {
		return "• " + interval.toString() + " month ago";
	}

	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return "• " + interval.toString() + " days ago";
	} else if (interval === 1) {
		return "• " + interval.toString() + " day ago";
	}

	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return "• " + interval.toString() + " hours ago";
	} else if (interval === 1) {
		return "• " + interval.toString() + " hour ago";
	}

	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return "• " + interval.toString() + " min ago";
	}

	if (seconds < 10) return "just now";

	return Math.floor(seconds).toString() + " seconds ago";
}

export default getDifference;
