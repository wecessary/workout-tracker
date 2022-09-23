import { ChangeEvent, SetStateAction } from "react";
import { WorkoutDataObject } from "../model/model";

export const handleChangeName = (
  e: ChangeEvent<HTMLInputElement>,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
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

  const initialSets = [
    { index: 0, reps: 10, weight: 15 },
    { index: 1, reps: 10, weight: 15 },
  ];

  setWorkoutData([
    ...workoutData,
    {
      index: workoutData.length,
      name: "Your Workout",
      sets: initialSets,
      easy: true,
    },
  ]);
};

export const handleAddSet = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return {
        ...obj,
        sets: [...obj.sets, { index: obj.sets.length, reps: 10, weight: 15 }],
      };
    }
    return obj;
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
    if (setIndex === setObj.index) {
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

export const handleChangeWeight = (
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
      return { ...setObj, weight: e.target.valueAsNumber };
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

export const handleChangeEasy = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return { ...obj, easy: !obj.easy };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};
