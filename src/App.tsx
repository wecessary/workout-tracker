import { ChangeEvent, useState } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
const initialData = [
  {
    index: 0,
    name: "Bicep Curls",
    sets: [
      { reps: 10, weight: 15 },
      { reps: 10, weight: 15 },
    ],
  },
];

const App = () => {
  const [workoutData, setWorkoutData] = useState(initialData);
  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newWorkoutData = workoutData.map((obj) => {
      if (obj.index === index) {
        return { ...obj, name: e.target.value };
      }
      return obj;
    });
    setWorkoutData(newWorkoutData);
  };
  const handleAdd = () => {
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
              onChange={(e) => handleChangeName(e, obj.index)}
            />
          );
        })}
        <button onClick={handleAdd}>+</button>
      </div>
      <div>
        {workoutData.map((obj) => {
          return <p>{obj.set1}</p>;
        })}
      </div>
    </>
  );
};

root.render(<App />);
