import { ChangeEvent, SetStateAction } from "react";
import { Set, WorkoutDataObject } from "../model/model";

export const handleChangeName = (
  e: ChangeEvent<HTMLTextAreaElement>,
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
    { index: 0, reps: 0, weight: 0, easy: true, done: false },
  ];

  setWorkoutData([
    ...workoutData,
    {
      index: workoutData.length,
      name: "",
      repsUnit: "reps",
      intensityUnit: "kg",
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
    const lastSet = obj.sets.at(-1) || ({} as Set);

    if (obj.index === workoutDataObjectIndex) {
      return {
        ...obj,
        sets: [
          ...obj.sets,
          {
            index: lastSet.index + 1 || 0,
            reps: lastSet.reps || 0,
            weight: lastSet.weight || 0,
            easy: lastSet.easy || true,
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
    if (workoutDataObject.index === obj.index) {
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

export const handleShowOptions = (
  i: number,
  showOptions: boolean[],
  setShowOptions: (value: SetStateAction<boolean[]>) => void
) => {
  const newShowOptions = showOptions.map((val, index) => {
    if (i == index) {
      return !val;
    }
    return val;
  });
  setShowOptions(newShowOptions);
};

export const handleDeleteExercise = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
) => {
  setWorkoutData(
    workoutData.filter((obj) => obj.index !== workoutDataObjectIndex)
  );
};
