import { useContext, useState } from "react";
import {
  handleAddWorkout,
  handleOnDragEnd,
  addSet,
} from "../../handlers/handlers";
import { currentDateAsString } from "../../utilities/date";
import Button from "../../components/Button";
import StatusIndicator from "../../components/StatusIndicator";
import NotificationChip from "../../components/NotificationChip";
import Card from "../../components/trackerPage/Card";
import DraggableWrapper from "../../components/DraggableWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableWrapper from "../../components/DroppableWrapper";
import useWorkoutData from "../../hooks/useWorkoutData";
import { UserDataContext } from "../../context/DataContext";
import useAutoSave from "../../hooks/useAutoSave";
import { colour } from "../../utilities/colour";
import Comment from "../../components/trackerPage/Comment";
import SetRow from "../../components/trackerPage/SetRow";

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
                  key={obj.exId}
                >
                  <Card
                    userData={userData}
                    workoutData={workoutData}
                    exIndex={exIndex}
                    setWorkoutData={setWorkoutData}
                    workoutDataObj={obj}
                  >
                    {obj.sets &&
                      obj.sets.map((set, setIndex) => {
                        return (
                          <SetRow
                            key={set.setId}
                            workoutData={workoutData}
                            setWorkoutData={setWorkoutData}
                            obj={obj}
                            set={set}
                            exIndex={exIndex}
                            setIndex={setIndex}
                          />
                        );
                      })}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setWorkoutData(addSet(obj.index, workoutData))
                      }
                    >
                      +
                    </Button>
                    <Comment
                      workoutDataObj={obj}
                      workoutData={workoutData}
                      setWorkoutData={setWorkoutData}
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
