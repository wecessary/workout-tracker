import { useContext, useState } from "react";
import { addWorkout } from "../lib/workoutDataUtils";
import { currentDateAsString } from "../lib/date";
import Button from "../components/ui/Button";
import AutoHideMessage from "../components/ui/AutoHideMessage";
import Card from "../components/trackerPage/Card";
import DraggableWrapper from "../components/dnd/DraggableWrapper";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableWrapper from "../components/dnd/DroppableWrapper";
import useWorkoutData from "../hooks/useWorkoutData";
import { UserDataContext } from "../context/DataContext";
import useAutoSave from "../hooks/useAutoSave";
import { colour } from "../const/colour";
import getStatusMessage from "../lib/statusMessage";
import { saveStatusMsg } from "../const/saveStatusMsg";
import { getDnDReordered } from "../lib/dndUtils";
import { AppIcon } from "../components/ui/Icons";

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
        <AppIcon className="w-20 h-20 mb-4" />
        <DragDropContext
          onDragEnd={(result) =>
            setWorkoutData(getDnDReordered(workoutData, result))
          }
        >
          <input
            type="date"
            value={selectedDate}
            style={{ colorScheme: "dark" }}
            className={`${colour.background} text-[#D9D9D9] w-[90vw] border rounded border-gray-600 px-2`}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <DroppableWrapper droppableId="cards">
            {workoutData.map((obj, exIndex) => {
              return (
                <DraggableWrapper
                  draggableId={obj.exId}
                  draggableIndex={exIndex}
                  key={obj.exId}
                >
                  <Card
                    userData={userData}
                    workoutData={workoutData}
                    exIndex={exIndex}
                    setWorkoutData={setWorkoutData}
                    workoutDataObj={obj}
                  />
                </DraggableWrapper>
              );
            })}
          </DroppableWrapper>

          <Button
            onClick={() => setWorkoutData(addWorkout(workoutData))}
            variant="outline"
          >
            Add Exercise
          </Button>
          {(isSavingUserData || hasSavedUserData) && (
            <AutoHideMessage
              statuses={[isSavingUserData, hasSavedUserData]}
              resetStatus={() => {
                setIsSavingUserData(false);
                setHasSavedUserData(false);
              }}
            >
              {getStatusMessage(
                saveStatusMsg,
                isSavingUserData,
                hasSavedUserData
              )}
            </AutoHideMessage>
          )}
        </DragDropContext>
      </div>
    </>
  );
};

export default TrackerPage;
