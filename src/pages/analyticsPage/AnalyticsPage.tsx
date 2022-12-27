import { useContext, useState } from "react";
import { UserDataContext } from "../../context/DataContext";
import {
  attendanceStats,
  getExerciseStats,
  getExerciseStatsObj,
  getLastXdaysAllData,
  getPastWorkoutOnly,
  getSetsAllDetails,
  getStatsFromSets,
  getSum,
} from "../../dataAnalysis/dataWrangleFunctions";
import { milSecToMin } from "../../utilities/date";
import { Play } from "../../components/Icons";
import { Header } from "./Header";
import ThisWeekVsAllTime from "./ThisWeekVAllTime";
import { AttendanceStats } from "../../model/model";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  ] = attendanceStats(getLastXdaysAllData(userData, 7)) as AttendanceStats;

  const last2MonthsSets = getStatsFromSets(
    getSetsAllDetails(getPastWorkoutOnly(userData))
  );

  const [exercise, setExercise] = useState(lastWeekUniqueNames[0] || "");

  const [exReps, exWeights, exRestTimes, exDurations, exUniqueDates] =
    getExerciseStats(getLastXdaysAllData(userData, 7), exercise);
  const [
    exAllReps,
    exAllWeights,
    exAllRestTimes,
    exAllDurations,
    exAllUniqueDates,
    exAllDates,
  ] = getExerciseStats(userData, exercise);

  console.log(getExerciseStatsObj(userData, exercise));
  console.log(exercise);

  return (
    <>
      <div className="min-h-screen bg-[#363535] text-[#F5F5F5] flex flex-col items-center gap-4 pb-16">
        <h1 className={`${cardsWidth} text-[5vw] tracking-widest`}>
          MUSCLE REPORT
        </h1>
        <Header text="LAST 7 DAYS" cardsWidth={cardsWidth} />
        <div
          className={`${cardsWidth} grid grid-cols-12 border-black border bg-[#1F1F1F] rounded-lg py-4`}
        >
          <div className="col-start-2 col-span-3 flex flex-col">
            <div>
              <span className="text-[15vw]">{lastWeekDatesWorked.length}</span>
              <span className="text-[4vw]">DAYS</span>
            </div>
            <div>
              <span className="text-[15vw]">{lastWeekUniqueNames.length}</span>
              <span className="text-[4vw]">EXERCISES</span>
            </div>
          </div>
          <div className="col-start-7 col-span-3 flex flex-col">
            <div>
              <span className="text-[15vw]">
                {milSecToMin(
                  getSum(lastWeekRestTimes) + getSum(lastWeekDurations)
                )}
              </span>
              <span className="text-[4vw]">MINUTES</span>
            </div>
            <div>
              <span className="text-[15vw]">{lastWeekNames.length}</span>
              <span className="text-[4vw]">SETS</span>
            </div>
          </div>
        </div>
        <ThisWeekVsAllTime
          setExercise={setExercise}
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
        <Header text="YOUR PROGRESSION" cardsWidth={cardsWidth} />
        <div
          className={`${cardsWidth} rounded-lg bg-[#1F1F1F] flex justify-center`}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={getExerciseStatsObj(userData, exercise)}>
              <Line type="monotone" dataKey="weights" stroke="#8884d8" />
              <Line type="monotone" dataKey="reps" stroke="#FE0606" />
              <XAxis dataKey="date" fillOpacity={0} />
              <YAxis />
              <Tooltip contentStyle={{ color: "#000000" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Analytics;
