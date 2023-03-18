import { DropResult } from "react-beautiful-dnd";
import { WorkoutDataObject } from "../model/model";
import { reorderWorkoutObjects } from "./workoutDataUtils";

export const getDnDReordered = (
  workoutData: WorkoutDataObject[],
  result: DropResult
) => {
  if (result?.destination?.droppableId === "cards") {
    const newWorkoutData = workoutData;
    const [draggedCard] = newWorkoutData.splice(result.source.index, 1);
    newWorkoutData.splice(result.destination.index, 0, draggedCard);
    return reorderWorkoutObjects(newWorkoutData);
  }
  return workoutData;
};
