/**
 * @jest-environment jsdom
 */

import { Set } from "../../model/model";
import { timeTracker } from "./RestTimer";

const set1 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: true,
  timeStart: Date.now(),
  timeComplete: Date.now() + 3000,
};

const set2 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: true,
  timeStart: Date.now() + 6000,
  timeComplete: Date.now() + 9000,
};

const emptySet3 = null as unknown as Set;

const set3 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: false,
};

describe("test RestTime function", () => {
  test("when set 1 is complete and set 2 has started, will only calculate time diff between set 1 end and set 2 start", () => {
    const restTImeDiffSet1and2 = timeTracker(set1, set2);

    expect(restTImeDiffSet1and2).toEqual(3000);
  });

  test("when there is no next set, will not calculate rest time", () => {
    const timeDiffSet2and3 = timeTracker(set2, emptySet3);
    expect(timeDiffSet2and3).toBeFalsy();
  });
});
