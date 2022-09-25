/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import TrackerPage from "./TrackerPage";

test("hello jest", () => {
  render(<TrackerPage />);
});
