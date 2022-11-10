export const initialWorkoutData = [
  {
    index: 0,
    name: "",
    repsUnit: "reps",
    intensityUnit: "kg",
    sets: [
      {
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

export const initialUserData = [
  {
    date: "2022-09-23",
    workoutData: initialWorkoutData,
  },
];

export const initialSets = ["set 1", "set 2"];
