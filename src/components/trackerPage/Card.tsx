import { ReactNode, SetStateAction, useState } from "react";
import { changeName } from "../../handlers/handlers";
import { UserDataObject, WorkoutDataObject } from "../../model/model";
import PopUpMenu from "./PopUpMenu";
import { colour } from "../../utilities/colour";
import Autofill from "../Autofill";
import CardRow from "./CardRow";
import { ChevronDown, ChevronUp, GripBar2 } from "../Icons";
import useOutsideClick from "../../hooks/useOutsideClick";

const Card = ({
  userData,
  workoutData,
  setWorkoutData,
  workoutDataObj,
  exIndex,
  children,
}: {
  userData: UserDataObject[];
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  workoutDataObj: WorkoutDataObject;
  exIndex: number;
  children: ReactNode;
}) => {
  const [showChildren, setShowChildren] = useState(false);
  const handleShowChildren = () => setShowChildren(!showChildren);

  return (
    <div
      className={`group p-3 w-[90vw] my-2 ${colour.cardColour} rounded-lg shadow-lg ${colour.hover}`}
    >
      <CardRow rowStyling="grid grid-cols-12 gap-2">
        <PopUpMenu
          workoutData={workoutData}
          setWorkoutData={setWorkoutData}
          exIndex={exIndex}
          workoutDataObject={workoutDataObj}
        />
        <div className="col-start-5">
          <GripBar2 />
        </div>
        <button className="col-start-12" onClick={handleShowChildren}>
          {showChildren ? <ChevronUp /> : <ChevronDown />}
        </button>
      </CardRow>
      <CardRow rowStyling="gap-2">
        <Autofill
          userData={userData}
          value={workoutDataObj.name}
          onChange={(name) => {
            setShowChildren(true);
            setWorkoutData(changeName(name, exIndex, workoutData));
          }}
        />
      </CardRow>
      {showChildren ? children : null}
    </div>
  );
};

export default Card;
