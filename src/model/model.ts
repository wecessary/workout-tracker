import { ChangeEvent, SetStateAction } from "react";

export type HandleChangeName = (
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleAddWorkout = (
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export interface WorkoutDataObject {
  index: number;
  name: string;
  sets: Set[];
  easy: boolean;
}

export interface Set {
  index: number;
  reps: number;
  weight: number;
}
