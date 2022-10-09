import { useContext, useEffect, useState } from "react";
import {
  handleChangeName,
  handleAddWorkout,
  handleAddSet,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
  handleChangeDone,
  handleChangeComment,
} from "../handlers/handlers";
import { currentDateAsString } from "../utilities/date";
import useWorkoutData from "../hooks/useWorkoutData";
import ExerciseNameInput from "../components/ExerciseNameInput";
import RepsWeightInput from "../components/RepsWeightsInput";
import TrafficLight from "../components/TrafficLight";
import { logOut, writeUserData } from "../firebae/firebase";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/DataContext";

const TrackerPage = () => {
  const { user } = useContext(AuthContext);
  const { datafromDB } = useContext(UserDataContext);
  const uid = user ? user.uid : "invalidUid";
  const [selectedDate, setSelectedDate] = useState(currentDateAsString);
  const [userData, setUserData] = useState(datafromDB ? datafromDB : []);
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
    // writeUserData(user?.uid);
  }, [workoutData]);
  // console.log(userData);
  console.log(userData);
  return (
    <>
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
              <ExerciseNameInput
                key={i}
                value={obj.name}
                onChange={handleChangeName}
                workoutDataObjectIndex={obj.index}
                workoutData={workoutData}
                setWorkoutData={setWorkoutData}
              />
              <div className="font-normal text-gray-700 grid grid-cols-7 text-sm">
                <div className="col-span-1">
                  {obj.sets.map((_, i) => {
                    return <p key={i}>{`set ${i + 1}`}</p>;
                  })}
                </div>
                <div className="col-span-2">
                  {obj.sets.map((set, i) => {
                    return (
                      <RepsWeightInput
                        key={`reps${i}`}
                        repsOrWeight="reps"
                        value={set.reps}
                        onChange={handleChangeReps}
                        setIndex={i}
                        workoutDataObject={obj}
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                      />
                    );
                  })}
                </div>
                <div className="col-span-2">
                  {obj.sets.map((set, i) => {
                    return (
                      <RepsWeightInput
                        key={`weight${i}`}
                        repsOrWeight="kg"
                        value={set.weight}
                        onChange={handleChangeWeight}
                        setIndex={i}
                        workoutDataObject={obj}
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                      />
                    );
                  })}
                </div>
                <div className="col-span-1">
                  {obj.sets.map((set, i) => {
                    return (
                      <TrafficLight
                        key={`easy${i}`}
                        indicator={set.easy}
                        onChange={handleChangeEasy}
                        setIndex={i}
                        workoutDataObject={obj}
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                        green="😊"
                        red="😔"
                      />
                    );
                  })}
                </div>
                <div className="col-span-1">
                  {obj.sets.map((set, i) => {
                    return (
                      <TrafficLight
                        key={`done${i}`}
                        indicator={set.done}
                        onChange={handleChangeDone}
                        setIndex={i}
                        workoutDataObject={obj}
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                        green="✅"
                        red="❌"
                      />
                    );
                  })}
                </div>
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() =>
                  handleAddSet(obj.index, workoutData, setWorkoutData)
                }
              >
                +
              </button>
              <textarea
                className="group-hover:bg-gray-100"
                value={obj.comment}
                onChange={(e) =>
                  handleChangeComment(e, obj.index, workoutData, setWorkoutData)
                }
                placeholder="How was it?"
              />
            </div>
          </div>
        );
      })}

      <div className="flex">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
        >
          Add Exercise
        </button>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            writeUserData(uid, userData);
          }}
        >
          Save
        </button>
      </div>
      <button
        className=" mt-10 text-white bg-slate-400 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          logOut();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default TrackerPage;
