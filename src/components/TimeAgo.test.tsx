/**
 * @jest-environment jsdom
 */

import { Set } from "../model/model";
import { timeTracker } from "./RestTimer";

const set1 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: true,
  timeComplete: Date.now() - 6000,
};

const set2 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: true,
  timeComplete: Date.now() - 3000,
};

const emptySet3 = null as unknown as Set;

const set3 = {
  index: 0,
  reps: 0,
  weight: 0,
  easy: true,
  done: false,
};

describe("test TimeTracker function", () => {
  test("when set 1 and set 2 are complete and there is no set 3, will only calculate time diff between set 1 and set 2", () => {
    const timeDiffSet1and2 = timeTracker(set1, set2);
    const timeDiffSet2and3 = timeTracker(set2, emptySet3);

    expect(timeDiffSet1and2).toEqual(3000);
    expect(timeDiffSet2and3).toBeFalsy();
    console.log(timeDiffSet2and3);
  });

  test("when set 1, set 2, and 3 are complete, will calculate time diff between 1 and 2 and 2 and 3", () => {
    const timeDiffSet1and2 = timeTracker(set1, set2);
    const timeDiffSet2and3 = timeTracker(set2, set3);
    expect(timeDiffSet1and2).toEqual(3000);
    expect(timeDiffSet2and3).toBeTruthy();
    console.log(timeDiffSet2and3);
  });
});
