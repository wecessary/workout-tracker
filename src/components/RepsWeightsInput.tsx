import { SetStateAction } from "react";
import {
  HandleChangeReps,
  HandleChangeWeight,
  WorkoutDataObject,
} from "../model/model";
import { colour } from "../utilities/colour";

interface RepsWeightInput {
  repsOrWeight: string;
  value: number;
  onChange: HandleChangeReps | HandleChangeWeight;
  setIndex: number;
  workoutDataObject: WorkoutDataObject;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  shouldDisplay: boolean;
}

const RepsWeightInput = ({
  repsOrWeight,
  value,
  onChange,
  setIndex,
  workoutDataObject,
  workoutData,
  setWorkoutData,
  shouldDisplay,
}: RepsWeightInput) => {
  return shouldDisplay ? (
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
  ) : null;
};

export default RepsWeightInput;
