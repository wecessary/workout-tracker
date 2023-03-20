import { useEffect, useState } from "react";
import { Set } from "../../model/model";
import { secToMinSec } from "../../lib/date";
import { restTimer } from "../../lib/timer";

export const RestTimeDisplay = ({
  sets,
  currentSetIndex,
}: {
  sets: Set[];
  currentSetIndex: number;
}) => {
  const [restTime, setRestTime] = useState(0);

  useEffect(() => {
    setRestTime(restTimer(sets, currentSetIndex));
    const interval = setInterval(
      () => setRestTime(restTimer(sets, currentSetIndex)),
      1000
    );
    return () => clearInterval(interval);
  }, [currentSetIndex, sets]);

  return (
    <p className="text-xs">
      {restTime ? `${secToMinSec(restTime / 1000, "ms")} rest` : null}
    </p>
  );
};

export default RestTimeDisplay;
