import { useEffect, useState } from "react";
import { Set } from "../../model/model";

export const timeTracker = (currentSet: Set, nextSet: Set) => {
  const isSetStarted = (set: Set) => (set && set.timeStart) || false;
  const isSetComplete = (set: Set) => (set && set.timeComplete) || false;

  const currentSetStarted = isSetStarted(currentSet);
  const currentSetComplete = isSetComplete(currentSet);
  const nextSetStarted = isSetStarted(nextSet);
  const nextSetComplete = isSetComplete(nextSet);
  const bothSetsExist = currentSet && nextSet;

  if (bothSetsExist && !nextSetStarted && currentSetComplete) {
    //when the first set has finished but the second set hasn't
    return currentSet.timeComplete ? Date.now() - currentSet.timeComplete : 0;
  }

  if (bothSetsExist && nextSetStarted && currentSetComplete) {
    //when both sets have begun
    return currentSet.timeComplete && nextSet.timeStart
      ? nextSet.timeStart - currentSet.timeComplete
      : 0;
  }
  return 0;
};

export const timeFormatter = (time: number) => {
  if (!time) {
    return null;
  }
  const timeAgoInSecs = Math.floor(time / 1000);
  const timeAgoInMin = Math.floor(timeAgoInSecs / 60);
  const timeAgoInHr = Math.floor(timeAgoInMin / 60);
  const timeAgoInDays = Math.floor(timeAgoInHr / 24);

  const lessThanXSec = (secs: number) => timeAgoInSecs < secs;

  if (lessThanXSec(60)) {
    return `${timeAgoInSecs}s rest`;
  }

  if (lessThanXSec(3600)) {
    return `${timeAgoInMin}m rest`;
  }
  if (lessThanXSec(86400)) {
    return `${timeAgoInHr}h rest`;
  }
  return `${timeAgoInDays}d rest`;
};

export const RestTimer = ({
  sets,
  currentSetIndex,
}: {
  sets: Set[];
  currentSetIndex: number;
}) => {
  const [timeAgo, setTimeAgo] = useState(0);
  const currentSet = sets[currentSetIndex];
  const nextSet = sets[currentSetIndex + 1];

  useEffect(() => {
    setTimeAgo(timeTracker(currentSet, nextSet));
    const interval = setInterval(
      () => setTimeAgo(timeTracker(currentSet, nextSet)),
      1000
    );
    return () => clearInterval(interval);
  }, [sets]);

  return (
    <p className=" text-[#D9D9D9] text-[10px] col-span-3">
      {timeAgo ? timeFormatter(timeAgo) : null}
    </p>
  );
};

export default RestTimer;
