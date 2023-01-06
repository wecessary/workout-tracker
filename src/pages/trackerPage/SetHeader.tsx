import { SetStateAction, useEffect, useState } from "react";
import { XCircle, ThreeDots } from "../../components/Icons";
import { deleteSet } from "../../handlers/handlers";
import useOutsideClick from "../../hooks/useOutsideClick";
import { WorkoutDataObject } from "../../model/model";

const SetHeader = ({
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
      ref={ref}
      onClick={() =>
        setWorkoutData(deleteSet(workoutObjIndex, setIndex, workoutData))
      }
      className="flex gap-2"
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
      <div className="flex gap-6 text-[#D9D9D9]">
        <p className="font-extrabold">{`Set ${setIndex + 1}`}</p>
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

export default SetHeader;
