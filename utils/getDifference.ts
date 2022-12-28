/**
 *
 * @param timestamp Unix timestamp  162548142
 * @returns Difference from current time ex: 6d ago
 *
 */

function getDifference(timestamp: Date) {
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
    const difference = notificationYear - currentYear;
    return `~${difference} y ago`;
  } else if (currentMonth != notificationMonth) {
    const difference = notificationMonth - currentMonth;
    return `~${difference} m ago`;
  } else if (currentDate != notificationDate) {
    const difference = currentDate - notificationDate;
    return `~${difference} d ago`;
  } else if (currentHour != notificationHour) {
    const difference = currentHour - notificationHour;
    return `~${difference} h ago`;
  } else if (currentMinute != notificationMinute) {
    const difference = currentMinute - notificationMinute;
    return `~${difference} min ago`;
  } else if (currentSecond != notificationSecond) {
    const difference = currentSecond - notificationSecond;
    return `~${difference} sec ago`;
  }
}

export default getDifference;
