import { useContext, useState } from "react";
import {
  changeName,
  handleAddWorkout,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
  handleChangeComment,
  handleShowPopup,
  handleOnDragEnd,
  handleEditCard,
  resetShowOptions,
  addSet,
  deleteExercise,
  deleteSet,
  changeUnit,
  toggleDisplayUnit,
  startSet,
  finishSet,
  resetSetTimes,
} from "../handlers/handlers";
import { currentDateAsString } from "../utilities/date";
import ExerciseNameInput from "../components/ExerciseNameInput";
import RepsWeightInput from "../components/RepsWeightsInput";
import TrafficLight from "../components/TrafficLight";
import Button from "../components/Button";
import StatusIndicator from "../components/StatusIndicator";
import NotificationChip from "../components/NotificationChip";
import Card from "../components/Card";
import DraggableWrapper from "../components/DraggableWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import { Chevron, GripBar2, PencilSquare } from "../components/Icons";
import CardRow from "../components/CardRow";
import DroppableWrapper from "../components/DroppableWrapper";
import Controller from "../components/Controller";
import useOutsideClick from "../hooks/useOutsideClick";
import useWorkoutData from "../hooks/useWorkoutData";
import { UserDataContext } from "../context/DataContext";
import useAutoSave from "../hooks/useAutoSave";
import { colour } from "../utilities/colour";
import FloatingLabel from "../components/FloatingLabel";
import Toggle from "../components/Toggle";
import RestTimeDisplay from "../components/timers/RestTimer";
import Timer from "../components/timers/Timer";
import Analytics from "./AnalyticsPage";
import Autofill from "../components/Autofill";

const TrackerPage = () => {
  const { datafromDB } = useContext(UserDataContext);
  const [selectedDate, setSelectedDate] = useState(currentDateAsString);
  const [userData, setUserData] = useState(datafromDB || []);
  const { workoutData, setWorkoutData } = useWorkoutData(
    userData,
    selectedDate
  );
  const [showOptions, setShowOptions] = useState({
    exerciseIndex: NaN,
    showPopup: false,
    editCard: false,
  });
  const {
    isSavingUserData,
    hasSavedUserData,
    setIsSavingUserData,
    setHasSavedUserData,
  } = useAutoSave(userData, selectedDate, setUserData, workoutData);
  const ref = useOutsideClick(() => resetShowOptions(setShowOptions));

  return (
    <>
      <DragDropContext
        onDragEnd={(result) =>
          handleOnDragEnd(workoutData, setWorkoutData, result)
        }
      >
        <input
          type="date"
          value={selectedDate}
          className="bg-[#F5F5F5]"
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
                  <div className="flex justify-center mb-4">
                    <GripBar2 />
                  </div>
                  <CardRow rowStyling="grid grid-cols-12 gap-2">
                    <Autofill
                      userData={userData}
                      value={obj.name}
                      onChange={(name) =>
                        setWorkoutData(changeName(name, exIndex, workoutData))
                      }
                    />
                    <Button localStyling="col-span-1 flex items-start">
                      <Chevron />
                    </Button>
                    <div
                      className="relative col-span-1"
                      onClick={(e) => e.stopPropagation()}
                      // without stopPropagation, I think when you click ...,
                      // Edit is mounted, and adding the click event to the whole document,
                      // so rightaway the ... has the useoutSideClick callback attached to it
                      // which means clicking immediately also dismounts Edit
                    >
                      <Button
                        ariaLabel="show edit options"
                        onClick={() =>
                          handleShowPopup(exIndex, showOptions, setShowOptions)
                        }
                      >
                        <PencilSquare colour="white" />
                      </Button>
                      <Controller
                        currentExIndex={exIndex}
                        showOptions={showOptions}
                        attributeToShow={"showPopup"}
                      >
                        <div className="absolute w-48 top-5 right-4 bg-white z-10 rounded-lg border border-gray-200">
                          <Button
                            ref={ref}
                            variant="listGroup"
                            onClick={() => {
                              setWorkoutData(
                                deleteExercise(obj.index, workoutData)
                              );
                              resetShowOptions(setShowOptions);
                            }}
                          >
                            Delete Exercise
                          </Button>
                          <Button
                            ref={ref}
                            variant="listGroup"
                            onClick={() => {
                              handleEditCard(
                                exIndex,
                                showOptions,
                                setShowOptions
                              );
                            }}
                          >
                            Delete Sets
                          </Button>
                          <FloatingLabel
                            label="Change intensity unit"
                            value={obj.intensityUnit}
                            onChange={(e) =>
                              setWorkoutData(
                                changeUnit(
                                  "intensityUnit",
                                  e,
                                  workoutData,
                                  exIndex
                                )
                              )
                            }
                          />
                          <FloatingLabel
                            label="Change reps unit"
                            value={obj.repsUnit}
                            onChange={(e) =>
                              setWorkoutData(
                                changeUnit("repsUnit", e, workoutData, exIndex)
                              )
                            }
                            localStyling="rounded-b-lg"
                          />
                          <Toggle
                            label="Display reps unit"
                            id="toggelDisplayReps"
                            value={
                              "displayReps" in obj ? obj.displayReps : true
                            }
                            onChange={() =>
                              setWorkoutData(
                                toggleDisplayUnit(
                                  "displayReps",
                                  workoutData,
                                  exIndex
                                )
                              )
                            }
                          />
                          <Toggle
                            label="Display intensity unit"
                            id="toggelDisplayIntensity"
                            value={
                              "displayIntensity" in obj
                                ? obj.displayIntensity
                                : true
                            }
                            onChange={() =>
                              setWorkoutData(
                                toggleDisplayUnit(
                                  "displayIntensity",
                                  workoutData,
                                  exIndex
                                )
                              )
                            }
                          />
                        </div>
                      </Controller>
                    </div>
                  </CardRow>
                  {obj.sets &&
                    obj.sets.map((set, setIndex) => {
                      return (
                        <div key={setIndex} className="mb-4">
                          <CardRow
                            key={`metricRow${setIndex}`}
                            rowStyling="text-gray-700 text-sm grid-cols-12"
                          >
                            <Controller
                              attributeToShow="editCard"
                              currentExIndex={exIndex}
                              showOptions={showOptions}
                            >
                              <button
                                className="text-white"
                                onClick={(e) => {
                                  setWorkoutData(
                                    deleteSet(exIndex, setIndex, workoutData)
                                  );
                                  setShowOptions({
                                    ...showOptions,
                                    showPopup: false,
                                  });
                                  e.stopPropagation();
                                }}
                              >
                                x
                              </button>
                            </Controller>
                            <p className="col-span-6 font-extrabold text-[#D9D9D9]">{`Set ${
                              setIndex + 1
                            }`}</p>
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
                            rowStyling="gap-4 grid-cols-12 items-center justify-between"
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
                    variant="primary"
                    onClick={() =>
                      setWorkoutData(addSet(obj.index, workoutData))
                    }
                  >
                    +
                  </Button>

                  <textarea
                    className={`${colour.main} ${colour.groupHover} text-base w-full text-slate-500`}
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
    </>
  );
};

export default TrackerPage;
