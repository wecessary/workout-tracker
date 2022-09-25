import { useEffect, useState } from "react";
import {
  handleChangeName,
  handleAddWorkout,
  handleAddSet,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
  handleChangeDone,
} from "../handlers/handlers";
import { initialSets, initialUserData } from "../data/initalData";
import { currentDateAsString } from "../utilities/date";
import useWorkoutData from "../hooks/useWorkoutData";

const TrackerPage = () => {
  const [selectedDate, setSelectedDate] = useState(currentDateAsString);
  const [userData, setUserData] = useState(initialUserData);
  const { workoutData, setWorkoutData } = useWorkoutData(
    userData,
    setUserData,
    selectedDate
  );

  //useEffect for updating workOutData
  useEffect(() => {
    const newUserData = userData.map((obj) => {
      if (obj.date === selectedDate) {
        return { ...obj, workoutData: workoutData };
      }
      return obj;
    });
    setUserData(newUserData);
  }, [workoutData]);
  console.log(userData);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h1> 💪💪💪Workout Tracker💪💪💪</h1>
        <h1>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </h1>
        {workoutData.map((obj, i) => {
          return (
            <div
              key={i}
              className="group p-6 max-w-[310px] my-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
            >
              <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <input
                  className="group-hover:bg-gray-100 w-64 mb-1"
                  key={i}
                  value={obj.name}
                  onChange={(e) =>
                    handleChangeName(e, obj.index, workoutData, setWorkoutData)
                  }
                />
                <div className="font-normal text-gray-700 grid grid-cols-7 text-sm">
                  <div className="col-span-1">
                    {obj.sets.map((_, i) => {
                      return <p key={i}>{`set ${i + 1}`}</p>;
                    })}
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() =>
                        handleAddSet(obj.index, workoutData, setWorkoutData)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="col-span-2">
                    {obj.sets.map((set, i) => {
                      return (
                        <span key={`reps${i}`}>
                          <input
                            type="number"
                            value={set.reps}
                            className="group-hover:bg-gray-100 w-12 text-right"
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
                          reps
                        </span>
                      );
                    })}
                  </div>
                  <div className="col-span-2">
                    {obj.sets.map((set, i) => {
                      return (
                        <span key={`weight${i}`}>
                          <input
                            type="number"
                            value={set.weight}
                            className="group-hover:bg-gray-100 w-12 text-right"
                            onChange={(e) =>
                              handleChangeWeight(
                                e,
                                i,
                                obj,
                                workoutData,
                                setWorkoutData
                              )
                            }
                          />
                          kg
                        </span>
                      );
                    })}
                  </div>
                  <div className="col-span-1">
                    {obj.sets.map((set, i) => {
                      return (
                        <div key={i}>
                          <button
                            onClick={() => {
                              handleChangeEasy(
                                i,
                                obj,
                                workoutData,
                                setWorkoutData
                              );
                            }}
                          >
                            {set.easy ? "😊" : "😔"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-span-1">
                    {obj.sets.map((set, i) => {
                      return (
                        <div key={i}>
                          <button
                            onClick={() => {
                              handleChangeDone(
                                i,
                                obj,
                                workoutData,
                                setWorkoutData
                              );
                            }}
                          >
                            {set.done ? "✅" : "❌"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
        >
          Add Exercise
        </button>
      </div>
    </>
  );
};

export default TrackerPage;
