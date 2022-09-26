/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react";
import TrackerPage from "./TrackerPage";

describe("Tracker Page", () => {
  render(<TrackerPage />);

  test("can add set", async () => {
    const user = userEvent.setup()
    const addBtn = await screen.findByRole("button",{name: /add exercise/i})
    await user.click(addBtn)
    const exerciseNameBoxes = await screen.findAllByDisplayValue(/Your workout/i)
    expect(exerciseNameBoxes).toHaveLength(1)
  });
});


