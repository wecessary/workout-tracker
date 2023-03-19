import { getMax, getMean, getMin, getSum } from "./analyticsUtils";
import { Set, WorkoutDataObject } from "../model/model";

export const getCompletedSets = (workoutDataObj: WorkoutDataObject) => {
  return workoutDataObj.sets
    ? workoutDataObj.sets.filter((set) => set.timeComplete)
    : [];
};

export const getRepsTotal = (sets: Set[]) => {
  return getSum(sets.map((set) => set.reps));
};

export const getMaxMeanMinWeight = (sets: Set[]) => {
  const weights = sets.map((set) => set.weight);

  return [getMax(weights), getMean(weights), getMin(weights)];
};
