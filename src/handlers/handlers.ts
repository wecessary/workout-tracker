import { ChangeEvent, SetStateAction } from "react";
import { Set, WorkoutDataObject } from "../model/model";

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
    { index: 0, reps: NaN, weight: NaN, easy: true, done: false },
    { index: 1, reps: NaN, weight: NaN, easy: true, done: false },
  ];

  setWorkoutData([
    ...workoutData,
    {
      index: workoutData.length,
      name: "",
      sets: initialSets,
      comment: "",
    },
  ]);
};

export const handleAddSet = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj) => {
    const lastSet = obj.sets.at(-1) as Set;

    if (obj.index === workoutDataObjectIndex) {
      return {
        ...obj,
        sets: [
          ...obj.sets,
          {
            index: obj.sets.length,
            reps: lastSet.reps,
            weight: lastSet.weight,
            easy: lastSet.easy,
            done: false,
          },
        ],
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
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    //setObj as in the object representing the set e.g. {reps: 5, weight: 10}
    if (setObj.index === setIndex) {
      return { ...setObj, weight: e.target.valueAsNumber };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};

export const handleChangeEasy = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    if (setObj.index === setIndex) {
      return { ...setObj, easy: !setObj.easy };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });

  setWorkoutData(newWorkoutData);
};

export const handleChangeDone = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    if (setObj.index === setIndex) {
      return { ...setObj, done: !setObj.done };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });

  setWorkoutData(newWorkoutData);
};

export const handleChangeComment = (
  e: ChangeEvent<HTMLTextAreaElement>,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return { ...obj, comment: e.target.value };
    }
    return obj;
  });
  setWorkoutData(newWorkoutData);
};
