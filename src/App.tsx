import { ChangeEvent, useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
const testData = [
  {
    index: 0,
    name: "Bicep Curls",
    set1: { reps: 10, weight: 15 },
    set2: { reps: 10, weight: 15 },
  },
];

const App = () => {
  const [workouts, setWorkouts] = useState(testData);
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newState = workouts.map((obj) => {
      if (obj.index === index) {
        return { ...obj, name: e.target.value };
      }
      return obj;
    });
    setWorkouts(newState);
  };
  const handleAdd = () => {
    setWorkouts([
      ...workouts,
      {
        index: workouts.length,
        name: "Your Workout",
        set1: { reps: 10, weight: 15 },
        set2: { reps: 10, weight: 15 },
      },
    ]);
  };

  console.log(workouts.map((obj) => obj));
  return (
    <div>
      <h1> Workout Tracker</h1>
      <div className="flex flex-col w-36">
        {workouts.map((workout, i) => {
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
