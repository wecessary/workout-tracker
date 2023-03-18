/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import {
  addDateToWorkoutData,
  addDetailsToSets,
  getLastXWorkouts,
  getPastWorkoutOnly,
  getStatsFromSets,
  getUserDataSinceXDaysAgo,
  sortByDateOldToNew,
} from "../lib/analyticsUtils";
import {
  workoutData1,
  testName1,
  testDate1,
  workoutData2,
  testName2,
  testDate2,
  testName3,
  testName4,
  setsWithDetails1,
  userData1,
  userData2,
  userData3,
  userData4,
  userData5,
  userData6,
  twoDaysAgo,
  yesterday,
} from "../testData/analyticsUtilTestData";

describe("can add date and name to sets ", () => {
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

describe("can add date to workout data", () => {
  test("when there is one day with a one exercise workout", () => {
    expect(addDateToWorkoutData(userData1)[0].workoutData[0].date).toEqual(
      testDate1
    );
  });

  test("when there is one day with a two exercise workout", () => {
    expect(addDateToWorkoutData(userData2)[0].workoutData[0].date).toEqual(
      testDate1
    );
    expect(addDateToWorkoutData(userData2)[0].workoutData[1].date).toEqual(
      testDate1
    );
  });

  test("when there are two days of workout, each with a two exercise workout", () => {
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

describe("do both at the same time: 1.add date to workout and 2. add date and name to sets", () => {
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
      addDateToWorkoutData(userData3)[0].workoutData[0].sets[1].name
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
      addDateToWorkoutData(userData3)[1].workoutData[0].sets[1].name
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
      addDateToWorkoutData(userData3)[0].workoutData[1].sets[1].name
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
      addDateToWorkoutData(userData3)[1].workoutData[1].sets[1].name
    ).toEqual(testName4);
  });
});

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

    expect(results[4].restTime).toBe(0);
    expect(results[4].duration).toBe(0);
    console.log(results);
  });
});

describe("getPastWorkoutOnly", () => {
  test("will get rid of future workouts only", () => {
    expect(getPastWorkoutOnly(userData4)).toHaveLength(2);
    expect(getPastWorkoutOnly(userData4)[0].date).toEqual(testDate1);
    expect(getPastWorkoutOnly(userData4)[1].date).toEqual(testDate2);
  });
});

describe("getLastXWorkouts", () => {
  test("will get the last  most recent workouts", () => {
    expect(getLastXWorkouts(userData5, 1)).toHaveLength(1);
    expect(getLastXWorkouts(userData5, 1)[0].date).toEqual(testDate2);
  });

  test("will get the last 2 most recent workouts", () => {
    expect(getLastXWorkouts(userData5, 2)).toHaveLength(2);
    expect(getLastXWorkouts(userData5, 2)[0].date).toEqual(testDate2);
    expect(getLastXWorkouts(userData5, 2)[1].date).toEqual(testDate1);
  });
});

describe("getUserDataSinceXDaysAgo", () => {
  const results = sortByDateOldToNew(getUserDataSinceXDaysAgo(userData6, 2));
  expect(getUserDataSinceXDaysAgo(userData6, 2)).toHaveLength(2);
  expect(getUserDataSinceXDaysAgo(userData6, 2)[0].date).toEqual(yesterday);
  expect(getUserDataSinceXDaysAgo(userData6, 2)[1].date).toEqual(twoDaysAgo);
});
