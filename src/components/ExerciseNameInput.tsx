import { SetStateAction } from "react";
import { HandleChangeName, WorkoutDataObject } from "../model/model";
import { colour } from "../utilities/colour";

interface ExerciseNameProps {
  value: string;
  onChange: HandleChangeName;
  workoutDataObjectIndex: number;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
}

const ExerciseNameInput = ({
  value,
  onChange,
  workoutDataObjectIndex,
  workoutData,
  setWorkoutData,
}: ExerciseNameProps) => {
  return (
    <textarea
      className={`${colour.main} ${colour.groupHover} w-full mb-3 font-bold text-lg tracking-tight text-gray-900 dark:text-white`}
      value={value}
      placeholder="Exercise name"
      onChange={(e) => {
        onChange(e, workoutDataObjectIndex, workoutData, setWorkoutData);
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
    />
  );
};

export default ExerciseNameInput;
