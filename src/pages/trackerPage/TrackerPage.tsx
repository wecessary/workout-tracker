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
import { GripBar2, PencilSquare } from "../../components/Icons";
import CardRow from "../../components/CardRow";
import DroppableWrapper from "../../components/DroppableWrapper";
import PopUpControll from "../../components/PopUpControll";
import useOutsideClick from "../../hooks/useOutsideClick";
import useWorkoutData from "../../hooks/useWorkoutData";
import { UserDataContext } from "../../context/DataContext";
import useAutoSave from "../../hooks/useAutoSave";
import { colour } from "../../utilities/colour";
import FloatingLabel from "../../components/FloatingLabel";
import Toggle from "../../components/Toggle";
import RestTimeDisplay from "../../components/timers/RestTimer";
import Timer from "../../components/timers/Timer";
import Autofill from "../../components/Autofill";

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
    showMenu: false,
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
                    <div className="flex justify-center mb-4">
                      <GripBar2 />
                    </div>
                    <CardRow rowStyling="gap-2">
                      <Autofill
                        userData={userData}
                        value={obj.name}
                        onChange={(name) =>
                          setWorkoutData(changeName(name, exIndex, workoutData))
                        }
                      />
                    </CardRow>
                    <CardRow rowStyling="grid grid-cols-12 gap-2">
                      <div
                        className="relative col-start-11 col-span-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          ariaLabel="show edit options"
                          onClick={() =>
                            handleShowPopup(
                              exIndex,
                              showOptions,
                              setShowOptions
                            )
                          }
                        >
                          <PencilSquare colour="white" />
                        </Button>
                        <PopUpControll
                          currentExIndex={exIndex}
                          showOptions={showOptions}
                          attributeToShow={"showMenu"}
                        >
                          <div
                            ref={ref}
                            className="absolute w-48 top-5 right-4 bg-white z-50 rounded-lg border border-gray-200"
                          >
                            <Button
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
                                  changeUnit(
                                    "repsUnit",
                                    e,
                                    workoutData,
                                    exIndex
                                  )
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
                        </PopUpControll>
                      </div>
                    </CardRow>
                    {obj.sets &&
                      obj.sets.map((set, setIndex) => {
                        return (
                          <div key={setIndex} className="mb-4">
                            <CardRow
                              key={`metricRow${setIndex}`}
                              rowStyling="text-gray-700 text-sm grid grid-cols-12"
                            >
                              <PopUpControll
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
                                      showMenu: false,
                                    });
                                    e.stopPropagation();
                                  }}
                                >
                                  x
                                </button>
                              </PopUpControll>
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
                      variant="primary"
                      onClick={() =>
                        setWorkoutData(addSet(obj.index, workoutData))
                      }
                    >
                      +
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