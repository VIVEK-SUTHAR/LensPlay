import type { Maybe, VideoMetadataV3 } from "customTypes/generated";

function getVideoDuration(time) {
	if(!time) return
	
	var sec_num = parseInt(time, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}
export default getVideoDuration;
