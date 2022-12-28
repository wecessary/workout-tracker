/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { dateToString } from "./date";

describe("dateToString", () => {
  test("will work on new Date()", () => {
    expect(dateToString(new Date("2022-01-01"))).toEqual("2022-01-01");
  });
});
