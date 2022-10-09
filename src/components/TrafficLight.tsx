import { SetStateAction } from "react";
import {
  HandleChangeDone,
  HandleChangeEasy,
  WorkoutDataObject,
} from "../model/model";

interface TrafficLightProps {
  indicator: boolean;
  onChange: HandleChangeEasy | HandleChangeDone;
  setIndex: number;
  workoutDataObject: WorkoutDataObject;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  green: string;
  red: string;
}

const TrafficLight = ({
  indicator,
  onChange,
  setIndex,
  workoutDataObject,
  workoutData,
  setWorkoutData,
  green,
  red,
}: TrafficLightProps) => {
  return (
    <div>
      <button
        onClick={() => {
          onChange(setIndex, workoutDataObject, workoutData, setWorkoutData);
        }}
      >
        {indicator ? green : red}
      </button>
    </div>
  );
};

export default TrafficLight