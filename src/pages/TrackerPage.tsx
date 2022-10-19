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
  handleShowOptions,
  handleDeleteExercise,
} from "../handlers/handlers";
import { currentDateAsString } from "../utilities/date";
import useWorkoutData from "../hooks/useWorkoutData";
import ExerciseNameInput from "../components/ExerciseNameInput";
import RepsWeightInput from "../components/RepsWeightsInput";
import TrafficLight from "../components/TrafficLight";
import { writeUserData } from "../firebae/firebase";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/DataContext";
import Button from "../components/Button";
import StatusIndicator from "../components/StatusIndicator";
import NotificationChip from "../components/NotificationChip";
import Card from "../components/Card";
import DraggableWrapper from "../components/DraggableWrapper";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Set } from "../model/model";
import GripDots from "../components/GripDots";
import Bin from "../components/Bin";
import CardRow from "../components/CardRow";
import DroppableWrapper from "../components/DroppableWrapper";

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
  const [showOptions, setShowOptions] = useState([false]);

  //useEffect for updating workOutData
  useEffect(() => {
    const newUserData = userData.map((obj) => {
      if (obj.date === selectedDate) {
        return { ...obj, workoutData: workoutData };
      }
      return obj;
    });
    setUserData(newUserData);
    setShowOptions(Array(workoutData.length).fill(false, 0)); //tidy this up later
    // writeUserData(user?.uid);
  }, [workoutData]);
  // console.log(userData);

  function reorderSetIndex(sets: Set[]) {
    return sets.map((set, i) => ({ ...set, index: i }));
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "bin") {
      console.log(result);
      const exerciseIndex = result.source.droppableId.at(-1) || NaN;
      console.log(exerciseIndex);
      const newWorkoutData = workoutData.map((obj) => {
        if (obj.index === +exerciseIndex) {
          return {
            ...obj,
            sets: reorderSetIndex(
              obj.sets.filter((set) => set.index !== result.source.index)
            ),
          };
        }
        return obj;
      });

      setWorkoutData(newWorkoutData);
    }
  }
  console.log(workoutData);
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {workoutData.map((obj, exIndex) => {
          return (
            <Card key={exIndex}>
              <>
                <CardRow>
                  <ExerciseNameInput
                    key={exIndex}
                    value={obj.name}
                    onChange={handleChangeName}
                    workoutDataObjectIndex={obj.index}
                    workoutData={workoutData}
                    setWorkoutData={setWorkoutData}
                  />
                  <div className="relative">
                    <Button
                      onClick={() =>
                        handleShowOptions(exIndex, showOptions, setShowOptions)
                      }
                    >
                      ...
                    </Button>
                    {showOptions[exIndex] && (
                      <div className="absolute top-2 right-4">
                        <Button
                          variant="transparent"
                          onClick={() =>
                            handleDeleteExercise(
                              obj.index,
                              workoutData,
                              setWorkoutData
                            )
                          }
                        >
                          Delete exercise
                        </Button>
                      </div>
                    )}
                  </div>
                </CardRow>
                <DroppableWrapper droppableId={`exercise${exIndex}`}>
                  {obj.sets.map((set, i) => {
                    return (
                      <DraggableWrapper
                        key={`exercise${exIndex}-${set.index}`}
                        draggableId={`exercise${exIndex}-${set.index}`}
                        draggableIndex={i}
                      >
                        <CardRow rowStyling="text-gray-700 text-sm">
                          <GripDots />
                          <p key={i}>{`set ${set.index + 1}`}</p>
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
                        </CardRow>
                      </DraggableWrapper>
                    );
                  })}
                </DroppableWrapper>
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
                  onChange={(e) => {
                    handleChangeComment(
                      e,
                      obj.index,
                      workoutData,
                      setWorkoutData
                    );
                    e.target.style.height = "inherit";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="How was it?"
                />
              </>
              <DroppableWrapper droppableId="bin">
                <Bin />
              </DroppableWrapper>
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
      </DragDropContext>
    </>
  );
};

export default TrackerPage;
