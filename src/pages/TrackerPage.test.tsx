/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import TrackerPage from "./trackerPage/TrackerPage";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Tracker Page - add sets", () => {
  test("can add sets", async () => {
    const { user } = setup(<TrackerPage />);
    const setLables = await screen.findAllByText(/set/i);
    expect(setLables).toHaveLength(2);

    const addSetBtn = await screen.findByRole("button", { name: "+" });
    await user.click(addSetBtn);
    const upDatedSetLables = await screen.findAllByText(/set/i);
    await waitFor(() => expect(upDatedSetLables).toHaveLength(4));
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

describe("Tracker Page - delete exereicse", () => {
  test("can delete exercise", async () => {
    const { user } = setup(<TrackerPage />);

    // first step: add two exercises and change their names
    const addBtn = await screen.findByRole("button", { name: /add exercise/i });
    await user.click(addBtn);
    await user.click(addBtn);
    const exerciseNames = await screen.findAllByPlaceholderText(
      /exercise name/i
    );
    expect(exerciseNames).toHaveLength(3);
    await userEvent.type(exerciseNames[0], "exercise 1");
    await userEvent.type(exerciseNames[1], "exercise 2");
    await userEvent.type(exerciseNames[2], "exercise 3");
    const updatedExerciseName1 = await screen.findByDisplayValue("exercise 1");
    const updatedExerciseName2 = await screen.findByDisplayValue("exercise 2");
    const updatedExerciseName3 = await screen.findByDisplayValue("exercise 3");

    expect(updatedExerciseName1).toBeTruthy();
    expect(updatedExerciseName2).toBeTruthy();
    expect(updatedExerciseName3).toBeTruthy();
    // end of first step

    //second step: delete the second exercise
    const editBtn = await screen.findAllByRole("button", {
      name: "show edit options",
    });
    await user.click(editBtn[1]);
    const deleteExerciseBtn = await screen.findByRole("button", {
      name: "Delete Exercise",
    });
    expect(deleteExerciseBtn).toBeTruthy();
    await user.click(deleteExerciseBtn);

    const finalExerciseNames = await screen.findAllByPlaceholderText(
      /exercise name/i
    );
    expect(finalExerciseNames).toHaveLength(2);

    const finalExerciseName1 = await screen.findByDisplayValue("exercise 1");
    const finalExerciseName2 = await screen.findByDisplayValue("exercise 3");
    const exerciseShouldnotExist = screen.queryByDisplayValue("exercise 2");

    expect(finalExerciseName1).toBeTruthy();
    expect(finalExerciseName2).toBeTruthy();
    expect(exerciseShouldnotExist).toBeFalsy();
  });
});
