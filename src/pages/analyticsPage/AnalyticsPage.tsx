import { useContext, useState } from "react";
import { UserDataContext } from "../../context/DataContext";
import {
  attendanceStats,
  getExerciseStats,
  getUserDataSinceXDaysAgo,
  getSum,
} from "../../dataAnalysis/dataWrangleFunctions";
import { Play } from "../../components/ui/Icons";
import ThisWeekVsAllTime from "./ThisWeekVAllTime";
import Last7Days from "./Last7Days";
import Progression from "./Progression";
import { colour } from "../../utilities/colour";

const cardsWidth = "w-[95vw]";

const Analytics = () => {
  const { datafromDB } = useContext(UserDataContext);
  const userData = datafromDB || [];

  const [
    lastWeekDatesWorked,
    lastWeekRestTimes,
    lastWeekDurations,
    lastWeekNames,
    lastWeekUniqueNames,
  ] = attendanceStats(getUserDataSinceXDaysAgo(userData, 6));
  const [lastWeekEx, setLastWeekExercise] = useState(
    lastWeekUniqueNames[0] || ""
  );
  const [exReps, exWeights, exRestTimes, exDurations, exUniqueDates] =
    getExerciseStats(getUserDataSinceXDaysAgo(userData, 6), lastWeekEx);

  const [
    exAllReps,
    exAllWeights,
    exAllRestTimes,
    exAllDurations,
    exAllUniqueDates,
    exAllDates,
  ] = getExerciseStats(userData, lastWeekEx);

  return (
    <>
      <div
        className={`min-h-screen ${colour.background} text-[#F5F5F5] flex flex-col items-center gap-4 pb-16 pt-4`}
      >
        <h1 className={`${cardsWidth} text-[5vw] tracking-widest`}>
          MUSCLE REPORT
        </h1>
        <Progression userData={userData} cardsWidth={cardsWidth} />
        <Last7Days
          cardsWidth={cardsWidth}
          daysWorkedOut={lastWeekDatesWorked.length}
          numExDone={lastWeekUniqueNames.length}
          restTime={getSum(lastWeekRestTimes)}
          timeExercising={getSum(lastWeekDurations)}
          numSetsDone={lastWeekNames.length}
        />
        <ThisWeekVsAllTime
          setExercise={setLastWeekExercise}
          exWeights={exWeights}
          exReps={exReps}
          exAllWeights={exAllWeights}
          exAllReps={exAllReps}
          cardsWidth={cardsWidth}
          lastWeekUniqueNames={lastWeekUniqueNames}
        />
        <h1
          className={`${cardsWidth} text-[6vw] font-bold border-t-2 border-b-2 border-white hidden`}
        >
          MUSCLE WRAPPED
        </h1>
        <div className={`${cardsWidth} hidden`}>
          <div className=" border-black border bg-[#1F1F1F] flex flex-col items-center  w-[30vw] rounded-lg py-6">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center leading-none">
                <h1 className="text-[10vw] font-bold">5</h1>
                <h1>DEC</h1>
              </div>
              <h1 className="text-5xl"> - </h1>
              <div className="flex flex-col items-center leading-none">
                <h1 className="text-[10vw] font-bold">11</h1>
                <h1>DEC</h1>
              </div>
            </div>
            <Play animatePulse={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
