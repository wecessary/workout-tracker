import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  handleAddSet,
  handleAddWorkout,
  handleChangeName,
} from "./handlers/handlers";
import { initialWorkoutData, initialSets } from "./initialData/initalData";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = () => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [sets, setSets] = useState(initialSets);

  console.log(workoutData.map((obj) => obj));
  return (
    <>
      <h1> Workout Tracker</h1>
      <div className="flex flex-col w-36">
        {workoutData.map((obj, i) => {
          return (
            <input
              key={i}
              value={obj.name}
              onChange={(e) =>
                handleChangeName(e, obj.index, workoutData, setWorkoutData)
              }
            />
          );
        })}
        <button onClick={() => handleAddWorkout(workoutData, setWorkoutData)}>
          +
        </button>
      </div>
      <div>
        {sets.map((set, i) => {
          return <p key={i}>{set}</p>;
        })}
        <button onClick={() => handleAddSet(sets, setSets)}>Add Set</button>
      </div>
    </>
  );
};

root.render(<App />);
