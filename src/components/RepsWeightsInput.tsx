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
    <span className="flex text-[#D9D9D9] font-medium col-span-3 ">
      <input
        type="number"
        placeholder="10"
        value={value || ""}
        className={`${colour.cardColour} ${colour.groupHover} w-1/3 text-right text-[#D9D9D9] mr-1 placeholder:opacity-40`}
        onChange={(e) =>
          onChange(e, setIndex, workoutDataObject, workoutData, setWorkoutData)
        }
      />
      {repsOrWeight}
    </span>
  ) : null;
};

export default RepsWeightInput;
