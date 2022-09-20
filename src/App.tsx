import { ChangeEvent, useState } from "react";
import { createRoot } from "react-dom/client";
import { handleChangeName } from "./handlers/handlers";
import { initialWorkoutData, initialSets } from "./initialData/initalData";
import { HandleChangeName } from "./model/model";

const container = document.getElementById("root");
const root = createRoot(container!);

const App = ({ handleChangeName }: { handleChangeName: HandleChangeName }) => {
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [sets, setSets] = useState(initialSets);

  const handleAddSet = () => {
    const nextSet = sets.length + 1;
    setSets([...sets, `set ${nextSet}`]);
  };

  const handleAddWorkut = () => {
    setWorkoutData([
      ...workoutData,
      {
        index: workoutData.length,
        name: "Your Workout",
        sets: [
          { reps: 10, weight: 15 },
          { reps: 10, weight: 15 },
        ],
      },
    ]);
  };

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
        <button onClick={handleAddWorkut}>+</button>
      </div>
      <div>
        {sets.map((set, i) => {
          return <p key={i}>{set}</p>;
        })}
        <button onClick={handleAddSet}>Add Set</button>
      </div>
    </>
  );
};

root.render(<App handleChangeName={handleChangeName} />);
