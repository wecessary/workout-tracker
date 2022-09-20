import { ChangeEvent, useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
const initialData = [
  {
    index: 0,
    name: "Bicep Curls",
    set1: { reps: 10, weight: 15 },
    set2: { reps: 10, weight: 15 },
  },
];

const App = () => {
  const [workoutData, setWorkoutData] = useState(initialData);
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newState = workoutData.map((obj) => {
      if (obj.index === index) {
        return { ...obj, name: e.target.value };
      }
      return obj;
    });
    setWorkoutData(newState);
  };
  const handleAdd = () => {
    setWorkoutData([
      ...workoutData,
      {
        index: workoutData.length,
        name: "Your Workout",
        set1: { reps: 10, weight: 15 },
        set2: { reps: 10, weight: 15 },
      },
    ]);
  };

  console.log(workoutData.map((obj) => obj));
  return (
    <div>
      <h1> Workout Tracker</h1>
      <div className="flex flex-col w-36">
        {workoutData.map((workout, i) => {
          return (
            <input
              key={i}
              value={workout.name}
              onChange={(e) => handleChangeName(e, workout.index)}
            />
          );
        })}
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
};

root.render(<App />);
