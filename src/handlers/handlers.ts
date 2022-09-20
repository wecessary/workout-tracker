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

export const handleAddWorkout = (
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  setWorkoutData([
    ...workoutData,
    {
      index: workoutData.length,
      name: "Your Workout",
      sets: [
        { reps: 10, weight: 15 },
        { reps: 10, weight: 15 },
      ],
    },
  ]);
};

export const handleAddSet = (
  sets: string[],
  setSets: (value: SetStateAction<string[]>) => void
) => {
  const nextSet = sets.length + 1;
  setSets([...sets, `set ${nextSet}`]);
};
