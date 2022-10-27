/**
 * @jest-environment jsdom
 */

import { addSet } from "./handlers";
import { WorkoutDataObject } from "../model/model";

describe("addSet function: test can add set", () => {
  test("when there is a set", () => {
    const receivedWorkoutData = [
      {
        index: 0,
        name: "",
        repsUnit: "reps",
        intensityUnit: "kg",
        sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
        comment: "",
      },
    ];

    const outputWorkoutData = addSet(0, receivedWorkoutData);
    expect(outputWorkoutData[0].sets).toHaveLength(2);
  });

  test("when there is no set", () => {
    const receivedWorkoutData = [
      {
        index: 0,
        name: "",
        repsUnit: "reps",
        intensityUnit: "kg",
        comment: "",
      },
    ];
    const outputWorkoutData = addSet(
      0,
      receivedWorkoutData as WorkoutDataObject[]
    );
    expect(outputWorkoutData[0].sets).toHaveLength(1);
  });

  test("when there is an empty set", () => {
    const receivedWorkoutData = [
      {
        index: 0,
        name: "",
        repsUnit: "reps",
        intensityUnit: "kg",
        sets: [],
        comment: "",
      },
    ];
    const outputWorkoutData = addSet(
      0,
      receivedWorkoutData as WorkoutDataObject[]
    );
    expect(outputWorkoutData[0].sets).toHaveLength(1);
  });

  test("when there are two exercises, only the selected exercise has a set addeded", () => {
    const receivedWorkoutData = [
      {
        index: 0,
        name: "",
        repsUnit: "reps",
        intensityUnit: "kg",
        sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
        comment: "",
      },
      {
        index: 1,
        name: "",
        repsUnit: "reps",
        intensityUnit: "kg",
        sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
        comment: "",
      },
    ];
    const outputWorkoutData = addSet(1, receivedWorkoutData);
    expect(outputWorkoutData[1].sets).toHaveLength(2);
    expect(outputWorkoutData[0].sets).toHaveLength(1);
  });
});
