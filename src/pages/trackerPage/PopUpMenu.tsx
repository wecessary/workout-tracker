import { SetStateAction, useState } from "react";
import Button from "../../components/Button";
import FloatingLabel from "../../components/FloatingLabel";
import { PencilSquare } from "../../components/Icons";
import Toggle from "../../components/Toggle";
import {
  changeUnit,
  deleteExercise,
  toggleDisplayUnit,
} from "../../handlers/handlers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { WorkoutDataObject } from "../../model/model";

const PopUpMenu = ({
  workoutData,
  setWorkoutData,
  exIndex,
  workoutDataObject,
}: {
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  exIndex: number;
  workoutDataObject: WorkoutDataObject;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);
  const ref = useOutsideClick(() => hideMenu());

  return (
    <>
      <div ref={ref} className="relative col-start-12 col-span-1">
        <Button ariaLabel="show edit options" onClick={handleShowMenu}>
          <PencilSquare colour="white" />
        </Button>
        {showMenu ? (
          <div className="absolute w-48 top-5 right-4 bg-white z-50 rounded-lg border border-gray-200">
            <Button
              variant="listGroup"
              onClick={() => {
                handleShowMenu();
                setWorkoutData(deleteExercise(exIndex, workoutData));
              }}
            >
              Delete Exercise
            </Button>

            <FloatingLabel
              label="Change intensity unit"
              value={workoutDataObject.intensityUnit}
              onChange={(e) =>
                setWorkoutData(
                  changeUnit("intensityUnit", e, workoutData, exIndex)
                )
              }
            />
            <FloatingLabel
              label="Change reps unit"
              value={workoutDataObject.repsUnit}
              onChange={(e) =>
                setWorkoutData(changeUnit("repsUnit", e, workoutData, exIndex))
              }
              localStyling="rounded-b-lg"
            />
            <Toggle
              label="Display reps unit"
              id="toggelDisplayReps"
              value={
                "displayReps" in workoutDataObject
                  ? workoutDataObject.displayReps
                  : true
              }
              onChange={() =>
                setWorkoutData(
                  toggleDisplayUnit("displayReps", workoutData, exIndex)
                )
              }
            />
            <Toggle
              label="Display intensity unit"
              id="toggelDisplayIntensity"
              value={
                "displayIntensity" in workoutDataObject
                  ? workoutDataObject.displayIntensity
                  : true
              }
              onChange={() =>
                setWorkoutData(
                  toggleDisplayUnit("displayIntensity", workoutData, exIndex)
                )
              }
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PopUpMenu;
