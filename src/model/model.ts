import { ChangeEvent, SetStateAction } from "react";

export type HandleChangeName = (
  e: ChangeEvent<HTMLTextAreaElement>,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleAddWorkout = (
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleChangeReps = (
  e: ChangeEvent<HTMLInputElement>,
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleChangeEasy = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleChangeDone = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleChangeWeight = (
  e: ChangeEvent<HTMLInputElement>,
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export type HandleChangeComment = (
  e: ChangeEvent<HTMLTextAreaElement>,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => void;

export interface WorkoutDataObject {
  index: number;
  name: string;
  repsUnit: string;
  intensityUnit: string;
  sets: Set[];
  comment: string;
  displayReps?: boolean;
  displayIntensity?: boolean;
}

export interface Set {
  index: number;
  reps: number;
  weight: number;
  easy: boolean;
  done: boolean;
  timeStart?: number;
  timeComplete?: number;
}

export interface UserDataObject {
  date: string;
  workoutData: WorkoutDataObject[];
}

export type SetUserData = (value: SetStateAction<UserDataObject[]>) => void;

export interface ShowOptions {
  exerciseIndex: number;
  showPopup: boolean;
  editCard: boolean;
}
