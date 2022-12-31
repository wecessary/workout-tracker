import { getDateOfXDaysFromToday } from "../utilities/date";

export const testName1 = "exercise1";
export const testDate1 = "2022-12-07";
export const testName2 = "exercise2";
export const testDate2 = "2022-12-09";
export const testName3 = "exercise3";
export const testName4 = "exercise4";
export const testDate3 = "2050-12-09";
export const yesterday = getDateOfXDaysFromToday(-1);
export const twoDaysAgo = getDateOfXDaysFromToday(-2);
export const fiveDaysAgo = getDateOfXDaysFromToday(-5);
export const tomorrow = getDateOfXDaysFromToday(1);

export const workoutData1 = [
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

export const workoutData2 = [
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

export const workoutData1NoDate = [
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

export const workoutData2NoDate = [
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

export const workoutData3NoDate = [
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

export const setsWithDetails1 = [
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

export const userData1 = [{ date: testDate1, workoutData: workoutData1NoDate }];
export const userData2 = [{ date: testDate1, workoutData: workoutData2NoDate }];
export const userData3 = [
  { date: testDate1, workoutData: workoutData2NoDate },
  { date: testDate2, workoutData: workoutData3NoDate },
];
export const userData4 = [
  { date: testDate1, workoutData: workoutData2NoDate },
  { date: testDate3, workoutData: workoutData3NoDate },
  { date: testDate2, workoutData: workoutData3NoDate },
];

export const userData5 = [
  { date: testDate1, workoutData: workoutData2NoDate },
  { date: testDate2, workoutData: workoutData3NoDate },
  { date: testDate3, workoutData: workoutData3NoDate },
];

export const userData6 = [
  { date: yesterday, workoutData: workoutData2NoDate },
  { date: twoDaysAgo, workoutData: workoutData3NoDate },
  { date: fiveDaysAgo, workoutData: workoutData3NoDate },
  { date: tomorrow, workoutData: workoutData3NoDate },
];
