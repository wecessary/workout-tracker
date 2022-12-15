/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import {
  addDateToWorkoutData,
  addDetailsToSets,
  getStatsFromSets,
} from "./dataWrangleFunctions";

const testName1 = "exercise1";
const testDate1 = "2022-12-07";

const testName2 = "exercise2";
const testDate2 = "2022-12-09";

const testName3 = "exercise3";
const testName4 = "exercise4";

const workoutData1 = [
  {
    date: testDate1,
    index: 0,
    name: testName1,
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
      {
        index: 1,
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

const workoutData2 = [
  {
    date: testDate1,
    index: 0,
    name: testName1,
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
      {
        index: 1,
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
  {
    date: testDate2,
    index: 0,
    name: testName2,
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
      {
        index: 1,
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

describe("data wrangle functions: add date and name to sets ", () => {
  test("when there is only one exercise", () => {
    expect(addDetailsToSets(workoutData1)[0].sets[0].name).toEqual(testName1);
    expect(addDetailsToSets(workoutData1)[0].sets[1].name).toEqual(testName1);

    expect(addDetailsToSets(workoutData1)[0].sets[0].date).toEqual(testDate1);
    expect(addDetailsToSets(workoutData1)[0].sets[1].date).toEqual(testDate1);
  });
  test("when there are two exercises", () => {
    //sets in first exercise
    expect(addDetailsToSets(workoutData2)[0].sets[0].name).toEqual(testName1);
    expect(addDetailsToSets(workoutData2)[0].sets[1].name).toEqual(testName1);

    expect(addDetailsToSets(workoutData2)[0].sets[0].date).toEqual(testDate1);
    expect(addDetailsToSets(workoutData2)[0].sets[1].date).toEqual(testDate1);

    //sets in second exercise
    expect(addDetailsToSets(workoutData2)[1].sets[0].name).toEqual(testName2);
    expect(addDetailsToSets(workoutData2)[1].sets[1].name).toEqual(testName2);

    expect(addDetailsToSets(workoutData2)[1].sets[0].date).toEqual(testDate2);
    expect(addDetailsToSets(workoutData2)[1].sets[1].date).toEqual(testDate2);
  });
});

const workoutData1NoDate = [
  {
    index: 0,
    name: testName1,
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
      {
        index: 1,
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

const workoutData2NoDate = [
  {
    index: 0,
    name: testName1,
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
      {
        index: 1,
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
  {
    index: 1,
    name: testName2,
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
      {
        index: 1,
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

const workoutData3NoDate = [
  {
    index: 0,
    name: testName3,
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
      {
        index: 1,
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
  {
    index: 1,
    name: testName4,
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
      {
        index: 1,
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

const userData1 = [{ date: testDate1, workoutData: workoutData1NoDate }];
const userData2 = [{ date: testDate1, workoutData: workoutData2NoDate }];
const userData3 = [
  { date: testDate1, workoutData: workoutData2NoDate },
  { date: testDate2, workoutData: workoutData3NoDate },
];

describe("data wrangle functions:add date to workout data", () => {
  test("when there is only one day of one exercise workout", () => {
    expect(addDateToWorkoutData(userData1)[0].workoutData[0].date).toEqual(
      testDate1
    );
  });

  test("when there is one day of a two exercise workout", () => {
    expect(addDateToWorkoutData(userData2)[0].workoutData[0].date).toEqual(
      testDate1
    );
    expect(addDateToWorkoutData(userData2)[0].workoutData[1].date).toEqual(
      testDate1
    );
  });

  test("when there is two days of workout, each with a two exercise workout", () => {
    expect(addDateToWorkoutData(userData3)[0].workoutData[0].date).toEqual(
      testDate1
    );
    expect(addDateToWorkoutData(userData3)[0].workoutData[1].date).toEqual(
      testDate1
    );

    expect(addDateToWorkoutData(userData3)[1].workoutData[0].date).toEqual(
      testDate2
    );
    expect(addDateToWorkoutData(userData3)[1].workoutData[1].date).toEqual(
      testDate2
    );
  });
});

describe("use both add date to workout and add set and name workout to sets", () => {
  test("two days of workout, each with a two exercise workout", () => {
    //sets in the first exercise in the first day of workout
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[0].sets[0].date
    ).toEqual(testDate1);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[0].sets[1].date
    ).toEqual(testDate1);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[0].sets[0].name
    ).toEqual(testName1);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[0].sets[0].name
    ).toEqual(testName1);

    //sets in the first exercise in the second day of workout
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[0].sets[0].date
    ).toEqual(testDate2);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[0].sets[1].date
    ).toEqual(testDate2);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[0].sets[0].name
    ).toEqual(testName3);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[0].sets[0].name
    ).toEqual(testName3);

    //sets in the second exercise in the first day of workout
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[1].sets[0].date
    ).toEqual(testDate1);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[1].sets[1].date
    ).toEqual(testDate1);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[1].sets[0].name
    ).toEqual(testName2);
    expect(
      addDateToWorkoutData(userData3)[0].workoutData[1].sets[0].name
    ).toEqual(testName2);

    //sets in the second exercise in the second day of workout

    expect(
      addDateToWorkoutData(userData3)[1].workoutData[1].sets[0].date
    ).toEqual(testDate2);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[1].sets[1].date
    ).toEqual(testDate2);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[1].sets[0].name
    ).toEqual(testName4);
    expect(
      addDateToWorkoutData(userData3)[1].workoutData[1].sets[0].name
    ).toEqual(testName4);
  });
});

const setsWithDetails1 = [
  {
    name: "bicep",
    date: "2022-12-08",
    index: 0,
    reps: 8,
    weight: 45,
    easy: true,
    done: true,
    timeStart: 100,
    timeComplete: 150,
    repsUnit: "kg",
    intensityUnit: "W",
  },
  {
    name: "bicep",
    date: "2022-12-08",
    index: 1,
    reps: 12,
    weight: 60,
    easy: false,
    done: true,
    timeStart: 300,
    timeComplete: 400,
    repsUnit: "lbs",
    intensityUnit: "kcal",
  },
  {
    name: "bicep",
    date: "2022-12-08",
    index: 2,
    reps: 12,
    weight: 60,
    easy: false,
    done: true,
    timeStart: 500,
    timeComplete: 700,
    repsUnit: "lbs",
    intensityUnit: "kcal",
  },
  {
    name: "squats",
    date: "2022-12-10",
    index: 0,
    reps: 15,
    weight: 75,
    easy: true,
    done: false,
    repsUnit: "reps",
    intensityUnit: "none",
    timeStart: 800,
    timeComplete: 1000,
  },
  {
    name: "squats",
    date: "2022-12-10",
    index: 1,
    reps: 15,
    weight: 75,
    easy: true,
    done: false,
    repsUnit: "reps",
    intensityUnit: "none",
  },
];

describe("getStatsFromSets", () => {
  test("caluclation of rest times and duration", () => {
    const results = getStatsFromSets(setsWithDetails1);
    expect(results[0].restTime).toBe(150);
    expect(results[0].duration).toBe(50);

    expect(results[1].restTime).toBe(100);
    expect(results[1].duration).toBe(100);

    expect(results[2].restTime).toBe(0);
    expect(results[2].duration).toBe(200);

    expect(results[3].restTime).toBe(0);
    expect(results[3].duration).toBe(200);
  });
});
