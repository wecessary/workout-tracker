import { useEffect, useState } from "react";
import { Set } from "../../model/model";
import { secToMinSec } from "../../utilities/date";
import {
  currentSetComplete,
  currentSetStarted,
  nextSetExists,
  nextSetStarted,
} from "./setCheckers";

export const restTimer = (sets: Set[], setIndex: number) => {
  const currentSetCompleteTime =
    (sets[setIndex] && sets[setIndex].timeComplete) || 0;
  const nextSetStartTIme =
    (sets[setIndex + 1] && sets[setIndex + 1].timeStart) || 0;

  const isResting =
    currentSetComplete(setIndex, sets) &&
    nextSetExists(setIndex, sets) &&
    !nextSetStarted(setIndex, sets);

  const restTime = // this is the final start time
    currentSetStarted(setIndex, sets) &&
    currentSetComplete(setIndex, sets) &&
    nextSetExists(setIndex, sets) &&
    nextSetStarted(setIndex, sets)
      ? nextSetStartTIme - currentSetCompleteTime
      : 0;

  return isResting ? Date.now() - currentSetCompleteTime : restTime; //this is the running timer
};

export const RestTimeDisplay = ({
  sets,
  currentSetIndex,
}: {
  sets: Set[];
  currentSetIndex: number;
}) => {
  const [timeAgo, setTimeAgo] = useState(0);

  useEffect(() => {
    setTimeAgo(restTimer(sets, currentSetIndex));
    const interval = setInterval(
      () => setTimeAgo(restTimer(sets, currentSetIndex)),
      1000
    );
    return () => clearInterval(interval);
  }, [sets]);

  return (
    <p className="text-[12px] pl-2">
      {timeAgo ? `${secToMinSec(timeAgo / 1000, "ms")} rest` : null}
    </p>
  );
};

export default RestTimeDisplay;
