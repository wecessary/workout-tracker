import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { WorkoutDataObject } from "../model/model";

export const handleChangeName = (
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj: WorkoutDataObject) => {
    if (obj.index === index) {
      return { ...obj, name: e.target.value };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};
