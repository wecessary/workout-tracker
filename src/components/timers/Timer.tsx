import { useEffect, useState } from "react";
import { Set } from "../../model/model";
import { secToMinSec } from "../../lib/date";
import { Check, Play, Stop } from "../ui/Icons";
import RestTimeDisplay from "./RestTimer";
import {
  currentSetComplete,
  prevSetStarted,
  prevSetComplete,
  prevSetExists,
} from "../../lib/setCheckers";
import { calTimeDiff, timerDisabled } from "../../lib/timer";


const Timer = ({
  beginOnClick,
  finishOnClick,
  startTime,
  endTime,
  sets,
  setIndex,
}: {
  beginOnClick: () => void;
  finishOnClick: () => void;
  startTime: number;
  endTime: number;
  sets: Set[];
  setIndex: number;
}) => {
  const [timeDiff, setTimeDiff] = useState(0);

  const btnContent = [
    {
      icon: <Play animatePulse={!timerDisabled(setIndex, sets)} />,
      text: "Begin set",
      content: null,
      onClick: beginOnClick, // needs to record start time
    },
    {
      icon: <Stop />,
      text: "Finish set",
      content: secToMinSec(timeDiff, "00:00") || null, // needs to display time
      onClick: finishOnClick, // needs to record finish time
    },
    {
      icon: <Check />,
      text: "Set complete",
      content: secToMinSec(calTimeDiff(endTime, startTime), "00:00"), // display length
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
    },
  ];

  const clickCount = startTime && endTime ? 2 : startTime ? 1 : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(startTime ? calTimeDiff(Date.now(), startTime) : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <button
      disabled={timerDisabled(setIndex, sets)}
      onClick={() => {
        btnContent[clickCount].onClick();
      }}
      className="col-span-9 justify-between flex items-center px-3 py-1 text-[12px] border text-[#575555] bg-[#F4F4F4] font-medium rounded-lg  disabled:bg-[#C8C8C8]"
    >
      <div className="flex gap-1 items-center">
        <div>{btnContent[clickCount].icon}</div>
        <div>{btnContent[clickCount].text}</div>
        <div>{btnContent[clickCount].content}</div>
      </div>
      <RestTimeDisplay sets={sets} currentSetIndex={setIndex} />
    </button>
  );
};

export default Timer;
