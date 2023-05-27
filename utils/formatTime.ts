function formatTime(sec: string): string {
	const second: string = sec.split(".")[0];
	const totalSeconds: number = parseInt(second);

	const totalMinutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (hours === 0) {
		return [minutes.toString().padStart(2, "0"), seconds.toString().padStart(2, "0")].join(":");
	}

	return [
		hours.toString().padStart(2, "0"),
		minutes.toString().padStart(2, "0"),
		seconds.toString().padStart(2, "0"),
	].join(":");
}

export default formatTime;
