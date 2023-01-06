import { useContext, useState } from "react";
import {
  changeName,
  handleAddWorkout,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
  handleChangeComment,
  handleOnDragEnd,
  addSet,
  startSet,
  finishSet,
  resetSetTimes,
} from "../../handlers/handlers";
import { currentDateAsString } from "../../utilities/date";
import RepsWeightInput from "../../components/RepsWeightsInput";
import TrafficLight from "../../components/TrafficLight";
import Button from "../../components/Button";
import StatusIndicator from "../../components/StatusIndicator";
import NotificationChip from "../../components/NotificationChip";
import Card from "../../components/Card";
import DraggableWrapper from "../../components/DraggableWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import { GripBar2 } from "../../components/Icons";
import CardRow from "../../components/CardRow";
import DroppableWrapper from "../../components/DroppableWrapper";
import useWorkoutData from "../../hooks/useWorkoutData";
import { UserDataContext } from "../../context/DataContext";
import useAutoSave from "../../hooks/useAutoSave";
import { colour } from "../../utilities/colour";
import RestTimeDisplay from "../../components/timers/RestTimer";
import Timer from "../../components/timers/Timer";
import Autofill from "../../components/Autofill";
import SetHeader from "./SetHeader";
import PopUpMenu from "./PopUpMenu";

const TrackerPage = () => {
  const { datafromDB } = useContext(UserDataContext);
  const [selectedDate, setSelectedDate] = useState(currentDateAsString);
  const [userData, setUserData] = useState(datafromDB || []);
  const { workoutData, setWorkoutData } = useWorkoutData(
    userData,
    selectedDate
  );
  const {
    isSavingUserData,
    hasSavedUserData,
    setIsSavingUserData,
    setHasSavedUserData,
  } = useAutoSave(userData, selectedDate, setUserData, workoutData);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 mb-10">
        <h1 className={`text-[5vw] text-white tracking-widest w-full`}>
          MUSCLE JOURNAL
        </h1>
        <DragDropContext
          onDragEnd={(result) =>
            handleOnDragEnd(workoutData, setWorkoutData, result)
          }
        >
          <input
            type="date"
            value={selectedDate}
            style={{ colorScheme: "dark" }}
            className={`${colour.background} text-[#D9D9D9] w-full border rounded border-gray-600`}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <DroppableWrapper droppableId="cards">
            {workoutData.map((obj, exIndex) => {
              return (
                <DraggableWrapper
                  draggableId={`card${exIndex}`}
                  draggableIndex={exIndex}
                  key={exIndex}
                >
                  <Card>
                    <CardRow rowStyling="grid grid-cols-12 gap-2">
                      <div className="col-start-5">
                        <GripBar2 />
                      </div>
                      <PopUpMenu
                        workoutData={workoutData}
                        setWorkoutData={setWorkoutData}
                        exIndex={exIndex}
                        workoutDataObject={obj}
                      />
                    </CardRow>
                    <CardRow rowStyling="gap-2">
                      <Autofill
                        userData={userData}
                        value={obj.name}
                        onChange={(name) =>
                          setWorkoutData(changeName(name, exIndex, workoutData))
                        }
                      />
                    </CardRow>
                    {obj.sets &&
                      obj.sets.map((set, setIndex) => {
                        return (
                          <div key={setIndex} className="mb-4">
                            <CardRow>
                              <SetHeader
                                workoutData={workoutData}
                                setWorkoutData={setWorkoutData}
                                workoutObjIndex={exIndex}
                                setIndex={setIndex}
                              />
                            </CardRow>
                            <CardRow
                              key={`metricRow${setIndex}`}
                              rowStyling="text-gray-700 text-sm grid grid-cols-12"
                            >
                              <RepsWeightInput
                                shouldDisplay={
                                  ("displayReps" in obj
                                    ? obj.displayReps
                                    : true) as boolean
                                }
                                key={`reps${setIndex}`}
                                repsOrWeight={obj.repsUnit}
                                value={set.reps}
                                onChange={handleChangeReps}
                                setIndex={setIndex}
                                workoutDataObject={obj}
                                workoutData={workoutData}
                                setWorkoutData={setWorkoutData}
                              />
                              <RepsWeightInput
                                shouldDisplay={
                                  ("displayIntensity" in obj
                                    ? obj.displayIntensity
                                    : true) as boolean
                                }
                                key={`weight${setIndex}`}
                                repsOrWeight={obj.intensityUnit}
                                value={set.weight}
                                onChange={handleChangeWeight}
                                setIndex={setIndex}
                                workoutDataObject={obj}
                                workoutData={workoutData}
                                setWorkoutData={setWorkoutData}
                              />
                            </CardRow>
                            <CardRow
                              key={`timerRow${setIndex}`}
                              rowStyling="gap-4 grid grid-cols-12 items-center justify-between"
                            >
                              <Timer
                                startTime={set.timeStart || 0}
                                endTime={set.timeComplete || 0}
                                beginOnClick={() =>
                                  setWorkoutData(
                                    startSet(setIndex, obj, workoutData)
                                  )
                                }
                                finishOnClick={() =>
                                  setWorkoutData(
                                    finishSet(setIndex, obj, workoutData)
                                  )
                                }
                                resetOnClick={() =>
                                  setWorkoutData(
                                    resetSetTimes(setIndex, obj, workoutData)
                                  )
                                }
                                setIndex={setIndex}
                                sets={obj.sets}
                              />
                              <RestTimeDisplay
                                sets={obj.sets}
                                currentSetIndex={setIndex}
                              />
                              <TrafficLight
                                localStyling="col-spans-2"
                                key={`easy${setIndex}`}
                                indicator={set.easy}
                                onChange={handleChangeEasy}
                                setIndex={setIndex}
                                workoutDataObject={obj}
                                workoutData={workoutData}
                                setWorkoutData={setWorkoutData}
                                green="😊"
                                red="😔"
                              />
                            </CardRow>
                          </div>
                        );
                      })}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setWorkoutData(addSet(obj.index, workoutData))
                      }
                    >
                      Add set
                    </Button>

                    <textarea
                      className={`${colour.cardColour} ${colour.groupHover} text-base w-full text-white ${colour.offWhitePlaceholder}`}
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
                  </Card>
                </DraggableWrapper>
              );
            })}
          </DroppableWrapper>

          <Button
            onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
            variant="outline"
          >
            Add Exercise
          </Button>
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
      </div>
    </>
  );
};

export default TrackerPage;
