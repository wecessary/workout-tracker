import { MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { XCircle, ThreeDots } from "../Icons";
import { deleteSet } from "../../handlers/handlers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { WorkoutDataObject } from "../../model/model";
import TrafficLight from "./TrafficLight";
import { colour } from "../../utilities/colour";

const DeleteSetBtn = ({
  workoutData,
  setWorkoutData,
  workoutObjIndex,
  setIndex,
}: {
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  workoutObjIndex: number;
  setIndex: number;
}) => {
  const [btnContentIndex, setBtnContentIndex] = useState(0);
  const [animation, setAnimation] = useState<"" | "slide-out" | "slide-in">("");

  const leaveDeleteState = () => setBtnContentIndex(0);

  const ref = useOutsideClick(() => leaveDeleteState());

  const DeleteSetBtn = () => (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      onClick={() =>
        setWorkoutData(deleteSet(workoutObjIndex, setIndex, workoutData))
      }
      className={`flex gap-1 items-center ${colour.cardColour} w-24 relative z-50`}
    >
      <XCircle />
      <p>Delete set</p>
    </div>
  );

  const btnContent = [<ThreeDots />, <DeleteSetBtn />];

  const isInDeleteState = () => btnContentIndex % 2 === 1;

  useEffect(() => {
    setAnimation(isInDeleteState() ? "slide-out" : "");

    const animationTimer = setTimeout(
      () => setAnimation(isInDeleteState() ? "slide-in" : ""),
      3000
    );

    const timer = setTimeout(() => {
      leaveDeleteState();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, [btnContentIndex]);

  return (
    // <p className="font-extrabold">{`SET ${setIndex + 1}`}</p>

    <>
      <div className="flex gap-1 text-[#D9D9D9] text-[12px] col-start-10 col-span-1">
        <button
          className={`${animation}`}
          onClick={(e) => {
            e.stopPropagation();
            setBtnContentIndex(btnContentIndex + 1);
          }}
        >
          {btnContent[btnContentIndex % 2]}
        </button>
      </div>
    </>
  );
};

export default DeleteSetBtn;
