import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import {
  attendanceStats,
  getExerciseStatsObj,
  sortByDateNewToOld,
} from "../../lib/analyticsUtils";
import { UserDataObject } from "../../model/model";
import { colour } from "../../const/colour";

const LineGraph = ({
  userData,
  cardsWidth,
}: {
  userData: UserDataObject[];
  cardsWidth: string;
}) => {
  const allExNames = attendanceStats(sortByDateNewToOld(userData))[4];

  const [exercise, setExercise] = useState(allExNames[0]);

  return (
    <>
      <div className={`${cardsWidth}`}>
        <select
          className={`${colour.background} text-[4vw] m-4 p-1`}
          onChange={(e) => setExercise(e.target.value)}
          onBlur={(e) => setExercise(e.target.value)}
        >
          {allExNames.map((name, i) => {
            return <option key={i}>{name.toUpperCase()}</option>;
          })}
        </select>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={getExerciseStatsObj(userData, exercise)}
            margin={{ left: -25, right: 15 }}
          >
            <Line
              type="monotone"
              dataKey="weights"
              stroke="#fca311"
              unit={`${getExerciseStatsObj(userData, exercise)[0]?.unit}`}
            />
            <Line type="monotone" dataKey="reps" stroke="#8884d8" />
            <XAxis dataKey="date" fillOpacity={0} />
            <YAxis />
            <Legend verticalAlign="bottom" />
            <Tooltip contentStyle={{ color: "#000000" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LineGraph;
