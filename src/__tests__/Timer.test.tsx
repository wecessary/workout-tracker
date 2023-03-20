/**
 * @jest-environment jsdom
 */

import { timerDisabled } from "../lib/timer";


describe("isBtnDisabled function", () => {
  test("first and only set that has not started should not be disabled", () => {
    const sets = [
      {
        setId: "someId",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
      },
    ];
    expect(timerDisabled(0, sets)).toBe(false);
  });

  test("first and only set that is complete should be disabled", () => {
    const sets1 = [
      {
        setId: "someId",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
    ];
    expect(timerDisabled(0, sets1)).toBe(true);
  });

  test("when all sets are complete, should all be disabled", () => {
    const sets2 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
      {
        setId: "someId1",
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() + 2000,
        timeComplete: Date.now() + 3000,
      },
      {
        setId: "someId2",
        index: 2,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() + 4000,
        timeComplete: Date.now() + 5000,
      },
    ];
    for (let i = 0; i < sets2.length; i++) {
      const isTimerDisabled = timerDisabled(i, sets2);
      expect(isTimerDisabled).toBe(true);
    }
  });

  test("when set 1 is complete, set 2 hasn't begun, set 3 (and 1) should be disabled, and set 2 should not be disabled", () => {
    const sets3 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
      {
        setId: "someId1",
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
      {
        setId: "someId2",
        index: 2,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
    ];
    expect(timerDisabled(0, sets3)).toBe(true);
    expect(timerDisabled(1, sets3)).toBe(false);
    expect(timerDisabled(3, sets3)).toBe(true);
  });

  test("when first two sets are complete and third set has not started, third set should not be disabled", () => {
    const sets4 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
      {
        setId: "someId1",
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() + 2000,
        timeComplete: Date.now() + 3000,
      },
      {
        setId: "someId2",
        index: 2,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
    ];
    expect(timerDisabled(0, sets4)).toBe(true);
    expect(timerDisabled(1, sets4)).toBe(true);
    expect(timerDisabled(2, sets4)).toBe(false);
  });

  test("when first two sets are complete and third set has not started, fourth set should be disabled", () => {
    const sets5 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
        timeComplete: Date.now() + 1000,
      },
      {
        setId: "someId1",
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now() + 2000,
        timeComplete: Date.now() + 3000,
      },
      {
        setId: "someId2",
        index: 2,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
      {
        setId: "someId3",
        index: 3,
        reps: 0,
        weight: 0,
        easy: true,
        done: false,
      },
    ];
    expect(timerDisabled(0, sets5)).toBe(true);
    expect(timerDisabled(1, sets5)).toBe(true);
    expect(timerDisabled(2, sets5)).toBe(false);
    expect(timerDisabled(3, sets5)).toBe(true);
  });

  test("an ongoing set should not be disabled", () => {
    const sets6 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
      },
    ];
    expect(timerDisabled(0, sets6)).toBe(false);
  });

  test("if prev set is ongoing, next sets should be disabled", () => {
    const sets7 = [
      {
        setId: "someId0",
        index: 0,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
        timeStart: Date.now(),
      },
      {
        setId: "someId1",
        index: 1,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
      },
      {
        setId: "someId2",
        index: 2,
        reps: 0,
        weight: 0,
        easy: true,
        done: true,
      },
    ];
    expect(timerDisabled(0, sets7)).toBe(false);
    expect(timerDisabled(1, sets7)).toBe(true);
    expect(timerDisabled(2, sets7)).toBe(true);
  });
});
