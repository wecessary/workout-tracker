/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TrackerPage from "../pages/TrackerPage";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

jest.mock("nanoid", () => {
  return { nanoid: () => Math.random() };
});

describe("Tracker Page - add sets", () => {
  test("can add exercise", async () => {
    const { user } = setup(<TrackerPage />);
    const addBtn = await screen.findByRole("button", { name: /add exercise/i });
    await user.click(addBtn);
    const exerciseNameBoxes = await screen.findAllByPlaceholderText(
      /type an exercise name/i
    );
    expect(exerciseNameBoxes).toHaveLength(2);
  });
});
