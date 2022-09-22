import { useState } from "react";
import {
  handleChangeName,
  handleAddWorkout,
  handleAddSet,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
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
        <table className="table-auto text-xs">
          <thead>
            <tr className="text-right">
              <th>Type of Exercise</th>
              {sets.map((set, i) => {
                return (
                  <th key={i}>
                    {set}
                  </th>
                );
              })}
              <th>
                <button
                  onClick={() =>
                    handleAddSet(sets, setSets, workoutData, setWorkoutData)
                  }
                >
                  +
                </button>
              </th>
              <th>Ease?</th>
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
                      <td key={i} className="text-right">
                        <input
                          type="number"
                          key={`reps${i}`}
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
                        /
                        <input
                          type="number"
                          key={`weight${i}`}
                          value={set.weight}
                          onChange={(e) => {
                            handleChangeWeight(
                              e,
                              i,
                              obj.index,
                              obj,
                              workoutData,
                              setWorkoutData
                            );
                          }}
                        />
                        kg
                      </td>
                    );
                  })}
                  <td className="text-right"></td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        handleChangeEasy(obj.index, workoutData, setWorkoutData)
                      }
                    >
                      {obj.easy ? "😊" : "😔"}
                    </button>
                  </td>
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
