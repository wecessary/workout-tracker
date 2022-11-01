/**
 * @jest-environment jsdom
 */

import { addSet, changeUnit, toggleDisplayUnit } from "./handlers";
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

describe("toggleDisplayUnit function: test can toggle display unit", () => {
  const workoutDataWithDisplayBooleans = [
    {
      index: 0,
      name: "",
      repsUnit: "reps",
      intensityUnit: "kg",
      sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
      comment: "",
      displayReps: true,
      displayIntensity: true,
    },
  ];

  test("when the displayReps key doesn't exit in the obj, toggling should set it to false", () => {
    //this is because the first time a user toggles should be to hide it, as the default is to display the all units
    const outputWorkoutData = toggleDisplayUnit(
      "displayReps",
      baselineWorkoutData,
      0
    );
    expect(outputWorkoutData[0].displayReps).toBe(false);
    expect(outputWorkoutData[0].displayIntensity).toBe(undefined);
  });

  test("when the displayIntensity key doesn't exit in the obj, toggling should set it to false", () => {
    const outputWorkoutData = toggleDisplayUnit(
      "displayIntensity",
      baselineWorkoutData,
      0
    );
    expect(outputWorkoutData[0].displayReps).toBe(undefined);
    expect(outputWorkoutData[0].displayIntensity).toBe(false);
  });

  test("when the displayReps key already exists, should be able to toggle", () => {
    const outputWorkoutData = toggleDisplayUnit(
      "displayReps",
      workoutDataWithDisplayBooleans,
      0
    );
    expect(outputWorkoutData[0].displayReps).toBe(
      !workoutDataWithDisplayBooleans[0].displayReps
    );
    expect(outputWorkoutData[0].displayIntensity).toBe(
      workoutDataWithDisplayBooleans[0].displayIntensity
    );
  });

  test("when the displayIntensity key already exists, should be able to toggle", () => {
    const outputWorkoutData = toggleDisplayUnit(
      "displayIntensity",
      workoutDataWithDisplayBooleans,
      0
    );
    expect(outputWorkoutData[0].displayReps).toBe(
      workoutDataWithDisplayBooleans[0].displayReps
    );
    expect(outputWorkoutData[0].displayIntensity).toBe(
      !workoutDataWithDisplayBooleans[0].displayIntensity
    );
  });
});
