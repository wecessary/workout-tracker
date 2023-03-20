import { Set } from "../model/model";

export const currentSetStarted = (setIndex: number, sets: Set[]) => {
  return !!sets[setIndex]?.timeStart;
};

export const currentSetComplete = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex]?.timeComplete;
};

export const prevSetExists = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex - 1];
};

export const prevSetStarted = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex - 1]?.timeStart;
};

export const prevSetComplete = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex - 1]?.timeComplete;
};

export const nextSetExists = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex + 1];
};

export const nextSetStarted = (setIndex: number, sets: Set[]): boolean => {
  return !!sets[setIndex + 1]?.timeStart;
};
