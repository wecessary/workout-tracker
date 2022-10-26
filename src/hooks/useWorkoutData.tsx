import { useEffect, useState } from "react";
import { initialWorkoutData } from "../data/initalData";
import { UserDataObject } from "../model/model";

const useWorkoutData = (userData: UserDataObject[], selectedDate: string) => {
  const getselectedDayWorkout = () => {
    const index = userData.findIndex((obj) => obj.date === selectedDate);
    return index === -1 ? initialWorkoutData : userData[index].workoutData;
  };

  const [workoutData, setWorkoutData] = useState(getselectedDayWorkout());

  useEffect(() => {
    setWorkoutData(getselectedDayWorkout());
  }, [selectedDate]);
  return { workoutData, setWorkoutData };
};

export default useWorkoutData;
