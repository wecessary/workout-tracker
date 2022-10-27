import { useContext, useState } from "react";
import {
  handleChangeName,
  handleAddWorkout,
  handleChangeReps,
  handleChangeEasy,
  handleChangeWeight,
  handleChangeDone,
  handleChangeComment,
  handleShowPopup,
  handleDeleteExercise,
  handleOnDragEnd,
  handleDeleteSet,
  handleEditCard,
  resetShowOptions,
  addSet,
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
import { Bin, GripBar2 } from "../components/Icons";
import CardRow from "../components/CardRow";
import DroppableWrapper from "../components/DroppableWrapper";
import Controller from "../components/Controller";
import useOutsideClick from "../hooks/useOutsideClick";
import useWorkoutData from "../hooks/useWorkoutData";
import { UserDataContext } from "../context/DataContext";
import useAutoSave from "../hooks/useAutoSave";

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
                  <CardRow>
                    <ExerciseNameInput
                      key={exIndex}
                      value={obj.name}
                      onChange={handleChangeName}
                      workoutDataObjectIndex={obj.index}
                      workoutData={workoutData}
                      setWorkoutData={setWorkoutData}
                    />
                    <div
                      className="relative"
                      onClick={(e) => e.stopPropagation()}
                      // without stopPropagation, I think when you click ...,
                      // Edit is mounted, and adding the click event to the whole document,
                      // so rightaway the ... has the useoutSideClick callback attached to it
                      // which means clicking immediately also dismounts Edit
                    >
                      <Button
                        onClick={() =>
                          handleShowPopup(exIndex, showOptions, setShowOptions)
                        }
                      >
                        ...
                      </Button>
                      <Controller
                        currentExIndex={exIndex}
                        showOptions={showOptions}
                        attributeToShow={"showPopup"}
                      >
                        <div className="absolute top-2 right-4">
                          <Button
                            ref={ref}
                            variant="transparent"
                            onClick={() => {
                              handleEditCard(
                                exIndex,
                                showOptions,
                                setShowOptions
                              );
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </Controller>
                    </div>
                  </CardRow>
                  {obj.sets &&
                    obj.sets.map((set, i) => {
                      return (
                        <CardRow
                          key={`set${i}`}
                          rowStyling="text-gray-700 text-sm"
                        >
                          <Controller
                            attributeToShow="editCard"
                            currentExIndex={exIndex}
                            showOptions={showOptions}
                          >
                            <button
                              onClick={(e) => {
                                handleDeleteSet(
                                  exIndex,
                                  i,
                                  workoutData,
                                  setWorkoutData
                                );
                                e.stopPropagation();
                              }}
                            >
                              x
                            </button>
                          </Controller>
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
                  <Controller
                    attributeToShow="editCard"
                    currentExIndex={exIndex}
                    showOptions={showOptions}
                  >
                    <Button
                      onClick={() =>
                        handleDeleteExercise(
                          obj.index,
                          workoutData,
                          setWorkoutData,
                          setShowOptions
                        )
                      }
                    >
                      <Bin />
                    </Button>
                  </Controller>
                </Card>
              </DraggableWrapper>
            );
          })}
        </DroppableWrapper>

        <div className="flex">
          <Button
            onClick={() => handleAddWorkout(workoutData, setWorkoutData)}
            variant="primary"
          >
            Add Exercise
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
