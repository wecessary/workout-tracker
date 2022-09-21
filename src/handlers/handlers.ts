import { ChangeEvent, SetStateAction } from "react";
import { WorkoutDataObject } from "../model/model";

export const handleChangeName = (
  e: ChangeEvent<HTMLInputElement>,
  index: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj: WorkoutDataObject) => {
    if (obj.index === index) {
      return { ...obj, name: e.target.value };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};

export const handleAddWorkout = (
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  setWorkoutData([
    ...workoutData,
    {
      index: workoutData.length,
      name: "Your Workout",
      sets: [
        { reps: 10, weight: 15 },
        { reps: 10, weight: 15 },
      ],
    },
  ]);
};

export const handleAddSet = (
  sets: string[],
  setSets: (value: SetStateAction<string[]>) => void,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const nextSet = sets.length + 1;
  setSets([...sets, `set ${nextSet}`]);

  const newWorkoutData = workoutData.map((obj) => {
    return { ...obj, sets: [...obj.sets, { reps: 10, weight: 15 }] };
  });

  setWorkoutData(newWorkoutData);
};

export const handleChangeReps = (
  e: ChangeEvent<HTMLInputElement>,
  setIndex: number,
  wokroutDataObjectIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    //setObj as in the object representing the set e.g. {reps: 5, weight: 10}
    if (setIndex === workoutDataObject.sets.indexOf(setObj)) {
      return { ...setObj, reps: e.target.valueAsNumber };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (wokroutDataObjectIndex === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};
