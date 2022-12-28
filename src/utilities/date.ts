export const dateToString = (dateInput: Date) => {
  const fullYear = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, "0");
  const day = String(dateInput.getDate()).padStart(2, "0");
  return `${fullYear}-${month}-${day}`;
};

export const currentTime = new Date();

export const currentDateAsString = dateToString(currentTime);

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

export const getDateXDaysFromToday = (x: number) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + x);

  return dateToString(tomorrow);
};
