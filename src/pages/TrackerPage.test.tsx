/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import TrackerPage from "./TrackerPage";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Tracker Page", () => {
  test("can add sets", async () => {
    const { user } = setup(<TrackerPage />);
    const setLables = await screen.findAllByText(/set/i);
    expect(setLables).toHaveLength(1);

    const addSetBtn = await screen.findByRole("button", { name: "+" });
    await user.click(addSetBtn);
    const upDatedSetLables = await screen.findAllByText(/set/i);
    await waitFor(() => expect(upDatedSetLables).toHaveLength(2));
  });

  test("can add exercise", async () => {
    const { user } = setup(<TrackerPage />);
    const addBtn = await screen.findByRole("button", { name: /add exercise/i });
    await user.click(addBtn);
    const exerciseNameBoxes = await screen.findAllByPlaceholderText(
      /exercise name/i
    );
    expect(exerciseNameBoxes).toHaveLength(2);
  });
});
