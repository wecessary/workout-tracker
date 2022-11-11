import { useEffect, useState } from "react";
import { Set } from "../../model/model";

export const timerDisabled = (setIndex: number, sets: Set[]) => {
  const currentSetComplete = () => {
    return sets[setIndex] && sets[setIndex].timeComplete ? true : false;
  };

  const prevSetStarted = () => {
    return sets[setIndex - 1] && sets[setIndex - 1].timeStart ? true : false;
  };

  const prevSetComplete = () => {
    return sets[setIndex - 1] && sets[setIndex - 1].timeComplete ? true : false;
  };

  if (currentSetComplete()) {
    //a set is complete, disable it, regardless
    return true;
  }
  if (setIndex === 0 && !currentSetComplete()) {
    //first set is a special case in that it does look at prev set
    return false;
  }

  if (prevSetStarted() && prevSetComplete() && !currentSetComplete()) {
    //prev set is complete, do not disable current set if it is not complete
    return false;
  }

  if (prevSetStarted() && !prevSetComplete()) {
    //prev set ongoing, disable next set
    return true;
  }

  if (!prevSetStarted()) {
    //prev set exists and hasn't started, disable next set
    return true;
  }
  return false;
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
  const clickCountLoader = () => {
    if (startTime && endTime) {
      return 2;
    }
    if (startTime) {
      return 1;
    }
    return 0;
  };

  const [timeDiff, setTimeDiff] = useState(0);

  const calTimeDiff = (newTimeInMs: number, oldTimeInMs: number) =>
    Math.floor((newTimeInMs - oldTimeInMs) / 1000);

  const secTominsec = (timeInSec: number) => {
    const min = Math.floor(timeInSec / 60);
    const s = Math.floor(timeInSec % 60);

    return `${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
  };

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
      content: secTominsec(timeDiff) || null, // needs to display time
      onClick: finishOnClick, // needs to record finish time
    },
    {
      icon: "✔",
      text: "Set complete",
      content: secTominsec(calTimeDiff(endTime, startTime)), // display length
      onClick: resetOnClick,
    },
  ];

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
