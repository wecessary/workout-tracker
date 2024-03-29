import { MutableRefObject, SetStateAction, useState } from "react";
import Button from "../ui/Button";
import FloatingLabel from "../ui/FloatingLabel";
import { PencilSquare } from "../ui/Icons";
import Toggle from "../ui/Toggle";
import { changeUnit, toggleDisplayUnit } from "../../lib/workoutDataUtils";
import useOutsideClick from "../../hooks/useOutsideClick";
import { WorkoutDataObject } from "../../model/model";

const PopUpMenu = ({
  workoutData,
  setWorkoutData,
  exIndex,
  workoutDataObject,
  handleDeleteExercise,
}: {
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  exIndex: number;
  workoutDataObject: WorkoutDataObject;
  handleDeleteExercise: () => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);
  const ref = useOutsideClick(() => hideMenu());

  return (
    <>
      <div
        ref={ref as MutableRefObject<HTMLDivElement>}
        className="relative col-span-1"
      >
        <Button ariaLabel="show edit options" onClick={handleShowMenu}>
          <PencilSquare colour="white" />
        </Button>
        {showMenu ? (
          <div className="absolute w-48 top-5 left-4 bg-white z-50 rounded-lg border border-gray-200">
            <Button
              variant="listGroup"
              onClick={() => {
                handleShowMenu();
                handleDeleteExercise();
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
