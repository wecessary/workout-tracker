import { ChangeEvent, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Set, ShowOptions, WorkoutDataObject } from "../model/model";
import { nanoid } from "nanoid";

export const changeName = (
  newName: string,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[]
) => {
  return workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return { ...obj, name: newName };
    }
    return obj;
  });
};

export const addWorkout = (workoutData: WorkoutDataObject[]) => {
  const initialSets = [
    { setId: nanoid(), index: 0, reps: 0, weight: 0, easy: true, done: false },
  ];

  return [
    ...workoutData,
    {
      exId: nanoid(),
      index: workoutData.length,
      name: "",
      repsUnit: "reps",
      intensityUnit: "kg",
      sets: initialSets,
      comment: "",
    },
  ];
};

export const addSet = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[]
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      const doesLastSetExist = obj.sets && obj.sets.length;
      const lastSet = doesLastSetExist ? obj.sets[obj.sets.length - 1] : null;
      return {
        ...obj,
        sets: [
          ...(obj.sets || []),
          {
            setId: nanoid(),
            index: lastSet ? lastSet.index + 1 : 0,
            reps: lastSet ? lastSet.reps : 0,
            weight: lastSet ? lastSet.weight : 0,
            easy: lastSet ? lastSet.easy : true,
            done: false,
          },
        ],
      };
    }
    return obj;
  });

  return newWorkoutData;
};

export const changeReps = (
  e: ChangeEvent<HTMLInputElement>,
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[]
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    //setObj as in the object representing the set e.g. {reps: 5, weight: 10}
    if (setIndex === setObj.index) {
      return {
        ...setObj,
        reps: e.target.valueAsNumber || 0,
      };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
  return newWorkoutData;
};

export const changeWeight = (
  e: ChangeEvent<HTMLInputElement>,
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[]
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    //setObj as in the object representing the set e.g. {reps: 5, weight: 10}
    if (setObj.index === setIndex) {
      return {
        ...setObj,
        weight: e.target.valueAsNumber || 0,
      };
    }
    return setObj;
  });

  const newWorkoutData = workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
  return newWorkoutData;
};

export const startSet = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[]
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    if (setObj.index === setIndex) {
      return { ...setObj, timeStart: Date.now() };
    }
    return setObj;
  });

  return workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
};

export const finishSet = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[]
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    if (setObj.index === setIndex) {
      return { ...setObj, timeComplete: Date.now() };
    }
    return setObj;
  });

  return workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
};

export const resetSetTimes = (
  setIndex: number,
  workoutDataObject: WorkoutDataObject,
  workoutData: WorkoutDataObject[]
) => {
  const newSets = workoutDataObject.sets.map((setObj) => {
    if (setObj.index === setIndex) {
      return { ...setObj, timeStart: 0, timeComplete: 0 };
    }
    return setObj;
  });

  return workoutData.map((obj) => {
    if (workoutDataObject.index === obj.index) {
      return { ...obj, sets: newSets };
    }
    return obj;
  });
};

export const changeComment = (
  e: ChangeEvent<HTMLTextAreaElement>,
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[]
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return { ...obj, comment: e.target.value };
    }
    return obj;
  });
  return newWorkoutData;
};

export const reorderWorkoutObjects = (workoutData: WorkoutDataObject[]) => {
  return workoutData.map((workoutDataObject, i) => ({
    ...workoutDataObject,
    index: i,
  }));
};

const reorderSetIndex = (sets: Set[]) => {
  return sets.map((set, i) => ({ ...set, index: i }));
};

export const deleteExercise = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[]
) => {
  return reorderWorkoutObjects(
    workoutData.filter((obj) => obj.index !== workoutDataObjectIndex)
  );
};

export const deleteSet = (
  workoutDataObjectIndex: number,
  IndexOfSetToDelete: number,
  workoutData: WorkoutDataObject[]
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === +workoutDataObjectIndex) {
      return {
        ...obj,
        sets: reorderSetIndex(
          obj.sets.filter((set) => set.index !== IndexOfSetToDelete)
        ),
      };
    }
    return obj;
  });

  return reorderWorkoutObjects(newWorkoutData);
};

export const changeUnit = (
  unit: "repsUnit" | "intensityUnit",
  e: ChangeEvent<HTMLInputElement>,
  workoutData: WorkoutDataObject[],
  workoutDataObjectIndex: number
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      return { ...obj, [unit]: e.target.value };
    }
    return obj;
  });
  return newWorkoutData;
};

export const toggleDisplayUnit = (
  unit: "displayReps" | "displayIntensity",
  workoutData: WorkoutDataObject[],
  workoutDataObjectIndex: number
) => {
  const newWorkoutData = workoutData.map((obj) => {
    if (obj.index === workoutDataObjectIndex) {
      const booleanExists = unit in obj;
      return booleanExists
        ? { ...obj, [unit]: !obj[unit] }
        : { ...obj, [unit]: false };
    }
    return obj;
  });

  return newWorkoutData;
};

export const shouldDisplayUnit = (field?: boolean) =>
  field === undefined ? true : field;
