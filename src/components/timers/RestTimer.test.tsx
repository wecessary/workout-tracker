/**
 * @jest-environment jsdom
 */

import { restTimer } from "./RestTimer";

describe("test RestTime function", () => {
  test("when set 1 and 2 are complete, will only calculate time diff between 2's start and 1's complete", () => {
    const sets = [
      {
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
      {
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
        timeStart: Date.now() + 2000,
        timeComplete: Date.now() + 4000,
      },
    ];

    expect(restTimer(sets, 0)).toEqual(1000);
  });

  test("when set 1 is complete and set 2 has not started, will be counting rest time", () => {
    const sets = [
      {
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() - 4000,
        timeComplete: Date.now() - 3000,
      },
      {
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
    ];
    expect(restTimer(sets, 0)).toBe(3000);
  });

  test("when set 1 exists and set 2 does not exist, rest time is set to zero", () => {
    const sets = [
      {
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() - 4000,
        timeComplete: Date.now() - 3000,
      },
    ];
    expect(restTimer(sets, 0)).toBe(0);
  });
});
