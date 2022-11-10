import { useEffect, useState } from "react";

const Timer = ({
  beginOnClick,
  finishOnClick,
  resetOnClick,
  startTime,
  endTime,
}: {
  beginOnClick: () => void;
  finishOnClick: () => void;
  resetOnClick: () => void;
  startTime: number;
  endTime: number;
}) => {
  const [clickCount, setClickCount] = useState(0);
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
      text: "complete",
      content: secTominsec(calTimeDiff(endTime, startTime)), // display length
      onClick: resetOnClick,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(startTime ? calTimeDiff(Date.now(), startTime) : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [clickCount]);

  return (
    <button
      onClick={() => {
        btnContent[clickCount % 3].onClick();
        setClickCount(clickCount + 1);
      }}
      className="flex gap-2 text-sm w-3/5 border text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-1"
    >
      <div>{btnContent[clickCount % 3].icon}</div>
      <div className="">{btnContent[clickCount % 3].text}</div>
      <div>{btnContent[clickCount % 3].content}</div>
    </button>
  );
};

export default Timer;
