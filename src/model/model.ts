export interface WorkoutDataObject {
  exId: string;
  index: number;
  name: string;
  repsUnit: string;
  intensityUnit: string;
  sets: Set[];
  comment: string;
  displayReps?: boolean;
  displayIntensity?: boolean;
}

export interface WorkoutDataObjectWithDate {
  date: string;
  index: number;
  name: string;
  repsUnit: string;
  intensityUnit: string;
  sets: Set[];
  comment: string;
  displayReps?: boolean;
  displayIntensity?: boolean;
}

export interface WorkoutDataObjectDetailsAllLevel {
  date: string;
  index: number;
  name: string;
  repsUnit: string;
  intensityUnit: string;
  sets: SetWithAllDetails[];
  comment: string;
  displayReps?: boolean;
  displayIntensity?: boolean;
}

export interface Set {
  setId: string;
  index: number;
  reps: number;
  weight: number;
  easy: boolean;
  done: boolean;
  timeStart?: number;
  timeComplete?: number;
}

export interface SetWithAllDetails {
  name: string;
  date: string;
  index: number;
  reps: number;
  weight: number;
  easy: boolean;
  done: boolean;
  timeStart?: number;
  timeComplete?: number;
  repsUnit: string;
  intensityUnit: string;
}

export interface SetWithStats {
  totalTime: number;
  duration: number;
  restTime: number;
  name: string;
  date: string;
  index: number;
  reps: number;
  weight: number;
  easy: boolean;
  done: boolean;
  timeStart?: number | undefined;
  timeComplete?: number | undefined;
  repsUnit: string;
  intensityUnit: string;
}

export interface UserDataObject {
  date: string;
  workoutData: WorkoutDataObject[];
}

export interface UserDataObjectNamesAndDatesAllLevel {
  date: string;
  workoutData: WorkoutDataObjectDetailsAllLevel[];
}

export interface ShowOptions {
  exerciseIndex: number;
  showMenu: boolean;
  editCard: boolean;
}

export interface ExerciseStatObj {
  name: string;
  reps: number;
  weights: number;
  restTimes: number;
  durations: number;
  date: string;
}

export type ExerciseStats = [
  number[],
  number[],
  number[],
  number[],
  string[],
  string[]
];

export type AttendanceStats = [
  string[],
  number[],
  number[],
  string[],
  string[]
];

export interface LeaderBoardStats {
  exerciseName: string;
  numberOfRepsCompleted: number;
  daysSinceLastCompleted: number;
}
