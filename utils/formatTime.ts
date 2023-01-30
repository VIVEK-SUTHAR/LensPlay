function formatTime(sec: string) {
  let seconds = sec.split(".")[0];

  var hours = Math.floor(seconds / 3600);
  hours >= 1 ? (seconds = seconds - hours * 3600) : (hours = "00");
  var min = Math.floor(seconds / 60);
  min >= 1 ? (seconds = seconds - min * 60) : (min = "00");
  seconds < 1 ? (seconds = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;
  seconds.toString().length == 1 ? (seconds = "0" + seconds) : void 0;
  if (hours === "00") {
    return min + ":" + seconds;
  }
  return hours + ":" + min + ":" + seconds;
}
export default formatTime;
