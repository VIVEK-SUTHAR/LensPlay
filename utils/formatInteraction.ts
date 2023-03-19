/**
 *
 * @param value number to be formatted
 * @returns formatted number like 1k or 6M
 *
 */

function formatInteraction(value: number) {
  let result = "";
  if (value > 1000000) {
    result = (value / 1000000).toFixed(2) + "M";
  } else if (value > 1000) {
    result = (value / 1000).toFixed(2) + "K";
  } else {
    result = value?.toString();
  }
  return result;
}

export default formatInteraction;
