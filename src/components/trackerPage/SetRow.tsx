import { SetStateAction, useState } from "react";
import {
  changeReps,
  changeWeight,
  startSet,
  finishSet,
  resetSetTimes,
  deleteSet,
} from "../../lib/workoutDataUtils";
import { SlideAnimation, Set, WorkoutDataObject } from "../../model/model";
import Timer from "../timers/Timer";
import { Grid } from "../ui/Grid";
import DeleteSetBtn from "./DeleteSetBtn";
import RepsWeightInput from "./RepsWeightsInput";

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
        <Grid alignItem="items-center" colGap="gap-1" p="pb-4">
          <p className="col-span-2 text-lg text-white">{`#${setIndex + 1}`}</p>
          <RepsWeightInput
            shouldDisplay={
              ("displayReps" in obj ? obj.displayReps : true) as boolean
            }
            repsOrWeight={obj.repsUnit}
            value={set.reps}
            onChange={(e, setIndex, workoutDataObject, workoutData) => {
              setWorkoutData(
                changeReps(e, setIndex, workoutDataObject, workoutData)
              );
            }}
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
            repsOrWeight={obj.intensityUnit}
            value={set.weight}
            onChange={(e, setIndex, workoutDataObject, workoutData) => {
              setWorkoutData(
                changeWeight(e, setIndex, workoutDataObject, workoutData)
              );
            }}
            setIndex={setIndex}
            workoutDataObject={obj}
            workoutData={workoutData}
            setWorkoutData={setWorkoutData}
          />
        </Grid>
        <Grid
          alignItem="items-center"
          colGap="gap-1"
          p="pb-2"
          border="border-b-2"
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
        </Grid>
      </div>
    </>
  );
};

export default SetRow;
