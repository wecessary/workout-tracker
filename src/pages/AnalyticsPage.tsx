import Stories from "react-insta-stories";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/DataContext";
import {
  attendanceStats,
  getExerciseStats,
  getLastXdaysAllData,
} from "../dataAnalysis/dataWrangleFunctions";
import { UserDataObject } from "../model/model";
import { colour } from "../utilities/colour";
import { secToMinSec } from "../utilities/date";

const Analytics = () => {
  const { datafromDB } = useContext(UserDataContext);
  const [userData, setUserData] = useState(datafromDB || []);
  const [uniqueDates, restTimes, durations] = attendanceStats(userData) as [
    string[],
    number[],
    number[]
  ];
  const workoutTime = Math.floor(
    durations.reduce((x: number, y: number) => x + y, 0) / 1000 / 60
  );
  const restTime = Math.floor(
    restTimes.reduce((x: number, y: number) => x + y, 0) / 1000 / 60
  );
  const totalTime = workoutTime + restTime;

  const [
    exerciseReps,
    exerciseWeights,
    exerciseRestTimes,
    exerciseDurations,
    exerciseUniqueDates,
  ] = getExerciseStats(userData, "Push up") as [
    number[],
    number[],
    number[],
    number[],
    string[]
  ];

  return (
    <>
      <div
        className={`w-[90vw] flex flex-col ${colour.main} text-white p-4 rounded-lg`}
      >
        <h1>Push Up</h1>
        <h1>Sets done: {exerciseReps.length}</h1>
        <h1>
          Average number of reps per set:{" "}
          {exerciseReps.reduce((a, b) => a + b, 0) / exerciseReps.length}
        </h1>
        <h1>
          Personal high reps in a set:{" "}
          {exerciseReps.reduce((a, b) => Math.max(a, b), 0)}
        </h1>
        <h1>
          Average weight lifted per rep:{" "}
          {exerciseWeights.reduce((a, b) => a + b, 0) / exerciseReps.length}
        </h1>
        <h1>
          Personal high weight:{" "}
          {exerciseWeights.reduce((a, b) => Math.max(a, b), 0)}
        </h1>
        <h1>
          Average rest time:{" "}
          {secToMinSec(
            exerciseRestTimes.reduce((a, b) => a + b, 0) /
              exerciseReps.length /
              1000,
            "ms"
          )}
        </h1>
        <h1>
          Average time to complete a set:{" "}
          {secToMinSec(
            exerciseDurations.reduce((a, b) => a + b, 0) /
              exerciseDurations.length /
              1000,
            "ms"
          )}
        </h1>
        <h1>
          Number of days having done this exercise: {exerciseUniqueDates.length}
        </h1>
      </div>
    </>
  );
};

export default Analytics;
