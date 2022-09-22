import { useState } from "react";
import {
  handleChangeName,
  handleAddWorkout,
  handleAddSet,
  handleChangeReps,
} from "../handlers/handlers";
import { initialWorkoutData, initialSets } from "../data/initalData";

const TrackerPage = () => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [sets, setSets] = useState(initialSets);
  console.log(workoutData);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full p-4">
        <h1> 💪💪💪Workout Tracker💪💪💪</h1>
        <table className="table-fixed text-xs w-72 sm:w-[600px]">
          <thead>
            <tr>
              <th className="w-5">Type of Exercise</th>
              {sets.map((set, i) => {
                return (
                  <th className="w-5" key={i}>
                    {set}
                  </th>
                );
              })}
              <th className="w-5">
                <button
                  onClick={() =>
                    handleAddSet(sets, setSets, workoutData, setWorkoutData)
                  }
                >
                  Add Set
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {workoutData.map((obj, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input
                      className="border rounded-lg w-full"
                      key={i}
                      value={obj.name}
                      onChange={(e) =>
                        handleChangeName(
                          e,
                          obj.index,
                          workoutData,
                          setWorkoutData
                        )
                      }
                    />
                  </td>
                  {obj.sets.map((set, i) => {
                    return (
                      <td key={i}>
                        <input
                          type="number"
                          key={i}
                          value={set.reps}
                          onChange={(e) =>
                            handleChangeReps(
                              e,
                              i,
                              obj.index,
                              obj,
                              workoutData,
                              setWorkoutData
                            )
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td>
                <button
                  onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrackerPage;
