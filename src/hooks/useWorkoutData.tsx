import { useEffect, useState } from "react";
import { generateInitialWorkoutData } from "../lib/initalData";
import { UserDataObject } from "../model/model";

const useWorkoutData = (userData: UserDataObject[], selectedDate: string) => {
  /* this hook sets the inital state of workoutData to
      the selected date's workoutData, if it doesn't exist,
      it will be the initalWorkoutData
  */
  const getselectedDayWorkout = () => {
    const index = userData.findIndex((obj) => obj.date === selectedDate);
    return index === -1
      ? generateInitialWorkoutData()
      : userData[index].workoutData || generateInitialWorkoutData(); // if the workoutData is [] and saved to Firebase. When it's downloaded again, it will become undefined.
  };

  const [workoutData, setWorkoutData] = useState(getselectedDayWorkout());

  useEffect(() => {
    setWorkoutData(getselectedDayWorkout());
  }, [selectedDate]);
  return { workoutData, setWorkoutData };
};

export default useWorkoutData;
