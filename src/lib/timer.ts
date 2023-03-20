import {
  currentSetComplete,
  prevSetStarted,
  prevSetComplete,
  prevSetExists,
  currentSetStarted,
  nextSetExists,
  nextSetStarted,
} from "./setCheckers";

import { Set } from "../model/model";

export const calTimeDiff = (newTimeInMs: number, oldTimeInMs: number) =>
  Math.floor((newTimeInMs - oldTimeInMs) / 1000);

export const timerDisabled = (setIndex: number, sets: Set[]) => {
  return (
    currentSetComplete(setIndex, sets) || //current set is complete, disable it, regardless
    (prevSetStarted(setIndex, sets) && !prevSetComplete(setIndex, sets)) || //prev set ongoing, disable current set
    (prevSetExists(setIndex, sets) && !prevSetStarted(setIndex, sets)) //prev set exists and hasn't started, disable current set
  );
};

export const restTimer = (sets: Set[], setIndex: number) => {
  const currentSetCompleteTime = sets[setIndex]?.timeComplete || 0;
  const nextSetStartTime = sets[setIndex + 1]?.timeStart || 0;

  const isResting =
    currentSetComplete(setIndex, sets) &&
    nextSetExists(setIndex, sets) &&
    !nextSetStarted(setIndex, sets);

  const restTime = // this is the final rest time
    currentSetComplete(setIndex, sets) &&
    nextSetExists(setIndex, sets) &&
    nextSetStarted(setIndex, sets)
      ? nextSetStartTime - currentSetCompleteTime
      : 0;

  const runningRestTime = Date.now() - currentSetCompleteTime;

  return isResting ? runningRestTime : restTime;
};
