import { useContext, useState } from "react";
import { UserDataContext } from "../../context/DataContext";
import {
  attendanceStats,
  getExerciseStats,
  getLastXdaysAllData,
  getMax,
  getMean,
  getMin,
  getPastWorkoutOnly,
  getSetsAllDetails,
  getStatsFromSets,
  getSum,
  groupBy,
  sortByDateAscending,
  sumGroupBy,
} from "../../dataAnalysis/dataWrangleFunctions";
import { milSecToMin } from "../../utilities/date";
import { ArrowLeft, Play } from "../../components/Icons";
import Plot from "react-plotly.js";
import { layoutXAutoTick } from "../../utilities/plotlyConfig";
import { Header } from "./Header";
import ThisWeekVsAllTime from "./ThisWeekVAllTime";

const cardsWidth = "w-[95vw]";

type AttendanceStats = [string[], number[], number[], string[], string[]];
type ExerciseStats = [number[], number[], number[], number[], string[]];

const Analytics = () => {
  const { datafromDB } = useContext(UserDataContext);
  const [userData, setUserData] = useState(datafromDB || []);
  const [
    lastWeekDatesWorked,
    lastWeekRestTimes,
    lastWeekDurations,
    lastWeekNames,
    lastWeekUniqueNames,
  ] = attendanceStats(getLastXdaysAllData(userData, 7)) as AttendanceStats;

  const lastWeekTotalRest = getSum(lastWeekRestTimes);
  const lastWeekTotalDuration = getSum(lastWeekDurations);
  const lastWeekTotalTime = lastWeekTotalRest + lastWeekTotalDuration;

  const allTimeSets = getStatsFromSets(
    getSetsAllDetails(sortByDateAscending(getPastWorkoutOnly(userData)))
  );

  const [exReps, exWeights, exRestTimes, exDurations, exUniqueDates] =
    getExerciseStats(
      getLastXdaysAllData(userData, 7),
      "squats"
    ) as ExerciseStats;

  const [exercise, setExercise] = useState(lastWeekUniqueNames[0]);
  const [
    exAllReps,
    exAllWeights,
    exAllRestTimes,
    exAllDurations,
    exAllUniqueDates,
  ] = getExerciseStats(userData, exercise) as ExerciseStats;

  return (
    <>
      <div className="min-h-screen bg-[#363535] text-[#F5F5F5] flex flex-col items-center gap-4">
        <h1 className={`${cardsWidth} text-[5vw] tracking-widest`}>
          MUSCLE REPORT
        </h1>
        <Header text="LAST 7 DAYS" />
        <div
          className={`${cardsWidth} grid grid-cols-12 border-black border bg-[#1F1F1F] rounded-lg py-4`}
        >
          <div className="col-start-2 col-span-3 flex flex-col">
            <div>
              <span className="text-[15vw]">{lastWeekDatesWorked.length}</span>
              <span className="text-[4vw]">days</span>
            </div>
            <div>
              <span className="text-[15vw]">{lastWeekUniqueNames.length}</span>
              <span className="text-[4vw]">exercises</span>
            </div>
          </div>
          <div className="col-start-7 col-span-3 flex flex-col">
            <div>
              <span className="text-[15vw]">
                {milSecToMin(lastWeekTotalTime)}
              </span>
              <span className="text-[4vw]">minutes</span>
            </div>
            <div>
              <span className="text-[15vw]">{lastWeekNames.length}</span>
              <span className="text-[4vw]">sets</span>
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
        <Header text="YOUR PROGRESSION" />
        <div
          className={`${cardsWidth} rounded-lg bg-[#1F1F1F] flex justify-center`}
        >
          <Plot
            className="w-[99%]"
            data={[
              {
                y: sumGroupBy(groupBy(allTimeSets, "date", "totalTime")).map(
                  (x) => x / 1000 / 60
                ),
                x: Object.keys(groupBy(allTimeSets, "date", "totalTime")),
                type: "bar",
                marker: { color: "white" },
              },
            ]}
            layout={layoutXAutoTick}
            config={{ staticPlot: false, responsive: true }}
          />
        </div>
      </div>
    </>
  );
};

export default Analytics;