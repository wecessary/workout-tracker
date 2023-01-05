import { SetStateAction, useEffect, useState } from "react";
import { BackSpace, ThreeDots } from "../../components/Icons";
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
  const [clickCount, setClickCount] = useState(0);

  const ref = useOutsideClick(() => leaveDeleteState());

  const DeleteSetBtn = () => (
    <div
      ref={ref}
      onClick={() =>
        setWorkoutData(deleteSet(workoutObjIndex, setIndex, workoutData))
      }
      className="flex gap-2"
    >
      <BackSpace />
      <p>Delete set</p>
    </div>
  );

  const btnContent = [<ThreeDots />, <DeleteSetBtn />];

  const leaveDeleteState = () =>
    setClickCount(clickCount % 2 === 1 ? 0 : clickCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      leaveDeleteState();
    }, 3000);

    return () => clearTimeout(timer);
  }, [clickCount]);

  return (
    <>
      <div className="flex gap-6 text-[#D9D9D9]">
        <p className="font-extrabold">{`Set ${setIndex + 1}`}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setClickCount(clickCount + 1);
          }}
        >
          {btnContent[clickCount % 2]}
        </button>
      </div>
    </>
  );
};

export default SetHeader;
