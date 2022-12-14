import { WorkoutDataObjectDetailsAllLevel } from "../model/model";

export const initialWorkoutData = [
  {
    index: 0,
    name: "",
    repsUnit: "reps",
    intensityUnit: "kg",
    sets: [
      {
        name: "",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
        timeStart: 0,
        timeComplete: 0,
      },
    ],
    comment: "",
    displayReps: true,
    displayIntensity: true,
  },
];

export const initialSets = ["set 1", "set 2"];

export const dummyWorkoutDataAllDetails: WorkoutDataObjectDetailsAllLevel[] = [
  {
    date: "2200-01-01",
    index: 0,
    name: "Chest and triceps workout",
    repsUnit: "reps",
    intensityUnit: "lbs",
    sets: [
      {
        name: "Barbell bench press",
        date: "2022-12-14",
        index: 1,
        reps: 8,
        weight: 185,
        easy: false,
        done: true,
        repsUnit: "reps",
        intensityUnit: "lbs",
      },
      {
        name: "Dumbbell flyes",
        date: "2022-12-14",
        index: 2,
        reps: 12,
        weight: 50,
        easy: true,
        done: true,
        repsUnit: "reps",
        intensityUnit: "lbs",
      },
    ],
    comment: "",
    displayReps: true,
    displayIntensity: true,
  },
];
