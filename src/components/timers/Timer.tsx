import { useEffect, useState } from "react";
import { Set } from "../../model/model";
import { secToMinSec } from "../../utilities/date";
import {
  currentSetComplete,
  prevSetStarted,
  prevSetComplete,
  prevSetExists,
} from "./setCheckers";

export const timerDisabled = (setIndex: number, sets: Set[]) => {
  const shouldDisable =
    currentSetComplete(setIndex, sets) || //current set is complete, disable it, regardless
    (prevSetStarted(setIndex, sets) && !prevSetComplete(setIndex, sets)) || //prev set ongoing, disable current set
    (prevSetExists(setIndex, sets) && !prevSetStarted(setIndex, sets)); //prev set exists and hasn't started, disable current set

  return shouldDisable;
};

const Timer = ({
  beginOnClick,
  finishOnClick,
  resetOnClick,
  startTime,
  endTime,
  sets,
  setIndex,
}: {
  beginOnClick: () => void;
  finishOnClick: () => void;
  resetOnClick: () => void;
  startTime: number;
  endTime: number;
  sets: Set[];
  setIndex: number;
}) => {
  const [timeDiff, setTimeDiff] = useState(0);

  const calTimeDiff = (newTimeInMs: number, oldTimeInMs: number) =>
    Math.floor((newTimeInMs - oldTimeInMs) / 1000);

  const btnContent = [
    {
      icon: ">",
      text: "Begin Set",
      content: null,
      onClick: beginOnClick, // needs to record start time
    },
    {
      icon: "||",
      text: "Finish Set",
      content: secToMinSec(timeDiff, "00:00") || null, // needs to display time
      onClick: finishOnClick, // needs to record finish time
    },
    {
      icon: "✔",
      text: "Set complete",
      content: secToMinSec(calTimeDiff(endTime, startTime), "00:00"), // display length
      onClick: resetOnClick,
    },
  ];

  const clickCountLoader = () => {
    if (startTime && endTime) {
      return 2;
    }
    if (startTime) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(startTime ? calTimeDiff(Date.now(), startTime) : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [clickCountLoader()]);

  return (
    <button
      disabled={timerDisabled(setIndex, sets)}
      onClick={() => {
        btnContent[clickCountLoader()].onClick();
      }}
      className=" col-span-7 gap-1 flex px-3 py-1 text-[10px] border text-[#575555] bg-[#F4F4F4] font-medium rounded-lg  disabled:bg-[#C8C8C8]"
    >
      <div>{btnContent[clickCountLoader() % 3].icon}</div>
      <div>{btnContent[clickCountLoader() % 3].text}</div>
      <div>{btnContent[clickCountLoader() % 3].content}</div>
    </button>
  );
};

export default Timer;
