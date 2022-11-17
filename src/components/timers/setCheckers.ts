import { Set } from "../../model/model";

export const currentSetStarted = (setIndex: number, sets: Set[]) => {
  return sets[setIndex] && sets[setIndex].timeStart ? true : false;
};

export const currentSetComplete = (setIndex: number, sets: Set[]) => {
  return sets[setIndex] && sets[setIndex].timeComplete ? true : false;
};

export const prevSetExists = (setIndex: number, sets: Set[]) => {
  return sets[setIndex - 1] ? true : false;
};

export const prevSetStarted = (setIndex: number, sets: Set[]) => {
  return sets[setIndex - 1] && sets[setIndex - 1].timeStart ? true : false;
};

export const prevSetComplete = (setIndex: number, sets: Set[]) => {
  return sets[setIndex - 1] && sets[setIndex - 1].timeComplete ? true : false;
};

export const nextSetExists = (setIndex: number, sets: Set[]) => {
  return sets[setIndex + 1] ? true : false;
};

export const nextSetStarted = (setIndex: number, sets: Set[]) => {
  return sets[setIndex + 1] && sets[setIndex + 1].timeStart ? true : false;
};
