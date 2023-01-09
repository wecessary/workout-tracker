import { MutableRefObject, SetStateAction } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import {
  HandleChangeReps,
  HandleChangeWeight,
  WorkoutDataObject,
} from "../../model/model";
import { colour } from "../../utilities/colour";

interface RepsWeightInput {
  repsOrWeight: string;
  value: number;
  onChange: HandleChangeReps | HandleChangeWeight;
  setIndex: number;
  workoutDataObject: WorkoutDataObject;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  shouldDisplay: boolean;
  localStyling?: string;
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
  localStyling,
}: RepsWeightInput) => {
  const ref = useOutsideClick(() => ref.current?.blur());
  return shouldDisplay ? (
    <div
      className={`flex items-center text-[#D9D9D9] text-[4vw] font-medium col-span-5 ${localStyling} `}
    >
      <input
        ref={ref as MutableRefObject<HTMLInputElement>}
        type="number"
        placeholder="10"
        value={value || ""}
        className={`${colour.cardColour} ${colour.groupHover} p-2 w-1/2 text-center text-[#D9D9D9] mr-1 placeholder:opacity-40 border-b-2 border-b-zinc-500`}
        onChange={(e) =>
          onChange(e, setIndex, workoutDataObject, workoutData, setWorkoutData)
        }
      />
      {repsOrWeight.toUpperCase()}
    </div>
  ) : null;
};

export default RepsWeightInput;
