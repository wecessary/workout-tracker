import { useEffect, useState } from "react";
import { Set } from "../model/model";

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

  const [clickCount, setClickCount] = useState(clickCountLoader());
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

  const isBtnDisabled = () => {
    if (setIndex == 0 && clickCount !== 2) {
      return false;
    }
    const isPrevSetStarted = () => {
      return sets[setIndex - 1] && sets[setIndex - 1].timeStart ? true : false;
    };

    const isPrevSetComplete = () => {
      return sets[setIndex - 1] && sets[setIndex - 1].timeComplete
        ? true
        : false;
    };

    if (isPrevSetStarted() && isPrevSetComplete()) {
      return false;
    }

    if (!isPrevSetStarted()) {
      return true;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(startTime ? calTimeDiff(Date.now(), startTime) : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [clickCount]);

  return (
    <button
      disabled={isBtnDisabled()}
      onClick={() => {
        btnContent[clickCount].onClick();
        setClickCount((clickCount + 1) % 3);
      }}
      className=" col-span-7 gap-1 flex px-3 py-1 text-[10px] border text-[#575555] bg-[#F4F4F4] font-medium rounded-lg  disabled:bg-[#C8C8C8]"
    >
      <div>{btnContent[clickCount].icon}</div>
      <div className="flex-shrink">{btnContent[clickCount % 3].text}</div>
      <div>{btnContent[clickCount].content}</div>
    </button>
  );
};

export default Timer;
