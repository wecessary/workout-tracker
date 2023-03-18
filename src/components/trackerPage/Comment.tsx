import { MutableRefObject, SetStateAction } from "react";
import { changeComment } from "../../lib/workoutDataUtils";
import useOutsideClick from "../../hooks/useOutsideClick";
import { WorkoutDataObject } from "../../model/model";
import { colour } from "../../const/colour";

const Comment = ({
  workoutDataObj,
  workoutData,
  setWorkoutData,
}: {
  workoutDataObj: WorkoutDataObject;
  workoutData: WorkoutDataObject[];
  setWorkoutData: (value: SetStateAction<WorkoutDataObject[]>) => void;
}) => {
  const ref = useOutsideClick(() => ref.current?.blur());

  return (
    <textarea
      ref={ref as MutableRefObject<HTMLTextAreaElement>}
      className={`${colour.cardColour} ${colour.groupHover} rounded-xl p-2 border border-zinc-500 mt-4 text-base w-full text-white ${colour.offWhitePlaceholder}`}
      value={workoutDataObj.comment}
      onChange={(e) => {
        setWorkoutData(changeComment(e, workoutDataObj.index, workoutData));
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      placeholder="Write down how you found it"
    />
  );
};

export default Comment;
