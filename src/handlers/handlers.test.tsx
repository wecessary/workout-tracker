/**
 * @jest-environment jsdom
 */

import { addSet, changeUnit } from "./handlers";
import { WorkoutDataObject } from "../model/model";
import { ChangeEvent } from "react";

const baselineWorkoutData = [
  {
    index: 0,
    name: "",
    repsUnit: "reps",
    intensityUnit: "kg",
    sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
    comment: "",
  },
];

const twoExcercisesWorkoutData = [
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

describe("addSet function: test can add set", () => {
  test("when there is a set", () => {
    const outputWorkoutData = addSet(0, baselineWorkoutData);
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
    const outputWorkoutData = addSet(1, twoExcercisesWorkoutData);
    expect(outputWorkoutData[1].sets).toHaveLength(2);
    expect(outputWorkoutData[0].sets).toHaveLength(1);
  });
});

describe("changeUnit(): test can change units ", () => {
  const event = { target: { value: "foo" } } as ChangeEvent<HTMLInputElement>;

  test("can change intensity unit", () => {
    const outputWorkoutData = changeUnit(
      "intensityUnit",
      event,
      baselineWorkoutData,
      0
    );

    expect(outputWorkoutData[0].intensityUnit).toEqual("foo");
  });

  test("can change intensity unit in the selected exercise only", () => {
    const outputWorkoutData = changeUnit(
      "intensityUnit",
      event,
      twoExcercisesWorkoutData,
      1
    );

    expect(outputWorkoutData[0].intensityUnit).toEqual("kg");
    expect(outputWorkoutData[1].intensityUnit).toEqual("foo");
  });

  test("can change reps unit", () => {
    const outputWorkoutData = changeUnit(
      "repsUnit",
      event,
      baselineWorkoutData,
      0
    );
    expect(outputWorkoutData[0].repsUnit).toEqual("foo");
  });

  test("can change reps unit in the selected exercise only", () => {
    const outputWorkoutData = changeUnit(
      "repsUnit",
      event,
      twoExcercisesWorkoutData,
      1
    );
    expect(outputWorkoutData[0].repsUnit).toEqual("reps");
    expect(outputWorkoutData[1].repsUnit).toEqual("foo");
  });
});
