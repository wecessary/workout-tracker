export const currentTime = new Date();
export const currentDateAsNumber = +`${currentTime.getDate()}${
  currentTime.getMonth() + 1
}${currentTime.getFullYear()}`;
