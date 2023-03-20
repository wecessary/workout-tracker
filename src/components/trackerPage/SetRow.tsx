import { SetStateAction } from "react";
import {
  changeReps,
  changeWeight,
  startSet,
  finishSet,
  resetSetTimes,
  deleteSet,
  shouldDisplayUnit,
} from "../../lib/workoutDataUtils";
import { Set, WorkoutDataObject } from "../../model/model";
import Timer from "../timers/Timer";
import { Grid } from "../ui/Grid";
import DeleteSetBtn from "../ui/DeleteSetBtn";
import InputNumber from "../ui/InputNumber";
import { animated, useSpring } from "@react-spring/web";
import { xEnter, xExit } from "../../const/springs";

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
  const [spring, api] = useSpring(() => ({
    from: { opacity: 0, x: xEnter },
    to: { opacity: 1, x: 0 },
  }));

  const handleDeleteSet = () => {
    api.start(() => ({
      opacity: 0,
      x: xExit,
      onRest: () => setWorkoutData(deleteSet(exIndex, setIndex, workoutData)),
    }));
  };

  return (
    <>
      <animated.div style={{ ...spring }}>
        <Grid alignItem="items-center" colGap="gap-1" p="py-2">
          <p className="col-span-2 text-lg text-white">{`#${setIndex + 1}`}</p>
          {shouldDisplayUnit(obj.displayReps) && (
            <label className="flex items-center col-span-5 text-white">
              <InputNumber
                repsOrWeight={obj.repsUnit}
                value={set.reps}
                onChange={(e) => {
                  setWorkoutData(changeReps(e, setIndex, obj, workoutData));
                }}
              />
              {obj.repsUnit.toUpperCase()}
            </label>
          )}
          {shouldDisplayUnit(obj.displayIntensity) && (
            <label className="flex items-center col-span-5 text-white">
              <InputNumber
                repsOrWeight={obj.intensityUnit}
                value={set.weight}
                onChange={(e) => {
                  setWorkoutData(changeWeight(e, setIndex, obj, workoutData));
                }}
              />
              {obj.intensityUnit.toUpperCase()}
            </label>
          )}
        </Grid>
        <Grid
          alignItem="items-center"
          colGap="gap-1"
          border="border-b-2"
          p="pb-2"
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
            setIndex={setIndex}
            sets={obj.sets}
          />
          <div className="col-start-11 col-span-2">
            <DeleteSetBtn handleDeleteSet={handleDeleteSet} />
          </div>
        </Grid>
      </animated.div>
    </>
  );
};

export default SetRow;
