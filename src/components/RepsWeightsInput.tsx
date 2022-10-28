import { SetStateAction } from "react";
import {
  HandleChangeReps,
  HandleChangeWeight,
  WorkoutDataObject,
} from "../model/model";
import { colour } from "../utilities/colour";

type RepsOrWeight = "reps" | "kg";

interface RepsWeightInput {
  repsOrWeight: RepsOrWeight;
  value: number;
  onChange: HandleChangeReps | HandleChangeWeight;
  setIndex: number;
  workoutDataObject: WorkoutDataObject;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
}

const RepsWeightInput = ({
  repsOrWeight,
  value,
  onChange,
  setIndex,
  workoutDataObject,
  workoutData,
  setWorkoutData,
}: RepsWeightInput) => {
  return (
    <span>
      <input
        type="number"
        placeholder="10"
        value={value || ""}
        className={`${colour.main} ${colour.groupHover} w-12 text-right`}
        onChange={(e) =>
          onChange(e, setIndex, workoutDataObject, workoutData, setWorkoutData)
        }
      />
      {repsOrWeight}
    </span>
  );
};

export default RepsWeightInput;
