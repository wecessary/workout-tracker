export const currentTime = new Date();
const fullYear = currentTime.getFullYear();
const month = currentTime.getMonth() + 1;
const date = currentTime.getDate();
function formatter(dateTime: number) {
  return ("0" + dateTime).slice(-2);
}

export const currentDateAsString = `${fullYear}-${formatter(month)}-${formatter(
  date
)}`;

export const secToMinSec = (timeInSec: number, format: string) => {
  const min = Math.floor(timeInSec / 60);
  const s = Math.floor(timeInSec % 60);

  if (format === "00:00") {
    return `${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
  }

  return `${min > 0 ? min + "m" : ""}${s > 0 ? s + "s" : ""}`;
};

export const milSecToMin = (timeInMilSec: number) => {
  return Math.round(timeInMilSec / 1000 / 60);
};
