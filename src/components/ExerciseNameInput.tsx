import { SetStateAction } from "react";
import { HandleChangeName, WorkoutDataObject } from "../model/model";

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
    <input
      className="group-hover:bg-gray-100 w-64 mb-3 font-bold text-2xl tracking-tight text-gray-900 dark:text-white"
      value={value}
      placeholder="Exercise name"
      onChange={(e) =>
        onChange(e, workoutDataObjectIndex, workoutData, setWorkoutData)
      }
    />
  );
};

export default ExerciseNameInput;
