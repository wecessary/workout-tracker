import { MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { XCircle, ThreeDots } from "../ui/Icons";
import { deleteSet } from "../../lib/handlers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { SlideAnimation, WorkoutDataObject } from "../../model/model";
import TrafficLight from "./TrafficLight";
import { colour } from "../../utilities/colour";

const DeleteSetBtn = ({
  workoutData,
  setWorkoutData,
  workoutObjIndex,
  setIndex,
  handleDeleteSet,
}: {
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
  workoutObjIndex: number;
  setIndex: number;
  handleDeleteSet: () => void;
}) => {
  const [btnContentIndex, setBtnContentIndex] = useState(0);
  const [animation, setAnimation] = useState<SlideAnimation>("");

  const leaveDeleteState = () => setBtnContentIndex(0);

  const ref = useOutsideClick(() => leaveDeleteState());

  const DeleteSetBtn = () => (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      onClick={handleDeleteSet}
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
    <>
      <div className="flex gap-1 text-[#D9D9D9] text-[12px] col-start-10 col-span-1">
        <button
          className={`${animation}`}
          onClick={(e) => {
            e.stopPropagation(); //this stops on useOutSideClick callback from bubbling up to here
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
