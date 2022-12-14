import Stories from "react-insta-stories";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/DataContext";
import {
  attendanceStats,
  getExerciseStats,
  getLastXdaysAllData,
  getSetsAllDetails,
  getSetsStatsWithTimeComplete,
  getStatsFromSets,
  getSum,
  groupBy,
  sortByDate,
  sortByDateAscending,
  sumGroupBy,
} from "../dataAnalysis/dataWrangleFunctions";
import { UserDataObject } from "../model/model";
import { colour } from "../utilities/colour";
import { milSecToMin, secToMinSec } from "../utilities/date";
import { Play } from "../components/Icons";
import Plot from "react-plotly.js";

type AttendanceStats = [string[], number[], number[], string[], string[]];

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

  const cardsWith = "w-[95vw]";

  const last7daysSets = getStatsFromSets(
    getSetsAllDetails(sortByDateAscending(getLastXdaysAllData(userData, 7)))
  );

  console.log(groupBy(last7daysSets, "date", "totalTime"));
  console.log(
    sumGroupBy(groupBy(last7daysSets, "date", "totalTime")).map((x) => x / 1000)
  );

  return (
    <>
      <div className="min-h-screen bg-[#363535] text-[#F5F5F5] flex flex-col items-center gap-4">
        <h1 className={`${cardsWith} text-[5vw] tracking-widest`}>
          MUSCLE REPORT
        </h1>
        <h1
          className={`${cardsWith} text-[6vw] font-bold border-t-2 border-b-2 border-white tracking-widest`}
        >
          LAST 7 DAYS
        </h1>
        <div
          className={`${cardsWith} grid grid-cols-12 border-black border bg-[#1F1F1F] rounded-lg py-4`}
        >
          <h1 className="pl-4 col-start-1 col-span-12 font-serif">
            You have worked out...
          </h1>
          <div className="col-start-2 col-span-3 flex flex-col">
            <div>
              <span className="text-[13vw]">{lastWeekDatesWorked.length}</span>
              <span className="text-[4vw]">days</span>
            </div>
            <div>
              <span className="text-[13vw]">{lastWeekUniqueNames.length}</span>
              <span className="text-[4vw]">exercises</span>
            </div>
          </div>
          <div className="col-start-7 col-span-3 flex flex-col">
            <div>
              <span className="text-[13vw]">
                {milSecToMin(lastWeekTotalTime)}
              </span>
              <span className="text-[4vw]">minutes</span>
            </div>
            <div>
              <span className="text-[13vw]">{lastWeekNames.length}</span>
              <span className="text-[4vw]">sets</span>
            </div>
          </div>
        </div>

        <div
          className={`${cardsWith} rounded-lg bg-[#1F1F1F] flex justify-center`}
        >
          <Plot
            className="w-[99%]"
            data={[
              {
                y: sumGroupBy(groupBy(last7daysSets, "date", "totalTime")).map(
                  (x) => x / 1000 / 60
                ),
                x: Object.keys(groupBy(last7daysSets, "date", "totalTime")),
                type: "bar",
                marker: { color: "white" },
              },
            ]}
            layout={{
              margin: { l: 35, r: 35 },
              paper_bgcolor: "#1F1F1F",
              plot_bgcolor: "#1F1F1F",

              title: {
                text: "Time spent at Muscle Department",
                font: { color: "white" },
              },
              yaxis: { title: { text: "Minutes" }, color: "white" },
              xaxis: { autotick: false, color: "white" },
            }}
            config={{ staticPlot: true, responsive: true }}
          />
        </div>

        <h1
          className={`${cardsWith} text-[6vw] font-bold border-t-2 border-b-2 border-white`}
        >
          MUSCLE WRAPPED
        </h1>
        <div className={`${cardsWith}`}>
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
