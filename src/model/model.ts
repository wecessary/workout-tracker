import { ChangeEvent, SetStateAction } from "react";

export type HandleChangeName = (
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export interface WorkoutDataObject {
  index: number;
  name: string;
  sets: Set[];
}

export interface Set {
  reps: number;
  weight: number;
}
