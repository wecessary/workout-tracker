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
