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
import Button from "../components/Button";
import StatusIndicator from "../components/StatusIndicator";
import NotificationChip from "../components/NotificationChip";
import Card from "../components/Card";

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
  const [isSavingUserData, setIsSavingUserData] = useState(false);
  const [hasSavedUserData, setHasSavedUserData] = useState(false);

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
          <Card key={i}>
            <>
              <ExerciseNameInput
                key={i}
                value={obj.name}
                onChange={handleChangeName}
                workoutDataObjectIndex={obj.index}
                workoutData={workoutData}
                setWorkoutData={setWorkoutData}
              />
              {obj.sets.map((set, i) => {
                return (
                  <div className="font-normal text-gray-700 text-sm flex justify-between">
                    <p key={i}>{`set ${i + 1}`}</p>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                  </div>
                );
              })}
              <Button
                variant="primary"
                onClick={() =>
                  handleAddSet(obj.index, workoutData, setWorkoutData)
                }
              >
                +
              </Button>

              <textarea
                className="group-hover:bg-gray-100 text-base w-full text-slate-500"
                value={obj.comment}
                onChange={(e) =>
                  handleChangeComment(e, obj.index, workoutData, setWorkoutData)
                }
                placeholder="How was it?"
              />
            </>
          </Card>
        );
      })}

      <div className="flex">
        <Button
          onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
          variant="primary"
        >
          Add Exercise
        </Button>
        <Button
          onClick={() =>
            writeUserData(
              uid,
              userData,
              setIsSavingUserData,
              setHasSavedUserData
            )
          }
          variant="primary"
        >
          Save
        </Button>
      </div>
      {(isSavingUserData || hasSavedUserData) && (
        <NotificationChip
          statuses={[isSavingUserData, hasSavedUserData]}
          resetStatus={() => {
            setIsSavingUserData(false);
            setHasSavedUserData(false);
          }}
        >
          <StatusIndicator
            statusMessages={{
              loading: "Saving data...",
              complete: "Data has been saved",
            }}
            loadingStatus={isSavingUserData}
            completeStatus={hasSavedUserData}
          />
        </NotificationChip>
      )}
    </>
  );
};

export default TrackerPage;
