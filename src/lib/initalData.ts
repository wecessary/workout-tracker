import { nanoid } from "nanoid";

export function generateInitialWorkoutData() {
  return [
    {
      exId: nanoid(),
      index: 0,
      name: "",
      repsUnit: "reps",
      intensityUnit: "kg",
      sets: [
        {
          setId: nanoid(),
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
}
