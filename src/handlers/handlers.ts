import { ChangeEvent, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Set, ShowOptions, WorkoutDataObject } from "../model/model";

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
    if (obj.index === workoutDataObjectIndex) {
      const setLength = obj.sets ? obj.sets.length : 0; //Firebase doesn't store empty array
      if (setLength) {
        const lastSet = obj.sets[setLength - 1];
        return {
          ...obj,
          sets: [
            ...obj.sets,
            {
              index: lastSet.index + 1,
              reps: lastSet.reps,
              weight: lastSet.weight,
              easy: lastSet.easy,
              done: false,
            },
          ],
        };
      } else {
        return {
          ...obj,
          sets: [{ index: 0, reps: 0, weight: 0, easy: true, done: false }],
        };
      }
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

export const resetShowOptions = (
  setShowOptions: (value: SetStateAction<ShowOptions>) => void
) => {
  setShowOptions({
    exerciseIndex: NaN,
    showPopup: false,
    editCard: false,
  });
};

export const handleShowPopup = (
  exerciseIndex: number,
  showOptions: ShowOptions,
  setShowOptions: (value: SetStateAction<ShowOptions>) => void
) => {
  if (showOptions.exerciseIndex === exerciseIndex) {
    resetShowOptions(setShowOptions);
  } else {
    setShowOptions({
      exerciseIndex,
      showPopup: true,
      editCard: false,
    });
  }
};

export const handleEditCard = (
  exerciseIndex: number,
  showOptions: ShowOptions,
  setShowOptions: (value: SetStateAction<ShowOptions>) => void
) => {
  if (showOptions.exerciseIndex !== exerciseIndex) {
    return;
  }
  setShowOptions({ ...showOptions, editCard: !showOptions.editCard });
};

const reorderWorkoutObjects = (workoutData: WorkoutDataObject[]) => {
  return workoutData.map((workoutDataObject, i) => ({
    ...workoutDataObject,
    index: i,
  }));
};

const reorderSetIndex = (sets: Set[]) => {
  return sets.map((set, i) => ({ ...set, index: i }));
};

export const handleDeleteExercise = (
  workoutDataObjectIndex: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void,
  setShowOptions: (value: SetStateAction<ShowOptions>) => void
) => {
  setWorkoutData(
    reorderWorkoutObjects(
      workoutData.filter((obj) => obj.index !== workoutDataObjectIndex)
    )
  );
  resetShowOptions(setShowOptions);
};

export const handleDeleteSet = (
  workoutDataObjectIndex: number,
  IndexOfSetToDelete: number,
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void
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

  setWorkoutData(reorderWorkoutObjects(newWorkoutData));
};

export const handleOnDragEnd = (
  workoutData: WorkoutDataObject[],
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void,
  result: DropResult
) => {
  if (!result.destination) {
    return;
  }

  if (result.destination.droppableId === "cards") {
    const newWorkoutData = workoutData;
    const [draggedCard] = newWorkoutData.splice(result.source.index, 1);
    newWorkoutData.splice(result.destination.index, 0, draggedCard);
    setWorkoutData(reorderWorkoutObjects(newWorkoutData));
  }
};
