import { SetStateAction, useState } from "react";
import {
  handleChangeReps,
  handleChangeWeight,
  startSet,
  finishSet,
  resetSetTimes,
  handleChangeEasy,
  deleteExercise,
  deleteSet,
} from "../../handlers/handlers";
import { SlideAnimation, Set, WorkoutDataObject } from "../../model/model";
import { ThumbUp, ThumbDown } from "../Icons";
import Timer from "../timers/Timer";
import CardRow from "./CardRow";
import DeleteSetBtn from "./DeleteSetBtn";
import RepsWeightInput from "./RepsWeightsInput";
import TrafficLight from "./TrafficLight";

const SetRow = ({
  setIndex,
  exIndex,
  obj,
  set,
  workoutData,
  setWorkoutData,
}: {
  obj: WorkoutDataObject;
  set: Set;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  exIndex: number;
  setIndex: number;
}) => {
  const [setAnimation, setSetAnimation] = useState<SlideAnimation>("slide-out");

  const handleDeleteSet = () => {
    setSetAnimation("slide-in");
    setTimeout(() => {
      setWorkoutData(deleteSet(exIndex, setIndex, workoutData));
    }, 500);
  };

  return (
    <>
      <div className={`mb-4 ${setAnimation}`}>
        <CardRow rowStyling="grid grid-cols-12 items-center">
          <p className="col-span-2 text-lg">{`#${setIndex + 1}`}</p>
          <RepsWeightInput
            shouldDisplay={
              ("displayReps" in obj ? obj.displayReps : true) as boolean
            }
            key={`reps${setIndex}`}
            repsOrWeight={obj.repsUnit}
            value={set.reps}
            onChange={handleChangeReps}
            setIndex={setIndex}
            workoutDataObject={obj}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
          />
          <RepsWeightInput
            shouldDisplay={
              ("displayIntensity" in obj
                ? obj.displayIntensity
                : true) as boolean
            }
            key={`weight${setIndex}`}
            repsOrWeight={obj.intensityUnit}
            value={set.weight}
            onChange={handleChangeWeight}
            setIndex={setIndex}
            workoutDataObject={obj}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
          />
        </CardRow>
        <CardRow
          key={`timerRow${setIndex}`}
          rowStyling="gap-1 grid grid-cols-12 items-center border-b pb-3"
        >
          <Timer
            startTime={set.timeStart || 0}
            endTime={set.timeComplete || 0}
            beginOnClick={() =>
              setWorkoutData(startSet(setIndex, obj, workoutData))
            }
            finishOnClick={() =>
              setWorkoutData(finishSet(setIndex, obj, workoutData))
            }
            resetOnClick={() =>
              setWorkoutData(resetSetTimes(setIndex, obj, workoutData))
            }
            setIndex={setIndex}
            sets={obj.sets}
          />

          <DeleteSetBtn
            handleDeleteSet={handleDeleteSet}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
            workoutObjIndex={exIndex}
            setIndex={setIndex}
          />
          <TrafficLight
            localStyling="col-spans-1 col-start-12 relative z-10"
            key={`easy${setIndex}`}
            indicator={set.easy}
            onChange={handleChangeEasy}
            setIndex={setIndex}
            workoutDataObject={obj}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
            green={<ThumbUp />}
            red={<ThumbDown />}
          />
        </CardRow>
      </div>
    </>
  );
};

export default SetRow;
