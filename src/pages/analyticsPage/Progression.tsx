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
} from "../../dataAnalysis/dataWrangleFunctions";
import { UserDataObject } from "../../model/model";
import { Header } from "./Header";

const Progression = ({
  userData,
  cardsWidth,
}: {
  userData: UserDataObject[];
  cardsWidth: string;
}) => {
  const allExNames = attendanceStats(userData)[4];

  const [exercise, setExercise] = useState(allExNames[0]);

  return (
    <>
      <Header text="YOUR PROGRESSION" cardsWidth={cardsWidth} />
      <div className={`${cardsWidth} rounded-lg bg-[#1F1F1F]`}>
        <select
          className="bg-[#1F1F1F] text-[4vw] m-4 p-1"
          onChange={(e) => setExercise(e.target.value)}
          onBlur={(e) => setExercise(e.target.value)}
        >
          {allExNames.map((name) => {
            return <option>{name.toUpperCase()}</option>;
          })}
        </select>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={getExerciseStatsObj(userData, exercise)}
            margin={{ left: -25, right: 15 }}
          >
            <Line type="monotone" dataKey="weights" stroke="#fca311" />
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

export default Progression;
