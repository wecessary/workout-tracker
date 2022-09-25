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
}

export interface Set {
  index: number;
  reps: number;
  weight: number;
  easy: boolean;
  done: boolean;
}

export interface UserDataObject {
  date: string;
  workoutData: WorkoutDataObject[];
}
export type SetUserData = (value: SetStateAction<UserDataObject[]>) => void;
